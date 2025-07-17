import type { ArtworkSubmit } from "@creative-companion/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const FETCH_URL = "/api/artwork/submit";

export const useCreateArtwork = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<void, Error, ArtworkSubmit>({
    mutationFn: async (formdata) => {
      const data = new FormData();
      if (formdata.title) {
        data.append("title", formdata.title);
      }
      if (formdata.description) {
        data.append("description", formdata.description);
      }
      data.append("content", formdata.content[0]);

      const response = await fetch(FETCH_URL, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Submit failed");
      }
      return;
    },
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["profileById"] });
    },
  });
};
