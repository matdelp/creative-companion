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
    <div className="flex flex-col items-center justify-center p-10 rounded-2xl w-4/5 max-w-md bg-mybackground-light-400 shadow-lg gap-8">
      <h2 className="text-blackText-primaryd text-3xl font-bold py-4">
        {title}
      </h2>
      {children}
      <div className="flex flex-col gap-3 items-center">
        <p>
          {linkMessage}{" "}
          <NavLink className="font-semibold" to={path}>
            {linkText}
          </NavLink>
        </p>
        <NavLink className="font-semibold" to="/">
          back
        </NavLink>
      </div>
      {google && (
        <a className="font-semibold" href="/api/artist/google">
          Sign in with Google
        </a>
      )}
    </div>
  );
};
