import React, { type PropsWithChildren } from "react";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import { Logo } from "./Logo";
import { ThemeToggleButton } from "./ThemeToggleButton";

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
  const { data: isLoggedIn, isLoading, error } = useIsLoggedIn();
  if (isLoading) {
    return <div>Login pending</div>;
  }
  if (error) {
    return <div>Login failed</div>;
  }
  return (
    <nav className={navStyle}>
      <Logo
        paintbrushStyle={paintbrushStyle}
        divStyle="flex flex-col font-semibold xl:text-2xl text-xs"
      />

      <div className="flex items-center justify-center xl:gap-10 gap-3">
        <ul className={linkStyle}>
          {isLoggedIn ? (
            <>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>{" "}
              <li>
                <a href="/collection">Collections</a>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
        <div className="flex items-center xl:gap-2 gap-1">
          {children}
          <ThemeToggleButton modeButtonStyle={modeButtonStyle} />
        </div>
      </div>
    </nav>
  );
};
