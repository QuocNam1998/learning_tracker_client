import { STORAGE_KEY } from "../constants";
import { getWeekKey, getTodayDateKey } from "./time";
import type { Store, Week } from "../types";

export function defaultWeek(): Week {
  return {
    key: getWeekKey(),
    tech: new Array<boolean>(7).fill(false),
    english: new Array<boolean>(7).fill(false),
    calisthenics: new Array<boolean>(7).fill(false),
    couple: new Array<boolean>(7).fill(false),
    thursdaySentences: "",
    sundayReview: { followed: "", skipped: "", girlfriend: "", change: "" },
    biweeklyFeature: "",
  };
}

export function loadAll(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
      return { week: defaultWeek(), dayDone: {}, dayKey: getTodayDateKey() };
    const s = JSON.parse(raw);
    const week = s.week?.key === getWeekKey() ? s.week : defaultWeek();
    const today = getTodayDateKey();
    const dayDone = s.dayKey === today ? s.dayDone || {} : {};
    return { week, dayDone, dayKey: today };
  } catch {
    return { week: defaultWeek(), dayDone: {}, dayKey: getTodayDateKey() };
  }
}

export function saveAll(d: Store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  } catch {}
}
