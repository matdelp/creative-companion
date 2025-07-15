import React from "react";
import { FormCard } from "../components/authentication/FormCard";
import { SignUpForm } from "../components/authentication/SignupForm";

export const RegisterPage: React.FC = () => {
  return (
    <div className="bg-radial-[at_50%_75%] from-mypurple-100 via-mypink-100 to-myorange-100 w-screen h-screen flex justify-center items-center">
      <FormCard
        children={<SignUpForm />}
        title="Register"
        linkMessage="Already have an account?"
        linkText="Login"
        path="/login"
        google={true}
      />
    </div>
  );
};
