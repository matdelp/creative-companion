import type { ArtworkCollectionPaginated } from "@creative-companion/common";
import { useInfiniteQuery } from "@tanstack/react-query";

const FETCH_URL = "/api/artwork/collection";

export const useGetArtworks = () => {
  return useInfiniteQuery({
    queryKey: ["Artworks"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`${FETCH_URL}?page=${pageParam}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      const data: ArtworkCollectionPaginated = await response.json();
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });
};
