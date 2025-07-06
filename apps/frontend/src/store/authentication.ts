// src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: "auth",
    }
  )
);

// to use:
// const token = useAuthStore((state) => state.token);
// to log out:
// const logout = useAuthStore((state) => state.logout);
// logout(); // clears token from store and localStorage
// const token = useAuthStore((state) => state.token);
// to redirect if not logged in:
// if (!token) {
//   return <Navigate to="/login" />;
// }
