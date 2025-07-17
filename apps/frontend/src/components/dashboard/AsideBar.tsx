import { Image, Menu, User, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo";

export const AsideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed top-2 left-2 z-50 bg-myorange-400 dark:bg-myblue-700 p-2 rounded"
      >
        {isOpen ? (
          <X className="text-mypink-700 dark:text-myblue-100" />
        ) : (
          <Menu className="text-mypink-700 dark:text-myblue-100" />
        )}
      </button>
      <aside
        className={`bg-myorange-400 dark:bg-myblue-700 p-4 flex flex-col h-screen gap-4 fixed top-0 left-0 transform transition-transform duration-300 z-40
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 xl:static xl:max-w-64 max-w-40`}
      >
        <div className="pt-10 xl:pt-0">
          <Logo
            paintbrushStyle="text-mypink-700 dark:text-myblue-100 xl:w-10 xl:h-10 w-5 h-5"
            divStyle="xl:text-xl text-xs text-mypink-700 dark:text-myblue-100 font-bold"
          />
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/"
              className="text-mypink-700 hover:text-myorange-700 dark:text-myblue-100 dark:hover:text-myblue-400 xl:text-xl text-lg font-semibold flex items-center gap-2 p-2"
            >
              <Menu className="mr-2 text-mypink-700  dark:text-myblue-100  font-semibold " />{" "}
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className="text-mypink-700 hover:text-myorange-700 dark:text-myblue-100 dark:hover:text-myblue-400 xl:text-xl text-lg  font-semibold  flex items-center gap-2 p-2"
            >
              <User className="mr-2 text-mypink-700  dark:text-myblue-100  font-semibold " />{" "}
              Profile
            </NavLink>
            <NavLink
              to="/collection"
              className="text-mypink-700 hover:text-myorange-700 dark:text-myblue-100 dark:hover:text-myblue-400 xl:text-xl text-lg  font-semibold  flex items-center gap-2 p-2"
            >
              <Image className="mr-2 text-mypink-700  dark:text-myblue-100  font-semibold " />{" "}
              Collection
            </NavLink>
          </nav>
        </div>
      </aside>
    </>
  );
};
