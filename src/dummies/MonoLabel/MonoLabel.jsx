export default function MonoLabel({ children, variant = 'slash', color }) {
  const text = variant === 'dash' ? `— ${children} —` : `// ${children}`;
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8125rem',
        letterSpacing: '2px',
        color: color ?? 'var(--color-gold)',
        fontWeight: 500,
        marginBottom: '0.9rem',
      }}
    >
      {text}
    </div>
  );
}
