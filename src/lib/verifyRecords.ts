import { Solve } from "@/interfaces/Solve";
import { defaultRecords as record } from "./defaultRecords";

export default function verifyRecords({
  global,
  session,
  lastSolve,
}: {
  global: CubeStatistics;
  session: CubeStatistics;
  lastSolve: Solve | null;
}) {
  // if (lastSolve) {
  //   if (global.best === lastSolve.time && global.best > 0) {
  //     record.best.status = true;
  //     console.log(global.best - lastSolve.time);
  //     record.best.difference = global.best - lastSolve.time;
  //   }
  // }
  if (session.ao5 === global.ao5 && global.ao5 > 0) {
    record.ao5.status = true;
    record.ao5.difference = global.ao5 - session.ao5;
  }
  if (session.ao12 === global.ao12 && global.ao12 > 0) {
    record.ao12.status = true;
    record.ao12.difference = global.ao12 - session.ao12;
  }
  if (session.ao50 === global.ao50 && global.ao50 > 0) {
    record.ao50.status = true;
    record.ao50.difference = global.ao50 - session.ao50;
  }
  if (session.ao100 === global.ao100 && global.ao100 > 0) {
    record.ao100.status = true;
    record.ao100.difference = global.ao100 - session.ao100;
  }

  return record;
}
