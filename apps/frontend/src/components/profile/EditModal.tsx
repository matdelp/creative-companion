import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

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

export const EditModal: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [backendError, setBackendError] = React.useState<string | null>(null);
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
      <button
        className="bg-mypink-400 p-2 text-whiteText-primary font-bold text-lg rounded-2xl cursor-pointer w-full max-w-60"
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Edit
      </button>
      {isOpen && (
        <div
          tabIndex={-1}
          className="fixed inset-0 z-50 flex justify-center items-center  bg-black/60 opacity-100"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative p-4 w-full max-w-md max-h-full bg-mypink-100 rounded-lg shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-mypink-800 bg-transparent w-8 h-8 ms-auto cursor-pointer"
              >
                X
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
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-blackText-primary"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("first_name")}
                      id="first_name"
                      className={`bg-mypink-400 border border-mypink-800 text-blackText-primary text-sm rounded-lg focus:ring-mypink-800 block w-full p-2.5 ${
                        errors.first_name ? "border border-red-500" : ""
                      } `}
                      placeholder="First name"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-blackText-primary"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register("last_name")}
                      id="last_name"
                      className={`bg-mypink-400 border border-mypink-800 text-blackText-primary text-sm rounded-lg focus:ring-mypink-800 block w-full p-2.5 ${
                        errors.last_name ? "border border-red-500" : ""
                      } `}
                      placeholder="Last name"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-blackText-primary"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      {...register("username")}
                      id="username"
                      className={`bg-mypink-400 border border-mypink-800 text-blackText-primary text-sm rounded-lg focus:ring-mypink-800 block w-full p-2.5 ${
                        errors.username ? "border border-red-500" : ""
                      } `}
                      placeholder="username"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      id="description"
                      rows={4}
                      className={`bg-mypink-400 border border-mypink-800 text-blackText-primary text-sm rounded-lg focus:ring-mypink-800 block w-full p-2.5 ${
                        errors.description ? "border border-red-500" : ""
                      } `}
                      placeholder="Write a few words about yourself(optionnal)"
                    ></textarea>
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="picture"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Upload a profile picture (optionnal)
                    </label>
                    <input
                      {...register("art")}
                      type="file"
                      id="picture"
                      accept="image/*"
                      multiple={false}
                      className={`cursor-pointer text-blackText-primary ${
                        errors.art ? "border border-red-500" : ""
                      }`}
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
                  className="text-white inline-flex items-center bg-mypink-800 hover:bg-blackText-primary focus:ring-4 focus:outline-none focus:ring-mypink-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                >
                  Save
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};
