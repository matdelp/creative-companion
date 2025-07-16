import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  authProvider: string | null;
  setAuthProvider: (authProvider: string) => void;
  setIsLoggedIn: (status: boolean) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => {
  return {
    isLoggedIn: false,
    authProvider: null,
    setAuthProvider: (authProvider) => set({ authProvider }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    logout: () => set({ isLoggedIn: false, authProvider: null }),
  };
});
export { useAuthStore };
