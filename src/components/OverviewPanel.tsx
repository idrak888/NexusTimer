import { useSettingsModalStore } from "@/store/SettingsModalStore";
import translation from "@/translations/global.json";
import formatTime from "@/lib/formatTime";
import { useStatisticsStore } from "@/store/StatisticsStore";

export default function OverviewPanel() {
  const { lang, settings } = useSettingsModalStore();
  const { global, session, cubeSession } = useStatisticsStore();

  return (
    <div className="flex flex-col justify-center w-full h-full">
      {settings.features.sessionStats.status ? (
        <>
          <div className="font-medium">
            {translation.timer["deviation"][lang]}
            {": "}
            {formatTime(session.deviation)}
            {" / "}
            {formatTime(cubeSession.deviation)}
          </div>
          <div className="font-medium">
            {translation.timer["mean"][lang]}
            {": "}
            {formatTime(session.mean)}
            {" / "}
            {formatTime(cubeSession.mean)}
          </div>
          <div className="font-medium">
            {translation.timer["best"][lang]}
            {": "}
            {formatTime(session.best)}
            {" / "}
            {formatTime(cubeSession.best)}
          </div>
          <div className="font-medium">
            {translation.timer["counter"][lang]}
            {": "}
            {session.count}
            {" / "}
            {cubeSession.count}
          </div>
        </>
      ) : null}
    </div>
  );
}
