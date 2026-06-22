export default function StatsStrip({ items }) {
  if (!items?.length) return null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--space-5)',
        flexWrap: 'wrap',
        padding: 'var(--space-3) 0',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        margin: 'var(--space-4) 0',
      }}
    >
      {items.map((item, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', color: 'var(--color-brand)' }}>
            {item.value}
          </div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
