import type { Artwork } from "@creative-companion/common";
import { useQuery } from "@tanstack/react-query";

const FETCH_URL = "/api/artwork/daily";

export const useGetTodaysArt = () => {
  return useQuery({
    queryKey: ["DailyArt"],
    queryFn: async () => {
      const response = await fetch(`${FETCH_URL}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      const data: Artwork = await response.json();
      return data;
    },
  });
};
