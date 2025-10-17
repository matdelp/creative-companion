import React, { useState, type PropsWithChildren } from "react";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import { Logo } from "./Logo";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { ToastDemo } from "./ToastDemo";
import { Menu } from "lucide-react";

type Link = {
  name: string;
  path: string;
};
type NavBarProps = PropsWithChildren<{
  navStyle: string;
  modeButtonStyle: string;
  paintbrushStyle: string;
  linkStyle: string;
  links: Link[];
}>;
export const NavBar: React.FC<NavBarProps> = ({
  navStyle,
  modeButtonStyle,
  children,
  paintbrushStyle,
  linkStyle,
  links,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
            links.map((link, index) => (
              <li key={index}>
                <a href={link.path}>{link.name}</a>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
        <div className="relative">
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 p-2 text-mypink-400 dark:text-mypink-100 cursor-pointer"
            >
              <Menu
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {isOpen && (
            <div className="absolute top-full -left-10 w-auto bg-white/50 dark:bg-black/50 shadow-md rounded-2xl mt-1 p-2 flex flex-col items-center gap-2 z-50">
              <ToastDemo />
              {children}
              <ThemeToggleButton modeButtonStyle={modeButtonStyle} />
            </div>
          )}

          <div className="hidden xl:flex items-center xl:gap-2 gap-1">
            <ToastDemo />
            {children}
            <ThemeToggleButton modeButtonStyle={modeButtonStyle} />
          </div>
        </div>
      </div>
    </nav>
  );
};
