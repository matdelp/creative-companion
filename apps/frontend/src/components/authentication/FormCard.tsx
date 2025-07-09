import React, { type PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

type FormCardProps = PropsWithChildren<{
  linkText: string;
  linkMessage: string;
  title: string;
  path: string;
  google: boolean;
}>;

export const FormCard: React.FC<FormCardProps> = ({
  children,
  linkText,
  linkMessage,
  title,
  path,
  google,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 rounded-2xl w-4/5 max-w-md bg-myblue-100 shadow-lg gap-8">
      <h2 className="text-blackText-primaryd text-3xl font-bold py-4">
        {title}
      </h2>
      {children}
      <p className="text-blackText-secondary">
        {linkMessage}{" "}
        <NavLink className="font-semibold" to={path}>
          {linkText}
        </NavLink>
      </p>
      {google && (
        <a className="font-semibold" href="http://localhost:5000/artist/google">
          Sign in with Google
        </a>
      )}
    </div>
  );
};
