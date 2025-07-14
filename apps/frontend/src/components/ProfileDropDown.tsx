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
    "w-full px-4 py-2 text-left text-white hover:bg-black cursor-pointer rounded-md";
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
        className="text-whiteText-accent cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Profile actions"
      >
        <CgProfile className="w-7 h-7" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-blackText-primary border-2 border-whiteText-primary rounded-md shadow-lg z-50">
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
