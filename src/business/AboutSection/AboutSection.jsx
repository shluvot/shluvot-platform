import MonoLabel from '../../dummies/MonoLabel/MonoLabel';
import AboutIllustration from './illustration';

export default function AboutSection({ label, heading, body }) {
  const paragraphs = (body ?? '').split('\n').filter(Boolean);

  return (
    <section id="about" style={{ background: '#F6EFE3', padding: 'clamp(64px,9vw,110px) 28px' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(36px,6vw,72px)',
          alignItems: 'center',
        }}
      >
        <div>
          <MonoLabel color="#D2613F">{label}</MonoLabel>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(34px,5vw,52px)', lineHeight: 1.08, margin: '0 0 22px', color: '#2E1F47', letterSpacing: '-1px', whiteSpace: 'pre-line' }}>
            {heading}
          </h2>
          {paragraphs.map((paragraph, i) => (
            <p key={i} style={{ fontSize: '18px', lineHeight: 1.75, color: '#46403a', margin: i === paragraphs.length - 1 ? 0 : '0 0 18px' }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div style={{ position: 'relative', justifySelf: 'center' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '22px',
              right: '-22px',
              width: '100%',
              height: '100%',
              background: '#E9A93C',
              borderRadius: '18px',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: 'clamp(280px,40vw,420px)',
              height: 'clamp(280px,40vw,420px)',
              borderRadius: '18px',
              overflow: 'hidden',
              background: '#E7DFF1',
              boxShadow: '0 24px 50px rgba(46,31,71,.25)',
            }}
          >
            <AboutIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
