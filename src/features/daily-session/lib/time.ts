export function getNow() {
  return new Date();
}

export function getTodayIdx() {
  const d = getNow().getDay(); // 0=Sun..6=Sat
  return d === 0 ? 6 : d - 1; // → Mon=0..Sun=6
}

export function getWeekKey() {
  const now = getNow();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(
    ((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7,
  );
  return `${now.getFullYear()}-W${week}`;
}

export function getTodayDateKey() {
  const n = getNow();
  return `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()}`;
}

export function getCurrentHour() {
  return getNow().getHours();
}
