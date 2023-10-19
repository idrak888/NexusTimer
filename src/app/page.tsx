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
import { useStatisticsStore } from "@/store/StatisticsStore";
import calcStatistics from "@/lib/calcStatistics";
import { useEffect } from "react";
import verifyRecords from "@/lib/verifyRecords";
import { useConfettiStore } from "@/store/ConfettiStore";

export default function Home() {
  const { settingsOpen, settings } = useSettingsModalStore();
  const { isSolving, selectedCube, lastSolve } = useTimerStore();
  const { setGlobal, setSession } = useStatisticsStore();
  const { setIsVisible } = useConfettiStore();

  useEffect(() => {
    if (selectedCube && !isSolving) {
      const { global, session } = calcStatistics({
        cube: selectedCube,
      });

      const record = verifyRecords({ global, session, lastSolve });
      if (
        record.best.status ||
        record.ao5.status ||
        record.ao12.status ||
        record.ao50.status ||
        record.ao100.status
      ) {
        setIsVisible(true);
      }
      console.log(record);
      setGlobal(global);
      setSession(session);
    }
  }, [selectedCube, isSolving, setGlobal, setSession, setIsVisible, lastSolve]);

  return (
    <>
      <ConfettiDrop />
      <div className="flex flex-col justify-between px-5 py-3 grow">
        {!isSolving && <HeaderTimer />}
        {settings.timer.manualMode.status ? <ManualMode /> : <Timer />}
        {!isSolving && <TimerWidgets />}
      </div>
      {settingsOpen && !isSolving && <SettingsMenu />}
      {!isSolving && <Navigation />}
    </>
  );
}
