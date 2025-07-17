import { create } from "zustand";

type AuthState = {
  authProvider: string | null;
  setAuthProvider: (authProvider: string | null) => void;
};

const useAuthStore = create<AuthState>((set) => {
  return {
    authProvider: null,
    setAuthProvider: (authProvider) => set({ authProvider }),
  };
});
export { useAuthStore };
