import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastDemo: React.FC = () => {
  const showToastMessage = () => {
    toast(
      "Try the app by logging in: user:emma.boudet@email.com, psw:demototest",
      {
        position: "top-right",
        style: {
          background: "#FDE2E4",
          color: "#DB2777",
          fontWeight: "bold",
          fontSize: "14px",
          borderRadius: "12px",
          padding: "12px 16px",
        },
      }
    );
  };

  return (
    <div>
      <button
        className="text-mypink-400 dark:text-mypink-100 text-s w-full font-bold border border-b-mypink-100 rounded-2xl px-2 cursor-pointer hover:bg-mypink-100/50 xl:mr-10"
        onClick={showToastMessage}
      >
        Demo
      </button>
      <ToastContainer />
    </div>
  );
};
