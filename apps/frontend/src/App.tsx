import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Dashboard } from "./pages/DashboardPage";
import { useThemeStore } from "./store/useThemeStore";
import { CollectionPage } from "./pages/CollectionPage";

export const App = () => {
  const { theme } = useThemeStore();
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
  );
  localStorage.theme = theme;

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
    </>
  );
};

export default App;
