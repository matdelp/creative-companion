import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type ToastProps = { message?: string; delay?: number };

export const ToastUpdating: React.FC<ToastProps> = ({ message, delay }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info(message, {
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
    }, delay);

    return () => clearTimeout(timer);
  }, [message, delay]);

  return null;
};
