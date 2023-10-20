import { defaultTimerStatistics } from "@/lib/const/defaultTimerStatistics";
import { create } from "zustand";

type Statistics = {
  global: CubeStatistics;
  session: CubeStatistics;
  cubeSession: CubeStatistics;
  setGlobalStats: (global: CubeStatistics) => void;
  setSessionStats: (session: CubeStatistics) => void;
  setCubeSessionStats: (cubeSession: CubeStatistics) => void;
};

export const useStatisticsStore = create<Statistics>((set) => ({
  global: defaultTimerStatistics,
  session: defaultTimerStatistics,
  cubeSession: defaultTimerStatistics,
  setGlobalStats: (global: CubeStatistics) => {
    set({ global });
  },
  setSessionStats: (session: CubeStatistics) => {
    set({ session });
  },
  setCubeSessionStats: (cubeSession: CubeStatistics) => {
    set({ cubeSession });
  },
}));
