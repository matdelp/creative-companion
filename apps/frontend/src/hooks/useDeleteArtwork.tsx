import type { ArtworkModification } from "@creative-companion/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FETCH_URL = "/api/artwork/delete";

export const useDeleteArtwork = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, ArtworkModification>({
    mutationFn: async (data) => {
      const response = await fetch(`${FETCH_URL}/${data.id}`, {
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
      queryClient.invalidateQueries({ queryKey: ["profileById"] });
    },
  });
};
