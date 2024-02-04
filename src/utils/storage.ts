import { Pair } from "./canvas";

export let table: Record<string, Pair[]> = {};

export const resetTable = () => {
  table = {};
};
