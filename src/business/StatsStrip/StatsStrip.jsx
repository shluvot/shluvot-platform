export default function StatsStrip({ items }) {
  if (!items?.length) return null;

  return (
    <section style={{ background: '#2E1F47', color: '#F6EFE3', padding: 'clamp(56px,7vw,84px) 28px', position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden="true"
        style={{ position: 'absolute', top: '-30px', left: '8%', width: '140px', height: '140px', background: '#E86A4E', borderRadius: '50%', opacity: 0.18 }}
      />
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '36px', textAlign: 'center' }}>
          {items.map((item, index) => (
            <div key={index}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(48px,6vw,72px)', lineHeight: 1, color: '#E9A93C' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(246,239,227,.85)', marginTop: '8px' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
