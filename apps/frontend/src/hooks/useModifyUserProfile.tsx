import type { UserUpdate } from "@creative-companion/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FETCH_URL = "/api/artist/edit/";

export const useModifyUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UserUpdate>({
    mutationFn: async (data) => {
      const response = await fetch(FETCH_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Update failed");
      }
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileById"] });
    },
  });
};
