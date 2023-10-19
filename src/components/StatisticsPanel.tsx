import { useSettingsModalStore } from "@/store/SettingsModalStore";
import formatTime from "@/lib/formatTime";
import { useStatisticsStore } from "@/store/StatisticsStore";

export default function StatisticsPanel() {
  const { settings } = useSettingsModalStore();
  const { global, session, cubeSession } = useStatisticsStore();
  return (
    <>
      <div className="flex flex-col justify-center w-full h-full">
        {settings.features.sessionStats.status ? (
          <>
            <div className="font-medium text-right">
              Ao5: {session.ao5 === 0 ? "--" : formatTime(session.ao5)}
              {" / "}
              {cubeSession.ao5 === 0 ? "--" : formatTime(cubeSession.ao5)}
            </div>
            <div className="font-medium text-right">
              Ao12: {session.ao12 === 0 ? "--" : formatTime(session.ao12)}
              {" / "}
              {cubeSession.ao12 === 0 ? "--" : formatTime(cubeSession.ao12)}
            </div>
            <div className="font-medium text-right">
              Ao50: {session.ao50 === 0 ? "--" : formatTime(session.ao50)}
              {" / "}
              {cubeSession.ao50 === 0 ? "--" : formatTime(cubeSession.ao50)}
            </div>
            <div className="font-medium text-right">
              Ao100: {session.ao100 === 0 ? "--" : formatTime(session.ao100)}
              {" / "}
              {cubeSession.ao100 === 0 ? "--" : formatTime(cubeSession.ao100)}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
