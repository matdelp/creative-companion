import React, { useState } from "react";
import { Menu, User, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo";

export const AsideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed top-2 left-2 z-50 bg-myorange-400 p-2 rounded"
      >
        {isOpen ? (
          <X className="text-mypink-700" />
        ) : (
          <Menu className="text-mypink-700" />
        )}
      </button>
      <aside
        className={`bg-myorange-400 p-4 flex flex-col h-screen gap-4 fixed top-0 left-0 transform transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 xl:static xl:max-w-64 max-w-40`}
      >
        <div className="pt-12 xl:pt-0">
          <Logo
            paintbrushStyle="text-mypink-700 xl:w-10 xl:h-10 w-2 h-2"
            divStyle="text-xl text-mypink-700 font-bold"
          />
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/"
              className="text-mypink-700 text-xl font-semibold flex items-center gap-2 p-2"
            >
              <Menu className="mr-2 text-mypink-700 font-semibold " /> Home
            </NavLink>
            <NavLink
              to="/profile"
              className="text-mypink-700 text-xl font-semibold  flex items-center gap-2 p-2"
            >
              <User className="mr-2 text-mypink-700 font-semibold " /> Profile
            </NavLink>
          </nav>
        </div>
      </aside>
    </>
  );
};
