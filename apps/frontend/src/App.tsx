import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Dashboard } from "./pages/DashboardPage";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
