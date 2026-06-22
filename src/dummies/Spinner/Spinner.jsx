export default function Spinner({ label = 'טוען...' }) {
  return (
    <div role="status" style={{ textAlign: 'center', padding: 'var(--space-3)', color: 'var(--color-text-muted)' }}>
      {label}
    </div>
  );
}
