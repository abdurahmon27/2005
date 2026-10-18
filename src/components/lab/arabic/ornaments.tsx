/**
 * The course's imagery, drawn in SVG so it stays sharp and gruvbox-coloured:
 * the eight-pointed star (khatam) that runs through Islamic geometric art, a
 * and a tiling made of it.
 */

/** Points of an eight-pointed star — two squares, one turned 45°. */
export function starPoints(cx: number, cy: number, outer: number): string {
  const inner = outer * 0.7654; // where the two squares' edges cross
  const points: string[] = [];
  for (let i = 0; i < 16; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 8) * i - Math.PI / 2;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return points.join(" ");
}

/** A khatam tiling — use as a background layer. */
export function StarPattern({
  id,
  size = 64,
  color = "#d79921",
  opacity = 0.35,
  className,
}: {
  id: string;
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
}) {
  const half = size / 2;
  return (
    <svg aria-hidden="true" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeOpacity={opacity} strokeWidth="1">
            <polygon points={starPoints(half, half, size * 0.36)} />
            <polygon points={starPoints(half, half, size * 0.18)} strokeOpacity={opacity * 0.6} />
            {/* the small stars where four tiles meet */}
            {[
              [0, 0],
              [size, 0],
              [0, size],
              [size, size],
            ].map(([x, y]) => (
              <polygon key={`${x}-${y}`} points={starPoints(x, y, size * 0.14)} />
            ))}
            <line x1={half} y1={half - size * 0.36} x2={half} y2={0} strokeOpacity={opacity * 0.5} />
            <line x1={half} y1={half + size * 0.36} x2={half} y2={size} strokeOpacity={opacity * 0.5} />
            <line x1={half - size * 0.36} y1={half} x2={0} y2={half} strokeOpacity={opacity * 0.5} />
            <line x1={half + size * 0.36} y1={half} x2={size} y2={half} strokeOpacity={opacity * 0.5} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** A layered eight-pointed rosette, the frame behind a big glyph. */
export function Rosette({ id, glow = true }: { id: string; glow?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-fill`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#3c3836" />
          <stop offset="100%" stopColor="#1d2021" />
        </radialGradient>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fabd2f" />
          <stop offset="100%" stopColor="#d65d0e" />
        </linearGradient>
      </defs>
      {glow && <circle cx="100" cy="100" r="96" fill="#fabd2f" opacity="0.04" />}
      <polygon points={starPoints(100, 100, 94)} fill={`url(#${id}-fill)`} stroke={`url(#${id}-stroke)`} strokeWidth="1.6" />
      <polygon points={starPoints(100, 100, 82)} fill="none" stroke="#d79921" strokeOpacity="0.45" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#d79921" strokeOpacity="0.35" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="54" fill="none" stroke="#d79921" strokeOpacity="0.2" strokeWidth="0.6" strokeDasharray="2 3" />
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (Math.PI / 4) * i - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={100 + 72 * Math.cos(angle)}
            cy={100 + 72 * Math.sin(angle)}
            r="2"
            fill="#fabd2f"
            opacity="0.7"
          />
        );
      })}
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

export function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

export function Bars() {
  return (
    <span className="q-bars" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
