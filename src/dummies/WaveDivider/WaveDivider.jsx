export default function WaveDivider({ color = 'var(--color-pink)' }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: '3.5rem' }}
      aria-hidden="true"
    >
      <path
        d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,45 L1440,80 L0,80 Z"
        fill="none"
        stroke={color}
        strokeWidth="4"
      />
    </svg>
  );
}
