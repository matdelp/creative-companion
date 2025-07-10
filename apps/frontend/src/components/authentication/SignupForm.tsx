import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

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
  const [backendError, setBackendError] = useState<string | null>(null);
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
      const response = await fetch("/api/artist/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }
      alert("Thank you, you are now registered!");
      navigate("/login");
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
        action="/api/artist/register"
        method="POST"
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="First Name"
            {...register("first_name")}
            className={`p-3 w-full rounded-md bg-myblue-400  ${
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
            className={`p-3 w-full rounded-md bg-myblue-400  ${
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
            className={`p-3 w-full rounded-md bg-myblue-400  ${
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
          Sign Up
        </button>
      </form>
    </FormProvider>
  );
};
