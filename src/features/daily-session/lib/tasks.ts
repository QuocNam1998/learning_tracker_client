import { CYCLE_FOR_DAY, CAL_CYCLE } from "../constants";
import type { ScheduleTask, ExtraTask } from "../types";

export function getTasksForDay(dayIdx: number): {
  schedule: ScheduleTask[];
  extras: ExtraTask[];
  calDay: string;
  isRest: boolean;
} {
  const calIdx = CYCLE_FOR_DAY[dayIdx];
  const calDay = CAL_CYCLE[calIdx];
  const isRest = calDay === "Rest";
  const isThu = dayIdx === 3;
  const isSun = dayIdx === 6;
  const isWeekend = dayIdx >= 5;

  const schedule: ScheduleTask[] = [
    {
      time: "12:00 PM",
      hour: 12,
      label: "Lunch – Silent English only",
      sub: "Listening · Reading · Vocab — no speaking",
      cat: "english",
    },
    {
      time: "6:00 PM",
      hour: 18,
      label: "Buy food & eat dinner",
      sub: "Take your time, no rushing",
      cat: null,
    },
    {
      time: "7:00 PM",
      hour: 19,
      label: isRest ? "Rest day – no training" : `Calisthenics – ${calDay} session`,
      sub: isRest
        ? "Active recovery · stretch · light walk"
        : `Complete your ${calDay} circuit (1 hr)`,
      cat: isRest ? null : "calisthenics",
      badge: calDay,
    },
    {
      time: "8:00 PM",
      hour: 20,
      label: isWeekend ? "Study – English focus" : "Study – 2hr technical session",
      sub: isWeekend
        ? "Reading · grammar · vocabulary building"
        : "Next.js / NestJS / PostgreSQL / TypeORM",
      cat: isWeekend ? "english" : "tech",
    },
    {
      time: "10:00 PM",
      hour: 22,
      label: "Couple time & house tasks",
      sub: "Connect, tidy up, decompress together",
      cat: "couple",
    },
    {
      time: "10:30 PM",
      hour: 22,
      label: "Wind down → sleep at 11 PM",
      sub: "No screens · prepare for tomorrow",
      cat: null,
    },
  ];

  const extras: ExtraTask[] = [];
  if (isThu)
    extras.push({
      key: "thu_eng",
      label: "✍ Write 5 English sentences",
      sub: "About your week – no translator allowed",
      cat: "english",
    });
  if (isSun)
    extras.push({
      key: "sun_review",
      label: "📋 Sunday 4-question reflection",
      sub: "Plan · skips · couple time · one change",
      cat: null,
    });

  return { schedule, extras, calDay, isRest };
}
