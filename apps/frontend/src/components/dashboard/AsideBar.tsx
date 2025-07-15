import React from "react";
import { Menu, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo";

export const AsideBar: React.FC = () => {
  return (
    <aside className="max-w-64 bg-myorange-400 p-4 flex flex-col h-screen gap-4">
      <Logo
        paintbrushStyle="text-mypink-700"
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
    </aside>
  );
};
