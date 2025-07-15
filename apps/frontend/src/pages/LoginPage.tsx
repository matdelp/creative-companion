import React from "react";
import { FormCard } from "../components/authentication/FormCard";
import { SignInForm } from "../components/authentication/SigninForm";

export const LoginPage: React.FC = () => {
  return (
    <div className="bg-radial-[at_50%_75%] from-mypurple-100 via-mypink-100 to-myorange-100 dark:from-mybackground-dark-100 dark:via-mybackground-dark-100 dark:to-mybackground-dark-100 w-screen h-screen flex justify-center items-center">
      <FormCard
        children={<SignInForm />}
        title="Sign in"
        linkMessage="Don't have an account?"
        linkText="Register"
        path="/register"
        google={true}
      />
    </div>
  );
};
