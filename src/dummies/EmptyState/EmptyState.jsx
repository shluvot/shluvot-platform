export default function EmptyState({ message }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--space-5) var(--space-3)',
        color: 'var(--color-text-muted)',
        background: 'var(--color-surface)',
        borderRadius: '16px',
        fontSize: 'var(--text-lg)',
      }}
    >
      {message}
    </div>
  );
}
