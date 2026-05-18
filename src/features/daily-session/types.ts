export type Category = "tech" | "english" | "calisthenics" | "couple";

export type SundayReview = {
  followed: string;
  skipped: string;
  girlfriend: string;
  change: string;
};

export type Week = {
  key: string;
  tech: boolean[];
  english: boolean[];
  calisthenics: boolean[];
  couple: boolean[];
  thursdaySentences: string;
  sundayReview: SundayReview;
  biweeklyFeature: string;
};

export type Store = {
  week: Week;
  dayDone: Record<string, boolean>;
  dayKey: string;
};

export type ScheduleTask = {
  time: string;
  hour: number;
  label: string;
  sub: string;
  cat: Category | null;
  badge?: string;
};

export type ExtraTask = {
  key: string;
  label: string;
  sub: string;
  cat: Category | null;
};

export type SessionType = "calisthenics" | "english" | "technical";

export type DailySession = {
  id: number;
  week_id: number;
  date: string;
  session_type: SessionType;
  time_start: string;
  notes: string;
  is_completed: boolean;
};

// Shape returned by the remote API — extend as the backend evolves.
export type DailySessionData = {
  id?: string;
  date?: string;
  [key: string]: unknown;
};
