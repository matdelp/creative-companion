import type { Artwork } from "@creative-companion/common";
import { useQuery } from "@tanstack/react-query";

const FETCH_URL = "/api/artwork/collection";

export const useGetArtworks = () => {
  return useQuery({
    queryKey: ["Artworks"],
    queryFn: async () => {
      const response = await fetch(FETCH_URL, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      const data: Artwork[] = await response.json();
      return data;
    },
  });
};
