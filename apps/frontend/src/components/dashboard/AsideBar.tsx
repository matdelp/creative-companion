import React from "react";
import { Menu, User, Paintbrush } from "lucide-react";
import { NavLink } from "react-router-dom";

export const AsideBar: React.FC = () => {
  return (
    <aside className="w-64 bg-myblue-800-lg p-4 flex flex-col">
      <div className="flex items-center mb-6">
        <Paintbrush className="text-myblue-400 mr-2" />
        <span className="text-xl text-whiteText-accent font-bold">
          Creative Companion
        </span>
      </div>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className="text-whiteText-accent text-xl flex items-center gap-2 p-2"
        >
          <Menu className="mr-2 text-whiteText-accent" /> Home
        </NavLink>
        <NavLink
          to="/profile"
          className="text-whiteText-accent text-xl flex items-center gap-2 p-2"
        >
          <User className="mr-2 text-whiteText-accent" /> Profile
        </NavLink>
      </nav>
    </aside>
  );
};
