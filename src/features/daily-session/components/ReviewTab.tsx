import type { Store, SundayReview } from "../types";

interface ReviewTabProps {
  store: Store;
  onThursdayChange: (value: string) => void;
  onSundayReviewChange: (key: keyof SundayReview, value: string) => void;
  onBiweeklyChange: (value: string) => void;
}

const SUNDAY_QUESTIONS: { key: keyof SundayReview; q: string }[] = [
  { key: "followed", q: "Did I follow the plan this week?" },
  { key: "skipped", q: "What did I skip or avoid?" },
  { key: "girlfriend", q: "Did I spend enough time with my girlfriend?" },
  { key: "change", q: "One thing to change next week?" },
];

export function ReviewTab({
  store,
  onThursdayChange,
  onSundayReviewChange,
  onBiweeklyChange,
}: ReviewTabProps) {
  return (
    <div className="fade">
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="sec">📖 Thursday Lunch — 5 English Sentences</div>
        <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
          About your week. No translator.
        </p>
        <textarea
          rows={6}
          placeholder={"1. \n2. \n3. \n4. \n5. "}
          value={store.week.thursdaySentences}
          onChange={(e) => onThursdayChange(e.target.value)}
        />
      </div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="sec">🗓 Sunday Review — 4 Questions</div>
        {SUNDAY_QUESTIONS.map(({ key, q }) => (
          <div key={key} style={{ marginBottom: 13 }}>
            <div style={{ fontSize: 11, color: "var(--gold)", marginBottom: 6 }}>{q}</div>
            <textarea
              rows={2}
              placeholder="Write your answer..."
              value={store.week.sundayReview[key]}
              onChange={(e) => onSundayReviewChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="card">
        <div className="sec">⚙ Biweekly Feature Build Log</div>
        <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
          Every 2 weeks: build one full-stack feature.
        </p>
        <textarea
          rows={4}
          placeholder="e.g. User auth with JWT + PostgreSQL..."
          value={store.week.biweeklyFeature}
          onChange={(e) => onBiweeklyChange(e.target.value)}
        />
      </div>
    </div>
  );
}
