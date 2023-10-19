import { create } from "zustand";

type ConfettiStore = {
  isVisible: boolean;
  setIsVisible: (status: boolean) => void;
};

export const useConfettiStore = create<ConfettiStore>((set) => ({
  isVisible: true,
  setIsVisible: (status: boolean) => {
    set({ isVisible: status });
  },
}));
