import { Cube } from "@/interfaces/Cube";
import getSolvesMetrics from "./getSolvesMetrics";
import { sort } from "fast-sort";

export function verifyRecords({
  best,
  ao5,
  ao12,
  ao50,
  ao100,
  cube,
}: {
  best: number;
  ao5: number;
  ao12: number;
  ao50: number;
  ao100: number;
  cube: Cube;
}) {
  const { global } = getSolvesMetrics(cube.category, cube.name);

  const bestGlobal = sort(global).asc((u) => u.time);
  console.log(bestGlobal[0]?.time, best);
  return {
    best: bestGlobal[0]?.time === best,
  };
}
