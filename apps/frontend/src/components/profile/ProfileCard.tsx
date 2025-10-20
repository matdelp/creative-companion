import type { UserProfile } from "@creative-companion/common";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useModifyUserProfile } from "../../hooks/useModifyUserProfile";
import { NavBar } from "../NavBar";
import { NavHomeButton } from "../NavHomeButton";
import { Picture } from "./Picture";
import { ToastError } from "../ToastError";
import { ToastUpdating } from "../ToastUpdating";

type ProfileCardProps = {
  data: UserProfile;
};

const formSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  description: z.string().optional(),
});
type FormData = z.infer<typeof formSchema>;

export const ProfileCard: React.FC<ProfileCardProps> = ({ data }) => {
  const {
    picture = "/images/Portrait_Placeholder.png",
    first_name: firstName,
    last_name: lastName,
    username,
    description = "Write here about your art and yourself !",
    projects = data.artwork.length,
  } = data;

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
      username,
      description: description ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const { mutate, isPending, error: mutationError } = useModifyUserProfile();
  const {
    mutate: todelete,
    isPending: isDeleting,
    error: deletingError,
  } = useDeleteUser();

  const onSubmit = (formData: FormData) => {
    mutate(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      todelete();
    }
  };
  return (
    <div className="w-full">
      {mutationError && <ToastError message={mutationError?.message} />}
      {deletingError && <ToastError message={deletingError?.message} />}
      {isPending && <ToastUpdating message={"Updating ..."} delay={500} />}
      {isDeleting && <ToastUpdating message={"Deleting ..."} delay={500} />}

      <div className="xl:h-48 h-36 bg-gradient-to-r from-mypink-400 to-myorange-400 dark:from-myblue-700 dark:to-mypurple-700 relative xl:p-5 p-2">
        <div className="absolute top-2 left-0 pr-5 pl-2 w-full">
          <NavBar
            navStyle="w-full text-mytext-light dark:text-mytext-light flex items-center justify-between xl:px-4 xl:py-3"
            modeButtonStyle="cursor-pointer xl:text-3xl text-xl dark:text-mypink-100 dark:hover:text-mypink-400 text-mytext-light hover:text-myblue-700 text-center p-1"
            children={<NavHomeButton />}
            demoButtonStyle="text-mytext-light dark:text-mypink-100 text-s w-full font-bold border border-b-mypink-100 rounded-2xl px-2 cursor-pointer hover:bg-mypink-100/80 xl:mr-10"
            paintbrushStyle="text-mytext-light dark:text-mypink-100 xl:w-12 xl:h-12 w-6 h-6"
            linkStyle="flex items-center xl:space-x-10 space-x-2 xl:text-2xl text-xs text-mytext-light font-bold"
            links={[
              { path: "/dashboard", name: "Dashboard" },
              { path: "/collection", name: "Collections" },
            ]}
          />
        </div>
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <Picture image={picture!} isEditing={isEditing} />
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center w-full pt-20 pb-5 bg-mybackground-light-400 dark:bg-mybackground-dark-100">
        {isEditing ? (
          <FormProvider {...form}>
            <form
              className="flex flex-col items-center w-full justify-center gap-3"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <input
                className="text-xl font-thin text-mytext-dark dark:text-mytext-light border border-mypurple-400 rounded-xl text-center w-auto px-2"
                placeholder="First name"
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.first_name.message}
                </p>
              )}

              <input
                className="text-xl font-thin text-mytext-dark dark:text-mytext-light border border-mypurple-400 rounded-xl text-center w-auto px-2"
                placeholder="Last name"
                {...register("last_name")}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.last_name.message}
                </p>
              )}

              <input
                className="text-mytext-dark dark:text-mytext-light font-thin border border-mypurple-400 rounded-xl text-center w-auto px-2"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.username.message}
                </p>
              )}

              <textarea
                className="text-mytext-dark dark:text-mytext-light mt-2 font-thin text-center rounded-xl border border-mypurple-400 p-2"
                rows={2}
                placeholder="Description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.description.message}
                </p>
              )}

              <button
                className="bg-linear-to-r from-myblue-400 to-mypurple-400 p-2 text-mytext-light dark:text-mytext-dark font-bold text-lg rounded-2xl cursor-pointer w-full max-w-60 mt-4"
                type="submit"
              >
                Save
              </button>
              <button
                className=" text-red-600 dark:text-red-400 text-lg rounded-2xl cursor-pointer w-full max-w-60"
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </form>
          </FormProvider>
        ) : (
          <>
            <h2 className="xl:text-4xl text-3xl font-bold text-myblue-400 dark:text-myblue-100">
              {data.first_name} {data.last_name}
            </h2>
            <p className="text-mytext-dark dark:text-mytext-light xl:text-2xl text-xl">
              {data.username}
            </p>
            <p className="text-mybackground-dark-100 dark:text-mytext-light  text-center max-w-xl">
              {data.description}
            </p>
          </>
        )}

        <div className="flex justify-center xl:space-x-4 xl:mt-2 space-x-2 mt-1">
          <div className="text-center">
            <p className="xl:text-4xl text-2xl font-bold text-mypink-400 dark:text-mypink-100">
              {projects}
            </p>
            <p className="xl:text-lg text-md text-mypink-700 dark:text-mypink-100">
              Projects
            </p>
          </div>
        </div>

        <button
          className="bg-linear-to-r from-mypink-400 to-myorange-400 dark:from-myblue-400 dark:to-mypurple-400 xl:p-2 p-1 text-mytext-light dark:text-mytext-dark font-bold xl:text-lg rounded-2xl cursor-pointer w-full xl:max-w-60 max-w-30 xl:mt-4 mt-2"
          type="button"
          onClick={handleToggle}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
    </div>
  );
};
