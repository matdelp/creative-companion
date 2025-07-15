import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useGetLoginStatus } from "../hooks/useGetLoginStatus";
import { useAuthStore } from "../store/authentication";

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, authProvider, logout } = useAuthStore();
  const navigate = useNavigate();
  const buttonStyle =
    "w-full px-4 py-2 text-left text-mytext-dark cursor-pointer rounded-md";
  const { isLoading, error } = useGetLoginStatus();
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  console.log("logIn?", isLoggedIn);

  const handleLogout = async () => {
    if (authProvider === "local") {
      await fetch("api/artist/logout", {
        method: "POST",
        credentials: "include",
      });
    } else {
      await fetch("api/artist/google/logout", {
        method: "POST",
        credentials: "include",
      });
    }
    logout();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-mytext-dark cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Profile actions"
      >
        <CgProfile className="w-8 h-8 text-mypink-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50">
          {isLoggedIn && (
            <button
              onClick={() => navigate("/profile")}
              className={buttonStyle}
            >
              Profile
            </button>
          )}
          {!isLoggedIn && (
            <>
              <button
                onClick={() => navigate("/login")}
                className={buttonStyle}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className={buttonStyle}
              >
                Register
              </button>
            </>
          )}
          {isLoggedIn && (
            <button
              onClick={async () => {
                await handleLogout();
              }}
              className={buttonStyle}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};
