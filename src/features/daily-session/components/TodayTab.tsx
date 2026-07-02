import { useState } from 'react';
import { CAL_COLORS, CAT_COLORS, DAYS_FULL, ICONS, LABELS, TARGETS } from '../constants';
import { dailySessionServices } from '../services';
import type { Category, DailySession, ExtraTask, Store } from '../types';
import { Progress } from './Progress';
import { Schedule } from './Schedule';

interface TodayTabProps {
  store: Store;
  todayIdx: number;
  schedule: DailySession[];
  extras: ExtraTask[];
  calDay: string;
  count: (cat: Category) => number;
  pct: (cat: Category) => number;
  onOptimisticUpdate: (id: number, isCompleted: boolean) => void;
}

const CATEGORIES: Category[] = ['tech', 'english', 'calisthenics', 'couple'];

export function TodayTab({ store, todayIdx, schedule, extras, calDay, onOptimisticUpdate }: TodayTabProps) {
  const doneSchedule = schedule.filter((t) => t.is_completed || !!store.dayDone[String(t.id)]).length;
  const doneExtras = extras.map((e) => e.key).filter((k) => store.dayDone[k]).length;
  const totalToday = schedule.length + extras.length;
  const doneToday = doneSchedule + doneExtras;
  const dayPct = totalToday === 0 ? 0 : Math.round((doneToday / totalToday) * 100);

  const [pending, setPending] = useState<Set<number>>(new Set());

  const toggleTaskState = async (id: number, isCompleted: boolean) => {
    if (pending.has(id)) return;
    setPending((prev) => new Set(prev).add(id));
    const next = !isCompleted;
    onOptimisticUpdate(id, next);
    const res = await dailySessionServices.updateTask(id, next);
    if (!res.ok) {
      onOptimisticUpdate(id, isCompleted);
    }
    setPending((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });
  };

  return (
    <div className="fade">
      {/* Day banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 16px',
          borderRadius: 8,
          marginBottom: 14,
          background: '#14141a',
          border: '1px solid #2a2a35',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17 }}>{DAYS_FULL[todayIdx]}</div>
          <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3 }}>
            {doneToday} of {totalToday} tasks done
          </div>
        </div>
        <span
          className="badge"
          style={{
            background: CAL_COLORS[calDay] + '22',
            color: CAL_COLORS[calDay],
            border: `1px solid ${CAL_COLORS[calDay]}44`,
          }}
        >
          💪 {calDay}
        </span>
        <Progress pct={dayPct} done={doneToday} total={totalToday} />
      </div>

      <Schedule schedule={schedule} store={store} pending={pending} onToggle={toggleTaskState} />

      {/* Mini week bars */}
      {/* <div className="card">
        <div className="sec">Week so far</div>
        {CATEGORIES.map((cat) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
            <div style={{ width: 66, fontSize: 10, color: CAT_COLORS[cat] }}>
              {ICONS[cat]} {LABELS[cat].split(' ')[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div className="pbar">
                <div className="pfill" style={{ width: `${pct(cat)}%`, background: CAT_COLORS[cat] }} />
              </div>
            </div>
            <div
              style={{
                fontSize: 10,
                color: 'var(--muted)',
                minWidth: 32,
                textAlign: 'right',
              }}
            >
              {count(cat)}/{TARGETS[cat]}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
