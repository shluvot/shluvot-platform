export default function AboutIllustration() {
  return (
    <svg viewBox="0 0 420 420" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <radialGradient id="aboutNavyGlow" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#1B2F52" />
          <stop offset="55%" stopColor="#0F1B33" />
          <stop offset="100%" stopColor="#070D1A" />
        </radialGradient>
        <filter id="aboutGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
        </filter>
      </defs>
      <rect width="420" height="420" fill="url(#aboutNavyGlow)" />
      <rect width="420" height="420" filter="url(#aboutGrain)" />
      <circle cx="210" cy="210" r="140" fill="#C9A227" opacity="0.07" />

      <g fill="none" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="138,206 210,140 282,206" />
        <rect x="156" y="206" width="108" height="100" />
        <line x1="210" y1="240" x2="210" y2="306" />
        <line x1="186" y1="266" x2="186" y2="284" />
      </g>
      <circle cx="210" cy="140" r="5" fill="#C9A227" stroke="none" />
    </svg>
  );
}
