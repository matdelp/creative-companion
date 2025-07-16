import React, { type PropsWithChildren } from "react";
import { MdLightMode } from "react-icons/md";
import { useAuthStore } from "../store/authentication";
import { useThemeStore } from "../store/useThemeStore";
import { Logo } from "./Logo";

type NavBarProps = PropsWithChildren<{
  navStyle: string;
  modeButtonStyle: string;
  paintbrushStyle: string;
  linkStyle: string;
}>;
export const NavBar: React.FC<NavBarProps> = ({
  navStyle,
  modeButtonStyle,
  children,
  paintbrushStyle,
  linkStyle,
}) => {
  const { isLoggedIn } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  return (
    <nav className={navStyle}>
      <Logo
        paintbrushStyle={paintbrushStyle}
        divStyle="flex flex-col font-semibold xl:text-2xl text-xs"
      />

      <div className="flex items-center justify-center xl:gap-10 gap-3">
        <ul className={linkStyle}>
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
          {children}
          <button onClick={toggleTheme} className={modeButtonStyle}>
            <MdLightMode />
          </button>
        </div>
      </div>
    </nav>
  );
};
