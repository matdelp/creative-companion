import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const FETCH_URL = "/api/artist/delete";

export const useDeleteUser = () => {
  const navigate = useNavigate();

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
    },
  });
};
