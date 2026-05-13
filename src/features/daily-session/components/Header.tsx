import { DAYS_FULL } from "../constants";
import { getWeekKey } from "../lib/time";

type Tab = "today" | "week" | "review" | "roadmap";

const TABS: [Tab, string][] = [
  ["today", "Today"],
  ["week", "Week"],
  ["review", "Review"],
  ["roadmap", "Roadmap"],
];

interface HeaderProps {
  todayIdx: number;
  tab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Header({ todayIdx, tab, onTabChange }: HeaderProps) {
  return (
    <div style={{ borderBottom: "1px solid #1e1e28", padding: "18px 20px 0" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 4,
          }}
        >
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: ".04em",
            }}
          >
            WEEKLY MONITOR
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 500 }}>
              {DAYS_FULL[todayIdx].toUpperCase()}
            </div>
            <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: ".1em" }}>
              {getWeekKey()}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 0, marginTop: 12 }}>
          {TABS.map(([id, label], i, arr) => (
            <button
              key={id}
              className={`tab-btn${tab === id ? " on" : ""}`}
              style={{
                borderRadius:
                  i === 0
                    ? "6px 0 0 0"
                    : i === arr.length - 1
                      ? "0 6px 0 0"
                      : 0,
                borderRight: i < arr.length - 1 ? "none" : undefined,
              }}
              onClick={() => onTabChange(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
