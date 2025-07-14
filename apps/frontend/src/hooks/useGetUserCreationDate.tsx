import { useQuery } from "@tanstack/react-query";

const FETCH_URL = "/api/artist/creationDate";

export const useGetUserCreationDate = () => {
  return useQuery({
    queryKey: ["UserCreationDate"],
    queryFn: async () => {
      const response = await fetch(`${FETCH_URL}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      const result: { created_at: string } = await response.json();
      return new Date(result.created_at);
    },
  });
};
