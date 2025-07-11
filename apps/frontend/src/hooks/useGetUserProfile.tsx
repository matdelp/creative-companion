import { useQuery } from "@tanstack/react-query";
import type { UserProfile } from "@creative-companion/common";
const FETCH_URL = "/api/artist/profile";
export const useGetUserProfile = (take?: number) => {
  return useQuery({
    queryKey: ["profileById"],
    queryFn: async () => {
      const qs = take ? new URLSearchParams({ take: take.toString() }) : "";
      const response = await fetch(`${FETCH_URL}?${qs}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      const data: UserProfile = await response.json();
      return data;
    },
  });
};
