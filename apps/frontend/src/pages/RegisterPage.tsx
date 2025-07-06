import React from "react";
import { FormCard } from "../components/authentication/FormCard";
import { SignUpForm } from "../components/authentication/SignupForm";

export const RegisterPage: React.FC = () => {
  return (
    <div className="bg-blackText-primary w-screen h-screen flex justify-center items-center">
      <FormCard
        children={<SignUpForm />}
        title="Register"
        linkMessage="Already have an account?"
        linkText="Login"
        path="/login"
      />
    </div>
  );
};
