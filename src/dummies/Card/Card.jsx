export default function Card({ children }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: '16px',
        padding: 'var(--space-3)',
        boxShadow: '0 10px 30px rgba(46,31,71,.08)',
      }}
    >
      {children}
    </div>
  );
}
