export default function PageHeader({ title, subtitle }) {
  return (
    <header style={{ marginBlock: 'var(--space-4)', textAlign: 'center' }}>
      <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>{title}</h1>
      {subtitle && <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)' }}>{subtitle}</p>}
    </header>
  );
}
