import MonoLabel from '../../dummies/MonoLabel/MonoLabel';

const BADGE_STYLES = [
  { bg: 'var(--color-navy)', color: '#fff', shadow: 'rgba(27,47,82,.4)' },
  { bg: 'var(--color-gold)', color: 'var(--color-navy)', shadow: 'rgba(201,162,39,.45)' },
  { bg: 'var(--color-navy)', color: '#fff', shadow: 'rgba(27,47,82,.4)' },
  { bg: 'var(--color-gold)', color: 'var(--color-navy)', shadow: 'rgba(201,162,39,.45)' },
  { bg: 'var(--color-navy)', color: '#fff', shadow: 'rgba(27,47,82,.4)' },
  { bg: 'var(--color-gold)', color: 'var(--color-navy)', shadow: 'rgba(201,162,39,.45)' },
];

export default function BenefitsGrid({ label, heading, items }) {
  if (!items?.length) return null;

  return (
    // position:sticky+z-index - חלק מסדרת ה"ערימה" העקבית של כל סקשני דף הנחיתה (ראו
    // הסבר ב-HeroSection.jsx).
    <section id="benefits" style={{ position: 'sticky', top: 0, zIndex: 3, background: 'var(--color-section-cool)', padding: 'clamp(64px,9vw,110px) 28px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
          <MonoLabel color="var(--color-gold)">{label}</MonoLabel>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(34px,5vw,52px)', lineHeight: 1.1, margin: 0, color: 'var(--color-navy)', letterSpacing: '-1px' }}>
            {heading}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {items.map((item, index) => {
            const badge = BADGE_STYLES[index % BADGE_STYLES.length];
            return (
              <div key={index} style={{ position: 'relative', background: 'var(--color-surface)', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(27,35,48,.08)' }}>
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
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '23px', margin: '8px 0 10px', color: 'var(--color-navy)' }}>{item.title}</h3>
                <p style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: 0 }}>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
