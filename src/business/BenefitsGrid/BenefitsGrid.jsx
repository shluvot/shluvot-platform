import MonoLabel from '../../dummies/MonoLabel/MonoLabel';

const BADGE_COLORS = ['var(--color-coral)', 'var(--color-mustard)', 'var(--color-terracotta)', 'var(--color-purple)', 'var(--color-coral)', 'var(--color-mustard)'];

export default function BenefitsGrid({ label, heading, items }) {
  if (!items?.length) return null;

  return (
    <section id="benefits" style={{ background: 'var(--color-tan)', paddingBlock: 'var(--space-6)' }}>
      <div className="page">
        <div style={{ textAlign: 'center', maxWidth: '36rem', marginInline: 'auto', marginBottom: 'var(--space-5)' }}>
          <MonoLabel>{label}</MonoLabel>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginTop: 0 }}>{heading}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))', gap: 'var(--space-4)' }}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius)',
                padding: 'var(--space-4)',
                boxShadow: '0 14px 36px rgba(34, 28, 23, 0.08)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '-12px',
                  insetInlineEnd: '24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: BADGE_COLORS[index % BADGE_COLORS.length],
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'var(--text-sm)',
                }}
              >
                {index + 1}
              </span>
              <h3 style={{ fontSize: 'var(--text-lg)', marginTop: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
