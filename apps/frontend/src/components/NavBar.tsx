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
    <nav className="w-full text-mytext-dark dark:text-mytext-light flex items-center justify-between xl:px-4 xl:py-3">
      <Logo
        paintbrushStyle="text-myblue-400 dark:text-mypink-100 xl:w-12 xl:h-12 w-6 h-6"
        divStyle="flex flex-col font-semibold xl:text-2xl text-xs"
      />

      <div className="flex items-center justify-center xl:gap-10 gap-3">
        <ul className="flex items-center xl:space-x-10 space-x-2 xl:text-2xl text-xs text-mytext-dark dark:text-mytext-light">
          {isLoggedIn ? (
            <li>
              <a href="/dashboard" className="">
                Dashboard
              </a>
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
        <div className="flex items-center xl:gap-2 gap-1">
          <ProfileDropdown />
          <button
            onClick={toggleTheme}
            className="cursor-pointer xl:text-3xl text-xl dark:text-mypink-100 text-mypink-400 text-center p-1"
          >
            <MdLightMode />
          </button>
        </div>
      </div>
    </nav>
  );
};
