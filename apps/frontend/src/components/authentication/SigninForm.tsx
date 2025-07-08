import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters",
  }),
});
type FormData = z.infer<typeof formSchema>;

export const SignInForm: React.FC = () => {
  const [backendError, setBackendError] = React.useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setBackendError(null);

    try {
      const response = await fetch("/api/artist/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
      console.log("Login successful:", result);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setBackendError(error.message);
      } else {
        setBackendError("An unknown error occurred");
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center justify-center gap-3 w-full"
        action="/api/artist/login"
        method="POST"
      >
        <div className="w-full">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`p-3 w-full rounded-md bg-myblue-400  ${
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
            className={`p-3 w-full rounded-md bg-myblue-400  ${
              errors.password ? "border border-red-500" : ""
            } `}
          />
          {errors.password && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.password.message}
            </p>
          )}
          {backendError && (
            <p className="text-red-600 text-sm text-center">{backendError}</p>
          )}
        </div>

        <button
          className="px-2 py-1 bg-myblue-800 rounded-md text-whiteText-primary font-semibold w-full cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </FormProvider>
  );
};
