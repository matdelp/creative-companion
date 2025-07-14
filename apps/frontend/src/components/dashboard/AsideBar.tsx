import React from "react";
import { Menu, User, Paintbrush } from "lucide-react";
import { NavLink } from "react-router-dom";

export const AsideBar: React.FC = () => {
  return (
    <aside className="max-w-64 bg-mypink-400 p-4 flex flex-col">
      <div className="flex items-center mb-6">
        <Paintbrush className="text-mypink-800 mr-2" />
        <span className="text-xl text-mypink-800 font-bold">
          Creative Companion
        </span>
      </div>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className="text-mypink-800 text-xl font-semibold flex items-center gap-2 p-2"
        >
          <Menu className="mr-2 text-mypink-800 font-semibold " /> Home
        </NavLink>
        <NavLink
          to="/profile"
          className="text-mypink-800 text-xl font-semibold  flex items-center gap-2 p-2"
        >
          <User className="mr-2 text-mypink-800 font-semibold " /> Profile
        </NavLink>
      </nav>
    </aside>
  );
};
