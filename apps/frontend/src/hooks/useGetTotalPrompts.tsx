import { useQuery } from "@tanstack/react-query";

const FETCH_URL = "/api/prompt/number";

export const useGetTotalPrompts = (creationDate?: Date) => {
  const from = creationDate?.toISOString();
  const to = new Date().toISOString();
  console.log(
    "creationDate:",
    creationDate,
    "is Date?",
    creationDate instanceof Date
  );

  console.log({ from, to });
  console.log(`${FETCH_URL}?from=${from}&to=${to}`);

  return useQuery({
    queryKey: ["TotalPrompts", from, to],
    queryFn: async () => {
      console.log("here");

      const response = await fetch(`${FETCH_URL}?from=${from}&to=${to}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      const data: number = await response.json();
      console.log({ data });

      return data;
    },
  });
};
