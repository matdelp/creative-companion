import { create } from "zustand";

type PromptState = {
  promptId: number | null;
  setPromptId: (status: number) => void;
};

export const usePromptStore = create<PromptState>((set) => ({
  promptId: null,
  setPromptId: (status) => set({ promptId: status }),
}));
