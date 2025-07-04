import React from "react";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

export const NavBar: React.FC = () => {
  return (
    <nav className="w-full text-whiteText-accent flex items-center justify-between px-4 py-3">
      <div className="flex flex-col items-start text-lg font-bold">
        <span className="">Creative </span>
        <span>Companion</span>
      </div>
      <ul className="flex items-center space-x-4">
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/collection">Collections</a>
        </li>
      </ul>
      <div className="flex items-center cursor-pointer">
        <NavLink to={"/profile/:id"}>
          <CgProfile className="w-7 h-7" />
        </NavLink>
        <span className="hidden sm:inline">Profile</span>
      </div>
    </nav>
  );
};
