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

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --gold:#c9a84c; --bg:#0c0c0f; --surface:#14141a; --border:#2a2a35; --text:#e8e4dc; --muted:#6b6b7a; }

  .fade { animation: up .45s ease both; }
  @keyframes up { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  .tab-btn { background:none; border:1px solid var(--border); color:var(--muted); padding:8px 16px; font-family:inherit; font-size:11px; letter-spacing:.12em; text-transform:uppercase; cursor:pointer; transition:all .2s; }
  .tab-btn.on { background:var(--gold); color:#0c0c0f; border-color:var(--gold); font-weight:500; }
  .tab-btn:hover:not(.on) { color:var(--text); border-color:#444; }

  .card { background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:18px; }
  .sec { font-family:'Syne',sans-serif; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; }

  .trow { display:flex; align-items:flex-start; gap:12px; padding:11px 0; border-bottom:1px solid var(--border); cursor:pointer; transition:opacity .2s; }
  .trow:last-child { border-bottom:none; }
  .trow.dim { opacity:.38; }
  .trow.now { background:#191924; margin:2px -18px; padding:11px 18px; border-radius:6px; border-bottom:none; }

  .circ { width:22px; height:22px; border-radius:50%; border:1.5px solid var(--border); flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:11px; transition:all .2s; margin-top:1px; background:var(--bg); }
  .circ.on { background:var(--gold); border-color:var(--gold); color:#0c0c0f; }
  .circ.pulse { border-color:var(--gold); box-shadow:0 0 0 3px #c9a84c1a; }

  .cbox { width:28px; height:28px; border:1px solid var(--border); background:var(--surface); border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:12px; transition:all .15s; }
  .cbox.on { background:var(--gold); border-color:var(--gold); color:#0c0c0f; }
  .cbox:hover { border-color:var(--gold); }
  .cbox.today { box-shadow:0 0 0 1px var(--gold); }

  .pbar { height:3px; background:var(--border); border-radius:2px; overflow:hidden; }
  .pfill { height:100%; border-radius:2px; transition:width .5s ease; }

  .badge { font-size:9px; padding:2px 7px; border-radius:3px; letter-spacing:.08em; text-transform:uppercase; font-weight:500; }
  .dh { font-size:10px; color:var(--muted); letter-spacing:.1em; text-align:center; }
  .dh.now { color:var(--gold); }

  textarea { background:#0c0c0f; border:1px solid var(--border); color:var(--text); font-family:inherit; font-size:12px; padding:10px 12px; border-radius:6px; width:100%; resize:vertical; outline:none; transition:border-color .2s; line-height:1.6; }
  textarea:focus { border-color:var(--gold); }
`;

export function DailySession() {
  const { store, setStore, toggleDay, toggleWeek, count, pct, hour } = useStore();
  const { loading, error, data } = useDailySession();
  const [tab, setTab] = useState<Tab>('today');

  const todayIdx = getTodayIdx();
  const { schedule, extras, calDay } = getTasksForDay(todayIdx);

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
      <style>{GLOBAL_STYLES}</style>

      <Header todayIdx={todayIdx} tab={tab} onTabChange={setTab} />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '18px 20px 60px' }}>
        {tab === 'today' && (
          <TodayTab
            store={store}
            toggleDay={toggleDay}
            todayIdx={todayIdx}
            schedule={data ?? []}
            extras={extras}
            calDay={calDay}
            hour={hour}
            count={count}
            pct={pct}
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
