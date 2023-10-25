import { Solve } from "@/interfaces/Solve";
import { TimerStatus } from "@/interfaces/TimerStatus";
import addSolve from "@/lib/addSolve";
import findCube from "@/lib/findCube";
import genId from "@/lib/genId";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import { useTimerStore } from "@/store/timerStore";
import { useEffect, useRef, useState } from "react";

export default function useTimer() {
  const {
    selectedCube,
    scramble,
    setNewScramble,
    setCubes,
    setSelectedCube,
    setLastSolve,
    solvingTime,
    setSolvingTime,
    isSolving,
    setIsSolving,
  } = useTimerStore();

  const { settings } = useSettingsModalStore();

  const holdTimeRequired = settings.timer.holdToStart.status ? 500 : 0;
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("idle");
  const endTimeRef = useRef<number>(0);
  const holdingTimeRef = useRef<number>(0);
  const startTime = useRef<number>(0);
  const runningTimeId = useRef<any>(null);
  const isHolding = useRef(false);
  const isReleased = useRef(true);
  const hideWhileSolving = settings.features.hideWhileSolving.status;

  const handleHold = (event: KeyboardEvent) => {
    if ((selectedCube && event.code === "Space") || event.code === "Escape") {
      if (event.code === "Escape") {
        clearInterval(runningTimeId.current);
        setIsSolving(false);
        isReleased.current = false;
        startTime.current = 0;
        holdingTimeRef.current = 0;
        setLastSolve(null);
        setTimerStatus("idle");
        setSolvingTime(0);
        return;
      }

      if (isSolving) {
        clearInterval(runningTimeId.current);
        setIsSolving(false);
        isReleased.current = false;

        if (selectedCube && scramble) {
          const lastSolve: Solve = {
            id: genId(),
            startTime: startTime.current,
            endTime: endTimeRef.current,
            scramble: scramble,
            bookmark: false,
            time: solvingTime,
            dnf: false,
            plus2: false,
            rating: Math.floor(Math.random() * 20) + scramble.length,
            category: selectedCube.category,
            cubeId: selectedCube.id,
          };

          setLastSolve(lastSolve);

          if (selectedCube) {
            const newCubes = addSolve({
              cubeId: selectedCube.id,
              solve: lastSolve,
            });

            setCubes(newCubes);

            const currentCube = findCube({ cubeId: selectedCube.id });

            if (currentCube) setSelectedCube(currentCube);
          }

          setNewScramble(selectedCube);
        }

        startTime.current = 0;
        holdingTimeRef.current = 0;
        setTimerStatus("idle");
        return;
      }

      const now = Date.now();
      const difference = now - holdingTimeRef.current;

      if (!isReleased.current) return;

      if (!isHolding.current) {
        holdingTimeRef.current = now;
        isHolding.current = true;

        if (settings.timer.holdToStart.status) {
          setTimerStatus("holdingKey");
        } else {
          setTimerStatus("ready");
        }
      } else {
        if (difference >= holdTimeRequired) {
          setTimerStatus("ready");
        }
      }
    }
  };

  const handleRelease = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Escape") {
      isReleased.current = true;
      if (event.code === "Escape") return;

      const now = Date.now();
      const difference: number = now - holdingTimeRef.current;

      if (isHolding.current && !isSolving) {
        if (difference >= holdTimeRequired) {
          setIsSolving(true);
          isHolding.current = false;
          holdingTimeRef.current = 0;
          startTime.current = Date.now();
          runningTimeId.current = setInterval(() => {
            endTimeRef.current = Date.now();
            setSolvingTime(endTimeRef.current - (startTime.current || 0));
          });
          setTimerStatus("solving");
          return;
        }

        if (difference <= holdTimeRequired) {
          setIsSolving(false);
          isHolding.current = false;
          holdingTimeRef.current = 0;
          setTimerStatus("idle");
          return;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleHold);
    window.addEventListener("keyup", handleRelease);
    return () => {
      window.removeEventListener("keydown", handleHold);
      window.removeEventListener("keyup", handleRelease);
    };
  });

  return { solvingTime, timerStatus, hideWhileSolving };
}
