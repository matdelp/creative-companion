import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const FETCH_URL = "/api/prompt/number";

export const useGetTotalPrompts = (creationDate?: Date) => {
  const from = useMemo(() => {
    if (!creationDate) return undefined;
    const date = new Date(creationDate);
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
  }, [creationDate]);
  const to = useMemo(() => new Date().toISOString(), []);

  return useQuery({
    queryKey: ["TotalPrompts", from, to],
    queryFn: async () => {
      const response = await fetch(`${FETCH_URL}?from=${from}&to=${to}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }

      const data: number = await response.json();
      return data;
    },
    enabled: !!creationDate,
  });
};
