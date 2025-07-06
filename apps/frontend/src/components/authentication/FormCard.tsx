import React from "react";
import { NavLink } from "react-router-dom";

interface FormCardProps {
  children: React.ReactNode;
  linkText: string;
  linkMessage: string;
  title: string;
  path: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  children,
  linkText,
  linkMessage,
  title,
  path,
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
    </div>
  );
};
