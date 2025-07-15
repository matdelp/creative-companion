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
    "w-full xl:px-4 xl:py-2 px-2 py-1 xl:text-md text-sm  text-left text-mypink-400 cursor-pointer rounded-md";
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
        <CgProfile className="xl:w-8 xl:h-8 w-6 h-6 text-mypink-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 bg-mybackground-light-400 border border-mypink-100">
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
