import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastDemo: React.FC = () => {
  const showToastMessage = () => {
    toast.info(
      "Try the app by logging in: user:emma.boudet@email.com, psw:demototest",
      {
        position: "top-right",
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
