import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authentication";

const FETCH_URL = "/api/artist/delete";

export const useDeleteUser = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthStore();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const response = await fetch(`${FETCH_URL}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(
          `Delete failed: ${response.status} ${response.statusText}`
        );
      }
    },
    onSuccess: () => {
      navigate("/");
      setIsLoggedIn(false);
    },
  });
};
