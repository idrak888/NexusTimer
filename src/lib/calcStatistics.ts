import { sort } from "fast-sort";
import calculateCurrentAo from "./calculateCurrentAo";
import getDeviation from "./getDeviation";
import getMean from "./getMean";
import { defaultTimerStatistics } from "./const/defaultTimerStatistics";
import { Cube } from "@/interfaces/Cube";

export default function calcStatistics({
  cube,
}: {
  cube: Cube | null;
}): CubeStatistics {
  if (!cube) {
    return defaultTimerStatistics;
  }

  const sortedSolves = sort(cube.solves.session).asc((u) => u.time);
  if (sortedSolves.length === 0) {
    return defaultTimerStatistics;
  }

  const defaultResult: CubeStatistics = {
    count: sortedSolves.length,
    best: sortedSolves[0].time,
    ao3: 0,
    ao5: 0,
    ao12: 0,
    ao50: 0,
    ao100: 0,
    deviation: getDeviation(sortedSolves),
    mean: getMean(sortedSolves),
  };

  const aoValues = [3, 5, 12, 50, 100];

  for (const aoValue of aoValues) {
    if (sortedSolves.length >= aoValue) {
      defaultResult[`ao${aoValue}` as keyof CubeStatistics] =
        calculateCurrentAo(sortedSolves, aoValue);
    }
  }

  return defaultResult;
}
