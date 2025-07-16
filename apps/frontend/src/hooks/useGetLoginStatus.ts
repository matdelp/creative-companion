import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthenticationStore";
import { useEffect } from "react";

type LoginData = {
  login: boolean;
};
const FETCH_URL = "/api/artist/islogin";

export const useGetLoginStatus = () => {
  const { setIsLoggedIn } = useAuthStore();

  const query = useQuery<LoginData, Error>({
    queryKey: ["Login"],
    queryFn: async () => {
      const response = await fetch(FETCH_URL, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    },
  });

  useEffect(() => {
    if (query.data) {
      setIsLoggedIn(query.data.login);
    }
  }, [query.data, setIsLoggedIn]);

  return query;
};
