import { useMutation, useQueryClient } from "@tanstack/react-query";

const FETCH_URL = "/api/artist/editPhoto";

export const useModifyProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, FormData>({
    mutationFn: async (formData) => {
      const response = await fetch(FETCH_URL, {
        method: "PATCH",
        body: formData,
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
