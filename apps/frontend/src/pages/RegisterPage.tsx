import React from "react";
import { NavLink } from "react-router-dom";

export const RegisterPage: React.FC = () => {
  return (
    <div className="grid xl:grid-cols-2 w-screen h-screen">
      <div className="flex flex-col items-center justify-center xl:bg-white p-10 rounded-xl xl:w-1/2 w-full">
        <h2 className="text-main-500 dark:text-main-100 text-xl py-5">title</h2>
        <SignUpForm />
        <p className="py-1">
          message
          {"  "}
          <NavLink className="text-main-500 dark:text-main-100 " to="/login">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};
