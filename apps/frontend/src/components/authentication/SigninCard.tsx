import React from "react";
import { SignInForm } from "./SigninForm";
import { NavLink } from "react-router-dom";

export const SigninCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 rounded-2xl w-4/5 max-w-md bg-myblue-100 shadow-lg gap-8">
      <h2 className="text-blackText-primaryd text-3xl font-bold py-4">
        Sign in
      </h2>
      <SignInForm />
      <p className="text-blackText-secondary">
        Don&apos;t have an account?{" "}
        <NavLink className="font-semibold" to="/register">
          Register
        </NavLink>
      </p>
    </div>
  );
};
