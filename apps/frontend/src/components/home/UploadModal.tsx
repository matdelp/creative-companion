import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { useCreateArtwork } from "../../hooks/useCreateArtwork";
import { ToastUpdating } from "../ToastUpdating";
import { ToastError } from "../ToastError";

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().optional(),
  content: z
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
  const { mutate: submit, isPending, error: SubmitError } = useCreateArtwork();
  const { data: isLoggedIn, isLoading, error } = useIsLoggedIn();

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (formdata: z.infer<typeof formSchema>) => {
    submit(formdata);
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-center xl:p-2 p-4">
      {error && <ToastError message={error?.message || "Update failed"} />}
      {SubmitError && (
        <ToastError message={SubmitError?.message || "Delete failed"} />
      )}
      {isPending && <ToastUpdating message={"Submitting ..."} delay={500} />}
      {isLoading && <ToastUpdating message={"Logging in ..."} delay={500} />}

      {isLoggedIn ? (
        <button
          className="bg-linear-to-r from-mypink-100 to-mypink-400 dark:from-myorange-400 dark:to-mypink-400 xl:w-sm w-48 xl:p-4 p-2 font-bold xl:text-2xl text-lg rounded-4xl cursor-pointer text-mytext-light dark:text-mytext-dark"
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Upload your art
        </button>
      ) : (
        <button
          className="bg-linear-to-r from-myblue-100 to-myblue-400 dark:from-myblue-400 dark:to-mypurple-400  xl:w-sm w-48 xl:p-4 p-2 font-bold xl:text-2xl text-lg rounded-4xl cursor-pointer  text-mytext-light dark:text-mytext-dark"
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
            className="relative p-4 w-full max-w-md max-h-full bg-mybackground-light-400 dark:bg-mybackground-dark-100 rounded-lg shadow-sm dark:border dark:border-my"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-mypink-400">
              <h3 className="text-lg font-semibold text-mytext-dark dark:text-mytext-light ">
                Your Daily Spark, only one Creation per day !
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
                      className="block mb-2 text-xl font-medium text-mytext-dark dark:text-mytext-light"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      {...register("title")}
                      id="title"
                      className={`bg-mypink-100 dark:bg-mypink-700 dark:text-mytext-light border border-mypurple-700 text-blackText-primary text-sm rounded-lg focus:ring-mypink-700 block w-full p-2.5 ${
                        errors.title ? "border border-red-500" : ""
                      } `}
                      placeholder="Add a Title to your Creation"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-xl font-medium text-mytext-dark dark:text-mytext-light"
                    >
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      id="description"
                      rows={4}
                      className={`bg-mypink-100 dark:bg-mypink-700 dark:text-mytext-light border border-mypurple-700 text-blackText-primary text-sm rounded-lg focus:ring-mypink-700 block w-full p-2.5 ${
                        errors.description ? "border border-red-500" : ""
                      } `}
                      placeholder="Give your work a little backstory (optional)"
                    ></textarea>
                  </div>

                  <div className="col-span-2">
                    <input
                      {...register("content")}
                      type="file"
                      accept="image/*"
                      multiple={false}
                      className={`cursor-pointer text-mytext-dark dark:text-mytext-light ${
                        errors.content ? "border border-red-500" : ""
                      }`}
                    ></input>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-mytext-light font-bold bg-myblue-400 dark:bg-myblue-700 rounded-lg px-5 py-2.5 text-center cursor-pointer"
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
