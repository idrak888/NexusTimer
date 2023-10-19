import calcStatistics from "@/lib/calcStatistics";
import { defaultTimerStatistics } from "@/lib/const/defaultTimerStatistics";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import { useTimerStore } from "@/store/timerStore";
import translation from "@/translations/global.json";
import { useState, useEffect } from "react";
import formatTime from "@/lib/formatTime";
import { verifyRecords } from "@/lib/verifyRecords";
import { useConfettiStore } from "@/store/ConfettiStore";

export default function OverviewPanel() {
  const { lang, settings } = useSettingsModalStore();
  const { scramble, selectedCube } = useTimerStore();
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
    <div className="flex flex-col justify-center w-full h-full">
      {settings.features.sessionStats.status ? (
        <>
          <div className="font-medium">
            {translation.timer["deviation"][lang]}
            {": "}
            {formatTime(statistics.deviation)}
          </div>
          <div className="font-medium">
            {translation.timer["mean"][lang]}
            {": "}
            {formatTime(statistics.mean)}
          </div>
          <div className="font-medium">
            {translation.timer["best"][lang]}
            {": "}
            {formatTime(statistics.best)}
            {" / "}
            {"1.12"}
          </div>
          <div className="font-medium">
            {translation.timer["counter"][lang]}
            {": "}
            {statistics.count}
          </div>
        </>
      ) : null}
    </div>
  );
}
