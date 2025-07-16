import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthenticationStore";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authProvider, logout } = useAuthStore();
  const navigate = useNavigate();
  const { data: isLoggedIn, isLoading, error } = useIsLoggedIn();
  if (isLoading) {
    return <div>Login pending</div>;
  }
  if (error) {
    return <div>Login failed</div>;
  }
  const buttonStyle =
    "w-full xl:px-6 xl:py-4 hover:bg-myorange-100 dark:hover:bg-myblue-700 hover:text-mytext-light px-2 py-1 xl:text-3xl text-lg  text-left text-mypink-400 dark:text-mytext-light cursor-pointer rounded-md";

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
        <CgProfile className="xl:w-10 xl:h-10 w-8 h-8 text-mypink-400 dark:text-mypink-100" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 bg-mybackground-light-400 dark:bg-mypink-700 border border-mypink-100 dark:border-mypink-400">
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
