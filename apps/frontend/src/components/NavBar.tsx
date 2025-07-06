import React from "react";
import { ProfileDropdown } from "./ProfileDropDown";

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
        <ProfileDropdown />
      </div>
    </nav>
  );
};
//TODO change to id when profile implemented
