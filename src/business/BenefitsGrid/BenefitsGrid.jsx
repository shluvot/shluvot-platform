import MonoLabel from '../../dummies/MonoLabel/MonoLabel';

const BADGE_STYLES = [
  { bg: '#E86A4E', color: '#fff', shadow: 'rgba(232,106,78,.4)' },
  { bg: '#E9A93C', color: '#231a0a', shadow: 'rgba(233,169,60,.4)' },
  { bg: '#D2613F', color: '#fff', shadow: 'rgba(210,97,63,.4)' },
  { bg: '#2E1F47', color: '#F6EFE3', shadow: 'rgba(46,31,71,.35)' },
  { bg: '#E86A4E', color: '#fff', shadow: 'rgba(232,106,78,.4)' },
  { bg: '#E9A93C', color: '#231a0a', shadow: 'rgba(233,169,60,.4)' },
];

export default function BenefitsGrid({ label, heading, items }) {
  if (!items?.length) return null;

  return (
    <section id="benefits" style={{ background: '#ECE5D6', padding: 'clamp(64px,9vw,110px) 28px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
          <MonoLabel color="#D2613F">{label}</MonoLabel>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(34px,5vw,52px)', lineHeight: 1.1, margin: 0, color: '#2E1F47', letterSpacing: '-1px' }}>
            {heading}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {items.map((item, index) => {
            const badge = BADGE_STYLES[index % BADGE_STYLES.length];
            return (
              <div key={index} style={{ position: 'relative', background: '#FFFDF8', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(46,31,71,.08)' }}>
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
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '23px', margin: '8px 0 10px', color: '#2E1F47' }}>{item.title}</h3>
                <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#56504a', margin: 0 }}>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
