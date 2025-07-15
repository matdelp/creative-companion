import { create } from "zustand";

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",
  toggleTheme: () =>
    set((state) => {
      const newTheme: Theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
}));
