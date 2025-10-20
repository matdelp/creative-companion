import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastDemoProps = {
  demoButtonStyle: string;
};

export const ToastDemo: React.FC<ToastDemoProps> = ({ demoButtonStyle }) => {
  const showToastMessage = () => {
    toast(`Try the app by logging in:\nuser: demo@email.com\npsw: demototest`, {
      position: "top-right",
      style: {
        background: "#FDE2E4",
        color: "#DB2777",
        fontWeight: "bold",
        fontSize: "14px",
        borderRadius: "12px",
        padding: "12px 16px",
        whiteSpace: "pre-line",
      },
    });
  };

  return (
    <div>
      <button className={demoButtonStyle} onClick={showToastMessage}>
        Demo
      </button>
      <ToastContainer />
    </div>
  );
};
