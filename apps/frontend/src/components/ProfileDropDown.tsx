import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authentication";

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const buttonStyle =
    "w-full px-4 py-2 text-left text-white hover:bg-black cursor-pointer rounded-md";
  useEffect(() => {
    fetch("http://localhost:5000/artist/islogin", { credentials: "include" })
      .then((response) => {
        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        setIsLoggedIn(data.login);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

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
            <button onClick={() => navigate("/login")} className={buttonStyle}>
              Login
            </button>
          )}
          {isLoggedIn && (
            <button
              onClick={() => {
                logout();
                alert("log out successfuly");
                setIsOpen(!isOpen);
                setIsLoggedIn(!isLoggedIn);
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
