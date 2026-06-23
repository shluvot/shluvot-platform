export default function StatsStrip({ items }) {
  if (!items?.length) return null;

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-purple)', paddingBlock: 'var(--space-6)' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          insetInlineStart: '-6rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '18rem',
          height: '18rem',
          borderRadius: '50%',
          background: 'var(--color-purple-accent)',
          opacity: 0.18,
          filter: 'blur(40px)',
        }}
      />
      <div
        className="page"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
          gap: 'var(--space-4)',
          textAlign: 'center',
        }}
      >
        {items.map((item, index) => (
          <div key={index}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'var(--text-2xl)', color: 'var(--color-mustard)' }}>
              {item.value}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'var(--text-sm)', marginTop: '0.4rem' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
