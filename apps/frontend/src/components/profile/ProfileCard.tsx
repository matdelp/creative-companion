import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { Picture } from "./Picture";

type ProfileCardProps = {
  firstName: string;
  lastName: string;
  username: string;
  description?: string | null;
  picture?: string | null;
  projects: number;
};

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "Field must contain at least 2 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Field must contain at least 2 characters" }),
  username: z
    .string()
    .min(2, { message: "Username must contain at least 2 characters" }),
  description: z.string().optional(),
});
type FormData = z.infer<typeof formSchema>;

export const ProfileCard: React.FC<ProfileCardProps> = ({
  picture = "/images/Portrait_Placeholder.png",
  firstName,
  lastName,
  username,
  description = "Write here about your art and yourself !",
  projects,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

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
    reset,
  } = form;

  const handleToggle = () => {
    if (!isEditing) {
      reset({
        first_name: firstName,
        last_name: lastName,
        username,
        description: description ?? "",
      });
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: FormData) => {
    setBackendError(null);
    try {
      const response = await fetch("/api/artist/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Edit failed");
      }
      setIsEditing(false); // exit edit mode on success
    } catch (error) {
      if (error instanceof Error) setBackendError(error.message);
      else setBackendError("An unknown error occurred");
    }
  };

  return (
    <div className="w-full bg-whiteText-primary overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="h-40 bg-gradient-to-r from-mypink-400 to-myorange-400 relative">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <Picture image={picture!} />
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center w-full pt-20 pb-5">
        {isEditing ? (
          <FormProvider {...form}>
            <form
              className="flex flex-col items-center w-full justify-center gap-3"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <input
                className="text-xl font-thin text-blackText-primary border border-mypink-400 rounded-xl text-center w-auto px-2"
                placeholder="First name"
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.first_name.message}
                </p>
              )}

              <input
                className="text-xl font-thin text-blackText-primary border border-mypink-400 rounded-xl text-center w-auto px-2"
                placeholder="Last name"
                {...register("last_name")}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.last_name.message}
                </p>
              )}

              <input
                className="text-myblue-800 font-thin border border-myblue-800 rounded-xl text-center p-1"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.username.message}
                </p>
              )}

              <textarea
                className="text-gray-500 mt-2 font-thin text-center rounded-xl border border-mypink-400 p-2"
                rows={2}
                placeholder="Description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.description.message}
                </p>
              )}

              {backendError && (
                <p className="text-red-600 font-semibold">{backendError}</p>
              )}

              <button
                className="bg-mypink-400 p-2 text-whiteText-primary font-bold text-lg rounded-2xl cursor-pointer w-full max-w-60 mt-4"
                type="submit"
              >
                Save
              </button>
            </form>
          </FormProvider>
        ) : (
          <>
            <h2 className="text-xl font-bold text-blackText-primary">
              {firstName} {lastName}
            </h2>
            <p className="text-myblue-800 font-medium">{username}</p>
            <p className="text-gray-500 text-center max-w-xl">{description}</p>
          </>
        )}

        <div className="flex justify-center space-x-6 mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{projects}</p>
            <p className="text-sm text-gray-500">Projects</p>
          </div>
        </div>

        <button
          className="bg-mypink-400 p-2 text-whiteText-primary font-bold text-lg rounded-2xl cursor-pointer w-full max-w-60 mt-4"
          type="button"
          onClick={handleToggle}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
    </div>
  );
};
