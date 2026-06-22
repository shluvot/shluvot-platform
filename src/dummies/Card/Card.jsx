export default function Card({ children }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        padding: 'var(--space-3)',
      }}
    >
      {children}
    </div>
  );
}
