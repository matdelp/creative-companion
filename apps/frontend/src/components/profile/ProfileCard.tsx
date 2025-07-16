import type { UserInfo, UserProfile } from "@creative-companion/common";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useModifyUserProfile } from "../../hooks/useModifyUserProfile";
import { NavHomeButton } from "../NavHomeButton";
import { Picture } from "./Picture";
import { Logo } from "../Logo";

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
  const [user, setUser] = useState<UserInfo>({ ...data });

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
        setUser((prev) => ({
          ...prev,
          ...formData,
          picture: prev.picture,
        }));
      },
    });
  };
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      todelete();
    }
  };

  if (isPending) {
    return <div>Update pending</div>;
  }
  if (mutationError) {
    return <div>Update failed</div>;
  }
  if (isDeleting) {
    return <div>Delete pending</div>;
  }
  if (deletingError) {
    return <div>Delete failed</div>;
  }

  return (
    <div className="w-full">
      <div className="xl:h-48 h-36 bg-gradient-to-r from-mypink-400 to-myorange-400 dark:from-myblue-700 dark:to-mypurple-700 relative xl:p-5 p-2">
        <div className="absolute xl:right-5 right-2">
          <NavHomeButton />
        </div>
        <div className="absolute xl:left-5 lef-2">
          <Logo
            paintbrushStyle="text-mytext-light xl:w-12 xl:h-12 w-8 h-8"
            divStyle="flex flex-col font-semibold text-mytext-light xl:text-xl text-xs"
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

              {isPending && <p className="text-myblue-700">Updating...</p>}
              {mutationError && (
                <p className="text-red-600">Update failed: {mutationError}</p>
              )}

              {isDeleting && <p className="text-myblue-700">Deleting...</p>}
              {deletingError && (
                <p className="text-red-600">Delete failed: {deletingError}</p>
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
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-mytext-dark dark:text-mytext-light xl:text-2xl text-xl">
              {user.username}
            </p>
            <p className="text-mybackground-dark-100 dark:text-mytext-light  text-center max-w-xl">
              {user.description}
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
