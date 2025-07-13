import type { PromptRes } from "@creative-companion/common";
import { useQuery } from "@tanstack/react-query";

const FETCH_URL = "/api/prompt";

export const useGetPrompt = () => {
  return useQuery({
    queryKey: ["DailyPrompt"],
    queryFn: async () => {
      const response = await fetch(`${FETCH_URL}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      const data: PromptRes = await response.json();
      return data;
    },
  });
};
