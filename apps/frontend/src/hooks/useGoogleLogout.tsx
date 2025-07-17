import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthenticationStore";

const FETCH_URL = "/api/artist/google/logout";

export const useGoogleLogout = () => {
  const { setAuthProvider } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const response = await fetch(FETCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      return;
    },
    onSuccess: () => {
      setAuthProvider(null);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
