import calcStatistics from "@/lib/calcStatistics";
import { defaultTimerStatistics } from "@/lib/const/defaultTimerStatistics";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import { useTimerStore } from "@/store/timerStore";
import { useState, useEffect } from "react";
import formatTime from "@/lib/formatTime";
import { verifyRecords } from "@/lib/verifyRecords";
import { useConfettiStore } from "@/store/ConfettiStore";

export default function StatisticsPanel() {
  const { scramble, selectedCube } = useTimerStore();
  const { settings } = useSettingsModalStore();
  const [statistics, setStatistics] = useState(defaultTimerStatistics);
  const { setIsVisible } = useConfettiStore();

  useEffect(() => {
    const { count, best, ao3, ao5, ao12, ao50, ao100, deviation, mean } =
      calcStatistics({
        cube: selectedCube,
      });
    if (selectedCube) {
      const records = verifyRecords({
        best,
        ao5,
        ao12,
        ao50,
        ao100,
        cube: selectedCube,
      });
      console.log(records);
      if (records.best) setIsVisible(true);
    }

    setStatistics({
      count,
      best,
      ao3,
      ao5,
      ao12,
      ao50,
      ao100,
      deviation,
      mean,
    });
  }, [scramble, selectedCube, setIsVisible]);

  return (
    <>
      <div className="flex flex-col justify-center w-full h-full">
        {settings.features.sessionStats.status ? (
          <>
            <div className="font-medium text-right">
              Ao5: {statistics.ao5 === 0 ? "--" : formatTime(statistics.ao5)}
            </div>
            <div className="font-medium text-right">
              Ao12: {statistics.ao12 === 0 ? "--" : formatTime(statistics.ao12)}
            </div>
            <div className="font-medium text-right">
              Ao50: {statistics.ao50 === 0 ? "--" : formatTime(statistics.ao50)}
            </div>
            <div className="font-medium text-right">
              Ao100:{" "}
              {statistics.ao100 === 0 ? "--" : formatTime(statistics.ao100)}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
