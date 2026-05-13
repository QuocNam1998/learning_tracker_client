"use client";

import { useState, useEffect } from "react";
import { loadAll, saveAll } from "../lib/storage";
import { getCurrentHour } from "../lib/time";
import { TARGETS } from "../constants";
import type { Store, Category } from "../types";

export function useStore() {
  const [store, setStore] = useState<Store>(loadAll);
  const [hour, setHour] = useState(getCurrentHour);

  useEffect(() => {
    saveAll(store);
  }, [store]);

  useEffect(() => {
    const id = setInterval(() => setHour(getCurrentHour()), 60000);
    return () => clearInterval(id);
  }, []);

  function toggleDay(key: string) {
    setStore((s) => ({
      ...s,
      dayDone: { ...s.dayDone, [key]: !s.dayDone[key] },
    }));
  }

  function toggleWeek(cat: Category, i: number) {
    setStore((s) => {
      const arr = [...s.week[cat]];
      arr[i] = !arr[i];
      return { ...s, week: { ...s.week, [cat]: arr } };
    });
  }

  const count = (cat: Category) => store.week[cat].filter(Boolean).length;
  const pct = (cat: Category) =>
    Math.min(Math.round((count(cat) / TARGETS[cat]) * 100), 100);

  return { store, setStore, toggleDay, toggleWeek, count, pct, hour };
}
