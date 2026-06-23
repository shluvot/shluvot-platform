import MonoLabel from '../../dummies/MonoLabel/MonoLabel';

const BADGE_STYLES = [
  { bg: 'var(--color-terracotta)', color: '#fff', shadow: 'rgba(196,78,46,.4)' },
  { bg: 'var(--color-gold)', color: 'var(--color-purple)', shadow: 'rgba(201,154,69,.45)' },
  { bg: 'var(--color-teal-deep)', color: '#fff', shadow: 'rgba(47,92,88,.4)' },
  { bg: 'var(--color-sage)', color: '#fff', shadow: 'rgba(92,122,99,.4)' },
  { bg: 'var(--color-terracotta)', color: '#fff', shadow: 'rgba(196,78,46,.4)' },
  { bg: 'var(--color-gold)', color: 'var(--color-purple)', shadow: 'rgba(201,154,69,.45)' },
];

export default function BenefitsGrid({ label, heading, items }) {
  if (!items?.length) return null;

  return (
    <section id="benefits" style={{ background: 'var(--color-section-warm)', padding: 'clamp(64px,9vw,110px) 28px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
          <MonoLabel color="var(--color-terracotta)">{label}</MonoLabel>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(34px,5vw,52px)', lineHeight: 1.1, margin: 0, color: 'var(--color-purple)', letterSpacing: '-1px' }}>
            {heading}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {items.map((item, index) => {
            const badge = BADGE_STYLES[index % BADGE_STYLES.length];
            return (
              <div key={index} style={{ position: 'relative', background: 'var(--color-surface)', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(36,26,46,.08)' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '24px',
                    width: '40px',
                    height: '40px',
                    background: badge.bg,
                    borderRadius: '10px',
                    color: badge.color,
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 18px ${badge.shadow}`,
                  }}
                >
                  {index + 1}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '23px', margin: '8px 0 10px', color: 'var(--color-purple)' }}>{item.title}</h3>
                <p style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: 0 }}>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
