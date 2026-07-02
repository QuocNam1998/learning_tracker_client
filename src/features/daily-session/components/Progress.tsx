export interface ProgressProps {
  pct: number;
  done: number;
  total: number;
}

export function Progress({ pct, done, total }: ProgressProps) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke={done === total ? '#5cc97a' : '#c9a84c'}
        strokeWidth="3.5"
        strokeDasharray={circ}
        strokeDashoffset={circ - (circ * pct) / 100}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
        style={{ transition: 'stroke-dashoffset .5s ease' }}
      />
      <text x="22" y="26" textAnchor="middle" fill="#e8e4dc" fontSize="9" fontFamily="DM Mono,monospace">
        {pct}%
      </text>
    </svg>
  );
}
