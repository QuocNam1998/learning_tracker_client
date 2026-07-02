'use client';

import { useState } from 'react';
import { useStore } from './hooks/useStore';
import { getTodayIdx } from './lib/time';
import { getTasksForDay } from './lib/tasks';
import { Header } from './components/Header';
import { TodayTab } from './components/TodayTab';
import { WeekTab } from './components/WeekTab';
import { ReviewTab } from './components/ReviewTab';
import { RoadmapTab } from './components/RoadmapTab';
import type { SundayReview } from './types';
import { useDailySession } from './hooks/useDailySession';

type Tab = 'today' | 'week' | 'review' | 'roadmap';


export function DailySession() {
  const { store, setStore, toggleWeek, count, pct } = useStore();
  const { loading, error, data, optimisticUpdateTask } = useDailySession();
  const [tab, setTab] = useState<Tab>('today');

  const todayIdx = getTodayIdx();
  const { extras, calDay } = getTasksForDay(todayIdx);

  if (loading)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0c0c0f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b6b7a',
          fontFamily: 'monospace',
        }}
      >
        loading…
      </div>
    );
  if (error) console.warn('[DailySession] remote data unavailable:', error);

  function handleThursdayChange(value: string) {
    setStore((s) => ({ ...s, week: { ...s.week, thursdaySentences: value } }));
  }

  function handleSundayReviewChange(key: keyof SundayReview, value: string) {
    setStore((s) => ({
      ...s,
      week: {
        ...s.week,
        sundayReview: { ...s.week.sundayReview, [key]: value },
      },
    }));
  }

  function handleBiweeklyChange(value: string) {
    setStore((s) => ({ ...s, week: { ...s.week, biweeklyFeature: value } }));
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0c0c0f',
        color: '#e8e4dc',
        fontFamily: "'DM Mono','Fira Mono',monospace",
        overflowX: 'hidden',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '18px 20px 60px' }}>
        {tab === 'today' && (
          <TodayTab
            store={store}
            todayIdx={todayIdx}
            schedule={data ?? []}
            extras={extras}
            calDay={calDay}
            count={count}
            pct={pct}
            onOptimisticUpdate={optimisticUpdateTask}
          />
        )}
        {tab === 'week' && (
          <WeekTab store={store} toggleWeek={toggleWeek} todayIdx={todayIdx} count={count} pct={pct} />
        )}
        {tab === 'review' && (
          <ReviewTab
            store={store}
            onThursdayChange={handleThursdayChange}
            onSundayReviewChange={handleSundayReviewChange}
            onBiweeklyChange={handleBiweeklyChange}
          />
        )}
        {tab === 'roadmap' && <RoadmapTab />}
      </div>
    </div>
  );
}
