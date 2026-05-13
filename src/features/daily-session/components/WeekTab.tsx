import {
  CAL_COLORS,
  CAL_CYCLE,
  CAT_COLORS,
  CYCLE_FOR_DAY,
  DAYS,
  ICONS,
  LABELS,
  TARGETS,
} from "../constants";
import type { Category, Store } from "../types";

interface WeekTabProps {
  store: Store;
  toggleWeek: (cat: Category, i: number) => void;
  todayIdx: number;
  count: (cat: Category) => number;
  pct: (cat: Category) => number;
}

const CATEGORIES: Category[] = ["tech", "english", "calisthenics", "couple"];

export function WeekTab({ store, toggleWeek, todayIdx, count, pct }: WeekTabProps) {
  return (
    <div className="fade">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 10,
          marginBottom: 14,
        }}
      >
        {CATEGORIES.map((cat) => {
          const c = CAT_COLORS[cat];
          const r = 25;
          const circ = 2 * Math.PI * r;
          return (
            <div
              key={cat}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 7,
                padding: "13px 8px",
              }}
            >
              <div style={{ position: "relative", width: 64, height: 64 }}>
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r={r}
                    fill="none"
                    stroke="#2a2a35"
                    strokeWidth="4"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r={r}
                    fill="none"
                    stroke={c}
                    strokeWidth="4"
                    strokeDasharray={circ}
                    strokeDashoffset={circ - (circ * pct(cat)) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                    style={{ transition: "stroke-dashoffset .6s ease" }}
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  <span style={{ color: c, fontSize: 16, fontWeight: 500 }}>
                    {count(cat)}
                  </span>
                  <span style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>
                    /{TARGETS[cat]}
                  </span>
                </div>
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  textAlign: "center",
                }}
              >
                {ICONS[cat]} {LABELS[cat].split(" ")[0]}
              </div>
              <div className="pbar" style={{ width: "100%" }}>
                <div className="pfill" style={{ width: `${pct(cat)}%`, background: c }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="sec">Session Grid</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "64px repeat(7,1fr)",
            gap: 4,
            marginBottom: 7,
          }}
        >
          <div />
          {DAYS.map((d, i) => (
            <div key={d} className={`dh${i === todayIdx ? " now" : ""}`}>
              {d}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "64px repeat(7,1fr)",
            gap: 4,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 8,
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
            }}
          >
            CYCLE
          </div>
          {DAYS.map((d, i) => {
            const label = CAL_CYCLE[CYCLE_FOR_DAY[i]];
            return (
              <div key={d} style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: 8,
                    color: CAL_COLORS[label],
                    fontWeight: i === todayIdx ? 500 : 400,
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            style={{
              display: "grid",
              gridTemplateColumns: "64px repeat(7,1fr)",
              gap: 4,
              marginBottom: 5,
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 10, color: CAT_COLORS[cat] }}>{ICONS[cat]}</div>
            {DAYS.map((d, i) => (
              <div key={d} style={{ display: "flex", justifyContent: "center" }}>
                <div
                  className={`cbox${store.week[cat][i] ? " on" : ""}${i === todayIdx ? " today" : ""}`}
                  onClick={() => toggleWeek(cat, i)}
                >
                  {store.week[cat][i] ? "✓" : ""}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
