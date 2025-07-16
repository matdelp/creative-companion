import { useQuery } from "@tanstack/react-query";

const FETCH_URL = "/api/artist/me";

export const useIsLoggedIn = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await fetch(FETCH_URL, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) return false;
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      return true;
    },
  });
};
