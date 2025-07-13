import type { ArtworkDates } from "@creative-companion/common";
import { useQuery } from "@tanstack/react-query";

const FETCH_URL = "/api/artwork/dates";

export const useGetArtworksDates = () => {
  return useQuery({
    queryKey: ["ArtworksDates"],
    queryFn: async () => {
      const response = await fetch(`${FETCH_URL}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      const data: ArtworkDates[] = await response.json();
      return data;
    },
  });
};
