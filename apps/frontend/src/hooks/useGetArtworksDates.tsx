import type { ArtworkDates } from "@creative-companion/common";
import { useQuery } from "@tanstack/react-query";
import { startOfMonth, endOfMonth } from "date-fns";

const FETCH_URL = "/api/artwork/dates";

export const useGetArtworksDates = (date: Date) => {
  const from = startOfMonth(date).toISOString();
  const to = endOfMonth(date).toISOString();
  return useQuery({
    queryKey: ["ArtworksDates", from, to],
    queryFn: async () => {
      const response = await fetch(`${FETCH_URL}?from=${from}&to=${to}`, {
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
