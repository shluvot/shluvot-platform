export default function StatsStrip({ items }) {
  if (!items?.length) return null;

  return (
    <section
      style={{
        background: 'var(--color-terracotta)',
        color: 'var(--color-cream-text)',
        padding: 'clamp(56px,7vw,84px) 28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{ position: 'absolute', top: '-30px', left: '8%', width: '140px', height: '140px', background: 'var(--color-gold)', borderRadius: '50%', opacity: 0.25 }}
      />
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '36px', textAlign: 'center' }}>
          {items.map((item, index) => (
            <div key={index}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(48px,6vw,72px)', lineHeight: 1, color: 'var(--color-cream-text)' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(247,241,232,.8)', marginTop: '8px' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
