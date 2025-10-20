import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type ToastErrorProps = { message?: string };

export const ToastError: React.FC<ToastErrorProps> = ({ message }) => {
  toast.error(message, {
    position: "bottom-right",
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
  return null;
};
