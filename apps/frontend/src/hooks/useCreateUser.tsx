import type { UserLogin } from "@creative-companion/common";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const FETCH_URL = "/api/artist/register";

export const useCreateUser = () => {
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
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      return;
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
};
