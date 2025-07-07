import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authentication";

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const buttonStyle =
    "w-full px-4 py-2 text-left text-white hover:bg-black cursor-pointer rounded-md";

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
          <button onClick={() => navigate("/profile")} className={buttonStyle}>
            My Profile
          </button>
          <button onClick={() => navigate("/login")} className={buttonStyle}>
            Login
          </button>
          <button
            onClick={() => {
              logout();
              alert("log out successfuly");
              setIsOpen(!isOpen);
            }}
            className={buttonStyle}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
