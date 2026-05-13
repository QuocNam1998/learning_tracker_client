const MONTHS = [
  {
    month: "Month 1",
    color: "#5c8fe0",
    goal: "Working Local App",
    items: ["Next.js App Router basics", "NestJS CRUD API", "PostgreSQL with TypeORM"],
  },
  {
    month: "Month 2",
    color: "#c9a84c",
    goal: "Deployed with Auth",
    items: ["JWT authentication", "Protected routes", "Deploy frontend + backend"],
  },
  {
    month: "Month 3",
    color: "#5cc97a",
    goal: "Interview Ready",
    items: ["Testing", "Swagger docs", "Performance", "Interview prep"],
  },
];

const WEEKLY_TARGETS = [
  { icon: "⌨", label: "Technical sessions", target: "5/week · 2hrs each" },
  { icon: "📖", label: "English sessions", target: "5/week · lunch + Sunday" },
  { icon: "💪", label: "Calisthenics", target: "3/week · Push→Pull→Legs" },
  { icon: "🤝", label: "Couple & life", target: "5 evenings/week" },
];

export function RoadmapTab() {
  return (
    <div className="fade">
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="sec">3-Month Roadmap</div>
        {MONTHS.map((m, mi) => (
          <div key={m.month} style={{ marginBottom: mi < 2 ? 22 : 0 }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: m.color + "22",
                  border: `1px solid ${m.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: m.color,
                  fontWeight: 500,
                }}
              >
                M{mi + 1}
              </div>
              <div>
                <div
                  style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, color: m.color }}
                >
                  {m.month}
                </div>
                <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".08em" }}>
                  MILESTONE: {m.goal}
                </div>
              </div>
            </div>
            {m.items.map((item, ii) => (
              <div
                key={ii}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "7px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: m.color,
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: 12 }}>{item}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="card">
        <div className="sec">Weekly Targets</div>
        {WEEKLY_TARGETS.map(({ icon, label, target }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid var(--border)",
              fontSize: 12,
            }}
          >
            <span>
              {icon} {label}
            </span>
            <span style={{ color: "var(--gold)", fontSize: 10, letterSpacing: ".08em" }}>
              {target}
            </span>
          </div>
        ))}
        <div
          style={{
            marginTop: 12,
            padding: "10px 12px",
            background: "#0c0c0f",
            borderRadius: 6,
            fontSize: 11,
            lineHeight: 1.7,
            color: "var(--muted)",
          }}
        >
          <span style={{ color: "var(--gold)" }}>Lunch rule:</span> Silent English only ·
          Listening · Reading · Vocab
        </div>
      </div>
    </div>
  );
}
