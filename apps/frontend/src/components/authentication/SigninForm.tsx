import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateLoginUser } from "../../hooks/useCreateLoginUser";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters",
  }),
});
type FormData = z.infer<typeof formSchema>;

export const SignInForm: React.FC = () => {
  const { mutate, isPending, error: mutationError } = useCreateLoginUser();
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
  if (isPending) {
    return <div>Update pending</div>;
  }
  if (mutationError) {
    return <div>Update failed</div>;
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center justify-center gap-3 w-full"
      >
        <div className="w-full">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`p-3 w-full rounded-md bg-myblue-100 dark:bg-mybackground-dark-100 text-mytext-dark dark:text-mytext-light  ${
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
            className={`p-3 w-full rounded-md bg-myblue-100 dark:bg-mybackground-dark-100 text-mytext-dark dark:text-mytext-light  ${
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
          Login
        </button>
      </form>
    </FormProvider>
  );
};
