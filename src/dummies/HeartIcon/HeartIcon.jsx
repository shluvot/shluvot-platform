export default function HeartIcon({ size = 28, color = 'var(--color-pink)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 21s-7.2-4.6-9.8-9.1C0.6 8.8 1.6 5.4 4.6 4.1c2.2-0.9 4.4 0 5.7 1.8L12 7.6l1.7-1.7c1.3-1.8 3.5-2.7 5.7-1.8 3 1.3 4 4.7 2.4 7.8C19.2 16.4 12 21 12 21z" />
    </svg>
  );
}
