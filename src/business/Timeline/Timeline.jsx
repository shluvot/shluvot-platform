export default function Timeline({ events }) {
  if (!events?.length) return null;

  return (
    <div style={{ display: 'flex', overflowX: 'auto', gap: 'var(--space-4)', padding: 'var(--space-3) 0' }}>
      {events.map((event, index) => (
        <div key={index} style={{ minWidth: '8rem', textAlign: 'center', position: 'relative' }}>
          <div
            style={{
              width: '0.8rem',
              height: '0.8rem',
              borderRadius: '50%',
              background: 'var(--color-brand)',
              margin: '0 auto 0.5rem',
            }}
          />
          <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-dark)' }}>{event.year}</div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>{event.label}</div>
        </div>
      ))}
    </div>
  );
}
