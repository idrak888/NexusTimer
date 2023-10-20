"use client";
import Timer from "@/components/Timer";
import HeaderTimer from "@/components/HeaderTimer";
import TimerWidgets from "@/components/TimerWidgets";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import SettingsMenu from "@/components/SettingsMenu";
import Navigation from "@/components/Navigation";
import ManualMode from "@/components/ManualMode";
import { useTimerStore } from "@/store/timerStore";
import ConfettiDrop from "@/components/ConfettiDrop";
import { useEffect } from "react";
import calcStatistics from "@/lib/calcStatistics";
import { useStatisticsStore } from "@/store/StatisticsStore";

export default function Home() {
  const { settingsOpen, settings } = useSettingsModalStore();
  const { isSolving, selectedCube, lastSolve } = useTimerStore();
  const { global, session, setGlobalStats, setSessionStats } =
    useStatisticsStore();
  const manualMode = settings.timer.manualMode.status;

  useEffect(() => {
    if (selectedCube && !isSolving) {
      const { global, session } = calcStatistics({
        cube: selectedCube,
      });
      setGlobalStats(global);
      setSessionStats(session);
    }
  }, [
    isSolving,
    selectedCube,
    setGlobalStats,
    setSessionStats,
    global,
    lastSolve,
    session,
  ]);

  return (
    <>
      <ConfettiDrop />
      <div className="flex flex-col justify-between px-5 py-3 grow">
        {!isSolving && <HeaderTimer />}
        {manualMode ? <ManualMode /> : <Timer />}
        {!isSolving && <TimerWidgets />}
      </div>
      {settingsOpen && !isSolving && <SettingsMenu />}
      {!isSolving && <Navigation />}
    </>
  );
}
