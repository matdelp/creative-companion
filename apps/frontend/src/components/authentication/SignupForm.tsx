import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateUser } from "../../hooks/useCreateUser";
import { ToastUpdating } from "../ToastUpdating";
import { ToastError } from "../ToastError";

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
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters",
  }),
});
type FormData = z.infer<typeof formSchema>;

export const SignUpForm: React.FC = () => {
  const { mutate, isPending, error: mutationError } = useCreateUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (formData: FormData) => {
    mutate(formData);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center justify-center gap-3 w-full"
        action="/api/artist/register"
        method="POST"
      >
        <div className="w-full">
          {mutationError && (
            <ToastError message={mutationError?.message || "Update failed"} />
          )}
          {isPending && (
            <ToastUpdating message={"Submitting ..."} delay={500} />
          )}
          <input
            type="text"
            placeholder="First Name"
            {...register("first_name")}
            className={`p-3 w-full rounded-md bg-myblue-100 dark:bg-mybackground-dark-100 text-mytext-dark dark:text-mytext-light    ${
              errors.first_name ? "border border-red-500" : ""
            } `}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.first_name.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Last Name"
            {...register("last_name")}
            className={`p-3 w-full rounded-md bg-myblue-100 dark:bg-mybackground-dark-100 text-mytext-dark dark:text-mytext-light    ${
              errors.last_name ? "border border-red-500" : ""
            } `}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.last_name.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className={`p-3 w-full rounded-md bg-myblue-100 dark:bg-mybackground-dark-100 text-mytext-dark dark:text-mytext-light    ${
              errors.username ? "border border-red-500" : ""
            } `}
          />
          {errors.username && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`p-3 w-full rounded-md bg-myblue-100 dark:bg-mybackground-dark-100 text-mytext-dark dark:text-mytext-light    ${
              errors.email ? "border border-red-500" : ""
            } `}
          />
          {errors.email && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`p-3 w-full rounded-md bg-myblue-100 dark:bg-mybackground-dark-100 text-mytext-dark dark:text-mytext-light    ${
              errors.password ? "border border-red-500" : ""
            } `}
          />
          {errors.password && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          className="px-2 py-2 bg-myblue-400 rounded-2xl text-mytext-light dark:text-mytext-dark font-semibold w-full cursor-pointer"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </FormProvider>
  );
};
