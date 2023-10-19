import { defaultTimerStatistics } from "@/lib/const/defaultTimerStatistics";
import { create } from "zustand";

type Statistics = {
  global: CubeStatistics;
  session: CubeStatistics;
  cubeSession: CubeStatistics;
  setGlobal: (global: CubeStatistics) => void;
  setSession: (session: CubeStatistics) => void;
  setCubeSession: (cubeSession: CubeStatistics) => void;
};

export const useStatisticsStore = create<Statistics>((set) => ({
  global: defaultTimerStatistics,
  session: defaultTimerStatistics,
  cubeSession: defaultTimerStatistics,
  setGlobal: (global: CubeStatistics) => {
    set({ global });
  },
  setSession: (session: CubeStatistics) => {
    set({ session });
  },
  setCubeSession: (cubeSession: CubeStatistics) => {
    set({ cubeSession });
  },
}));
