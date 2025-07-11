import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { useAuthStore } from "../../store/authentication";
import { useNavigate } from "react-router-dom";

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
      });

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
    <>
      {isLoggedIn ? (
        <button
          className="bg-mypink-400 p-5 text-whiteText-primary font-bold text-lg rounded-2xl cursor-pointer"
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Upload your art
        </button>
      ) : (
        <button
          className="bg-myblue-400 p-5 text-whiteText-primary font-bold text-lg rounded-2xl cursor-pointer"
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
            className="relative p-4 w-full max-w-md max-h-full bg-myblue-100 rounded-lg shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-myblue-400">
              <h3 className="text-lg font-semibold text-blackText-primary ">
                Your inspiration for the day
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-myblue-800 bg-transparent text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
              ></button>
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
                      className="block mb-2 text-sm font-medium text-blackText-primary"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      {...register("title")}
                      id="title"
                      className={`bg-myblue-300 border border-myblue-800 text-blackText-primary text-sm rounded-lg focus:ring-myblue-800 block w-full p-2.5 ${
                        errors.title ? "border border-red-500" : ""
                      } `}
                      placeholder="Give your creation a title"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Art Description
                    </label>
                    <textarea
                      {...register("description")}
                      id="description"
                      rows={4}
                      className={`bg-myblue-300 border border-myblue-800 text-blackText-primary text-sm rounded-lg focus:ring-myblue-800 block w-full p-2.5 ${
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
                  className="text-white inline-flex items-center bg-myblue-800 hover:bg-blackText-primary focus:ring-4 focus:outline-none focus:ring-myblue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                >
                  Submit your creation
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};
