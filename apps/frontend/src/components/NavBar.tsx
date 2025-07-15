import React from "react";
import { MdLightMode } from "react-icons/md";
import { useAuthStore } from "../store/authentication";
import { useThemeStore } from "../store/useThemeStore";
import { Logo } from "./Logo";
import { ProfileDropdown } from "./ProfileDropDown";

export const NavBar: React.FC = () => {
  const { isLoggedIn } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  return (
    <nav className="w-full text-mytext-dark flex items-center justify-between px-4 py-3">
      <Logo
        paintbrushStyle="text-myblue-400 w-12 h-12"
        divStyle="flex flex-col font-semibold"
      />

      <div className="flex items-center justify-center gap-10">
        <ul className="flex items-center space-x-10 text-2xl text-mytext-dark ">
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

        <ProfileDropdown />
        <button
          onClick={toggleTheme}
          className="cursor-pointer text-2xl text-mypink-400"
        >
          <MdLightMode />
        </button>
      </div>
    </nav>
  );
};
