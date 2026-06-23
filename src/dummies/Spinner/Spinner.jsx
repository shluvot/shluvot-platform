export default function Spinner({ label = 'טוען...' }) {
  return (
    <div role="status" style={{ textAlign: 'center', padding: 'var(--space-4)', color: 'var(--color-text-muted)' }}>
      <div className="spinner-ring" style={{ margin: '0 auto 0.8rem' }} />
      {label}
    </div>
  );
}
