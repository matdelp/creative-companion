import { useQuery } from "@tanstack/react-query";

const FETCH_URL = "/api/artwork/amount";

export const useGetTotalArtworks = () => {
  return useQuery({
    queryKey: ["TotalArtworks"],
    queryFn: async () => {
      const response = await fetch(`${FETCH_URL}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      const data: { created_at: string }[] = await response.json();
      const dataNbr = data.length;
      return dataNbr;
    },
  });
};
