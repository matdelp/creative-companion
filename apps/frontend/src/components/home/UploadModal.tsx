import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { useAuthStore } from "../../store/authentication";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().optional(),
  art: z
    .custom<FileList>()
    .refine((files) => files.length === 1, {
      message: "Please upload a single file",
    })
    .refine((files) => files[0]?.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});

export const UploadModal: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [backendError, setBackendError] = React.useState<string | null>(null);
  const { isLoggedIn } = useAuthStore();

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setBackendError(null);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.description) {
        formData.append("description", data.description);
      }
      const file = data.art[0];
      formData.append("art", file);

      const response = await fetch("/api/artwork/submit", {
        method: "POST",
        body: formData,
      }); //TODO

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Art upload failed");
      }

      alert("Thank you, art uploaded successfully");
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setBackendError(error.message);
      } else {
        setBackendError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center xl:p-2 p-4">
      {isLoggedIn ? (
        <button
          className="bg-linear-to-r from-mypink-100 to-mypink-400 xl:w-sm w-48 xl:p-4 p-2 text-whiteText-primary font-bold xl:text-2xl text-lg rounded-4xl cursor-pointer text-mytext-dark"
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Upload your art
        </button>
      ) : (
        <button
          className="bg-linear-to-r from-myblue-100 to-myblue-400 xl:w-sm w-48 xl:p-4 p-2 text-whiteText-primary font-bold xl:text-2xl text-lg rounded-4xl cursor-pointer text-mytext-dark"
          type="button"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      )}
      {isOpen && (
        <div
          tabIndex={-1}
          className="fixed inset-0 z-50 flex justify-center items-center  bg-black/60 opacity-100"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative p-4 w-full max-w-md max-h-full bg-mybackground-light-400 rounded-lg shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-mypink-400">
              <h3 className="text-lg font-semibold text-blackText-primary ">
                Your inspiration for the day
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-mypink-400 bg-transparent text-2xl w-8 h-8 justify-center items-center cursor-pointer"
              >
                <X />
              </button>
            </div>
            <FormProvider {...form}>
              <form
                className="p-4"
                action="/api/artwork/submit"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-xl font-medium text-blackText-primary"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      {...register("title")}
                      id="title"
                      className={`bg-mypink-100 border border-mypurple-700 text-blackText-primary text-sm rounded-lg focus:ring-mypink-700 block w-full p-2.5 ${
                        errors.title ? "border border-red-500" : ""
                      } `}
                      placeholder="Give your creation a title"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-xl font-medium text-mytext-dark"
                    >
                      Art Description
                    </label>
                    <textarea
                      {...register("description")}
                      id="description"
                      rows={4}
                      className={`bg-mypink-100 border border-mypurple-700 text-blackText-primary text-sm rounded-lg focus:ring-mypink-700 block w-full p-2.5 ${
                        errors.description ? "border border-red-500" : ""
                      } `}
                      placeholder="Write a description here (optionnal)"
                    ></textarea>
                  </div>

                  <div className="col-span-2">
                    <input
                      {...register("art")}
                      type="file"
                      accept="image/*"
                      multiple={false}
                      className={`cursor-pointer text-blackText-primary ${
                        errors.art ? "border border-red-500" : ""
                      }`}
                      placeholder="Write a description here (optionnal)"
                    ></input>
                  </div>
                  {backendError && (
                    <p className="text-red-600 text-sm text-center">
                      {backendError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-mytext-dark bg-myblue-400 rounded-lg px-5 py-2.5 text-center cursor-pointer"
                >
                  Submit your creation
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};
