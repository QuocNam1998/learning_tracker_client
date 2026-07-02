const dateTimeHandler = {
  getNow() {
    return new Date();
  },

  getTodayIdx() {
    const d = dateTimeHandler.getNow().getDay(); // 0=Sun..6=Sat
    return d === 0 ? 6 : d - 1; // → Mon=0..Sun=6
  },

  getWeekKey() {
    const now = dateTimeHandler.getNow();
    const jan1 = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil(((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${week}`;
  },

  getTodayDateKey() {
    const n = dateTimeHandler.getNow();
    return `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()}`;
  },

  getCurrentHour() {
    return dateTimeHandler.getNow().getHours().toString().padStart(2, '0');
  },

  toVietnamTime(input: string) {
    const iso = input.replace(' ', 'T').replace(/\+00$/, '+00:00');
    const date = new Date(iso);

    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(date);

    const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
    return {
      fullDate: `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`,
      date: `${p.year}-${p.month}-${p.day}`,
      time: `${p.hour}:${p.minute}:${p.second}`,
    };
  },
};

export default dateTimeHandler;
