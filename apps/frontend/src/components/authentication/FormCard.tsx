import React, { type PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { ArrowLeftFromLine } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center xl:p-10 p-6 rounded-2xl w-4/5 max-w-md bg-mybackground-light-400 shadow-lg gap-8">
      <h2 className="text-myorange-400 text-3xl font-bold py-4">{title}</h2>
      {children}
      <div className="flex flex-col gap-3 items-center">
        <p>
          {linkMessage}{" "}
          <NavLink className="font-semibold text-mypink-400" to={path}>
            {linkText}
          </NavLink>
        </p>
        <NavLink className="font-semibold text-mytext-dark" to="/">
          <ArrowLeftFromLine className="text-mypink-400" />
        </NavLink>
      </div>
      {google && (
        <a className="font-bold text-myblue-400" href="/api/artist/google">
          Sign in with Google
        </a>
      )}
    </div>
  );
};
