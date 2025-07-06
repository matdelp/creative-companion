import React from "react";
import { SigninCard } from "../components/authentication/SigninCard";

export const LoginPage: React.FC = () => {
  return (
    <div className="bg-blackText-primary w-screen h-screen flex justify-center items-center">
      <SigninCard />
    </div>
  );
};
