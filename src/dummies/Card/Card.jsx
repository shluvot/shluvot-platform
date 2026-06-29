export default function Card({ children }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: '16px',
        padding: 'var(--space-3)',
        boxShadow: '0 10px 30px rgba(27,47,82,.08)',
      }}
    >
      {children}
    </div>
  );
}
