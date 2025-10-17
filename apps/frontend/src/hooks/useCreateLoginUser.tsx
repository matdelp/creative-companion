import type { UserLogin } from "@creative-companion/common";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthenticationStore";

const FETCH_URL = "/api/artist/login";

export const useCreateLoginUser = () => {
  const { setAuthProvider } = useAuthStore();
  const navigate = useNavigate();

  return useMutation<void, Error, UserLogin>({
    mutationFn: async (data) => {
      const response = await fetch(FETCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return;
    },
    onSuccess: () => {
      console.log("success");
      setAuthProvider("local");
      navigate("/");
    },
  });
};
