import React from "react";
import { MdLightMode } from "react-icons/md";
import { useThemeStore } from "../store/useThemeStore";
type ThemeToggleButtonProps = {
  modeButtonStyle: string;
};
export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  modeButtonStyle,
}) => {
  const { toggleTheme } = useThemeStore();
  return (
    <button onClick={toggleTheme} className={modeButtonStyle}>
      <MdLightMode />
    </button>
  );
};
