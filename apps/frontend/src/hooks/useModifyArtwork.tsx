import type { ArtworkModification } from "@creative-companion/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FETCH_URL = "/api/artwork/edit";

export const useModifyArtwork = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, ArtworkModification>({
    mutationFn: async (data) => {
      const response = await fetch(`${FETCH_URL}/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
