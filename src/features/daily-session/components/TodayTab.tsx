import { CAL_COLORS, CAT_COLORS, DAYS_FULL, ICONS, LABELS, TARGETS } from '../constants';
import type { Category, ExtraTask, ScheduleTask, Store } from '../types';

interface TodayTabProps {
  store: Store;
  toggleDay: (key: string) => void;
  todayIdx: number;
  schedule: ScheduleTask[];
  extras: ExtraTask[];
  calDay: string;
  hour: number;
  count: (cat: Category) => number;
  pct: (cat: Category) => number;
}

const CATEGORIES: Category[] = ['tech', 'english', 'calisthenics', 'couple'];

export function TodayTab({ store, toggleDay, todayIdx, schedule, extras, calDay, hour, count, pct }: TodayTabProps) {
  const totalToday = schedule.length + extras.length;
  const doneToday = [...schedule.map((_, i) => `s${i}`), ...extras.map((e) => e.key)].filter(
    (k) => store.dayDone[k],
  ).length;
  const dayPct = Math.round((doneToday / totalToday) * 100);

  const r = 18;
  const circ = 2 * Math.PI * r;

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
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r={r} fill="none" stroke="#2a2a35" strokeWidth="3.5" />
          <circle
            cx="22"
            cy="22"
            r={r}
            fill="none"
            stroke={doneToday === totalToday ? '#5cc97a' : '#c9a84c'}
            strokeWidth="3.5"
            strokeDasharray={circ}
            strokeDashoffset={circ - (circ * dayPct) / 100}
            strokeLinecap="round"
            transform="rotate(-90 22 22)"
            style={{ transition: 'stroke-dashoffset .5s ease' }}
          />
          <text x="22" y="26" textAnchor="middle" fill="#e8e4dc" fontSize="9" fontFamily="DM Mono,monospace">
            {dayPct}%
          </text>
        </svg>
      </div>

      {/* Schedule */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="sec">📅 Schedule</div>
        {schedule.map((task, i) => {
          const key = `s${i}`;
          const done = !!store.dayDone[key];
          const isNow = hour >= task.hour && hour < task.hour + 2;
          return (
            <div
              key={key}
              className={`trow${done ? ' dim' : ''}${isNow && !done ? ' now' : ''}`}
              onClick={() => toggleDay(key)}
            >
              <div style={{ minWidth: 64, paddingTop: 2 }}>
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: '.08em',
                    color: isNow && !done ? 'var(--gold)' : 'var(--muted)',
                  }}
                >
                  {task.time}
                </div>
              </div>
              <div className={`circ${done ? ' on' : ''}${isNow && !done ? ' pulse' : ''}`}>
                {done ? '✓' : isNow ? '▸' : ''}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: done ? 'var(--muted)' : 'var(--text)',
                    textDecoration: done ? 'line-through' : 'none',
                    marginBottom: 2,
                  }}
                >
                  {task.label}
                  {task.badge && !done && (
                    <span
                      className="badge"
                      style={{
                        marginLeft: 8,
                        background: CAL_COLORS[task.badge] + '22',
                        color: CAL_COLORS[task.badge],
                        border: `1px solid ${CAL_COLORS[task.badge]}44`,
                      }}
                    >
                      {task.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>{task.sub}</div>
              </div>
              {task.cat && (
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: CAT_COLORS[task.cat],
                    flexShrink: 0,
                    marginTop: 7,
                    opacity: done ? 0.3 : 1,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Day-specific extras */}
      {extras.length > 0 && (
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="sec">⚡ Special Today</div>
          {extras.map((ex) => {
            const done = !!store.dayDone[ex.key];
            return (
              <div key={ex.key} className={`trow${done ? ' dim' : ''}`} onClick={() => toggleDay(ex.key)}>
                <div className={`circ${done ? ' on' : ''}`}>{done ? '✓' : ''}</div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: done ? 'var(--muted)' : 'var(--gold)',
                      textDecoration: done ? 'line-through' : 'none',
                      marginBottom: 2,
                    }}
                  >
                    {ex.label}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{ex.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mini week bars */}
      <div className="card">
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
      </div>
    </div>
  );
}
