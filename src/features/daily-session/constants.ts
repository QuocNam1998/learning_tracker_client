import type { Category } from "./types";

export const STORAGE_KEY = "weekly-monitor-v2";

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const DAYS_FULL = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const CAL_CYCLE = ["Push", "Pull", "Legs", "Rest"] as const;
export const CAL_COLORS: Record<string, string> = {
  Push: "#e05c5c",
  Pull: "#5c8fe0",
  Legs: "#5cc97a",
  Rest: "#6b6b7a",
};

export const CYCLE_FOR_DAY = [0, 1, 2, 3, 0, 1, 2];

export const TARGETS: Record<Category, number> = {
  tech: 5,
  english: 5,
  calisthenics: 3,
  couple: 5,
};

export const CAT_COLORS: Record<Category, string> = {
  tech: "#5c8fe0",
  english: "#c9a84c",
  calisthenics: "#e05c5c",
  couple: "#5cc97a",
};

export const ICONS: Record<Category, string> = {
  tech: "⌨",
  english: "📖",
  calisthenics: "💪",
  couple: "🤝",
};

export const LABELS: Record<Category, string> = {
  tech: "Technical",
  english: "English",
  calisthenics: "Calisthenics",
  couple: "Couple & Life",
};
