import React from "react";
import { ProfileDropdown } from "./ProfileDropDown";
import { useAuthStore } from "../store/authentication";
import { Paintbrush } from "lucide-react";

export const NavBar: React.FC = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <nav className="w-full text-whiteText-accent flex items-center justify-between px-4 py-3">
      <div className="flex items-center text-lg font-bold">
        <Paintbrush className="text-myblue-400 mr-2" />
        <div className="flex flex-col">
          <span>Creative </span>
          <span>Companion</span>
        </div>
      </div>
      <ul className="flex items-center space-x-4">
        {isLoggedIn ? (
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        ) : (
          <li>
            <a href="/login">Dashboard</a>
          </li>
        )}
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
