import MonoLabel from '../../dummies/MonoLabel/MonoLabel';
import AboutIllustration from './illustration';

export default function AboutSection({ label, heading, body }) {
  const paragraphs = (body ?? '').split('\n').filter(Boolean);

  return (
    <section id="about" style={{ background: 'var(--color-bg)', paddingBlock: 'var(--space-6)' }}>
      <div className="page two-col">
        <div>
          <MonoLabel>{label}</MonoLabel>
          <h2 style={{ fontSize: 'var(--text-2xl)', whiteSpace: 'pre-line', marginTop: 0 }}>{heading}</h2>
          {paragraphs.map((paragraph, i) => (
            <p key={i} style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)', marginBottom: '1rem' }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div style={{ position: 'relative', maxWidth: '24rem', marginInline: 'auto' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '22px',
              insetInlineEnd: '-22px',
              width: '100%',
              height: '100%',
              background: 'var(--color-mustard)',
              borderRadius: 'var(--radius)',
            }}
          />
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(34, 28, 23, 0.18)',
            }}
          >
            <AboutIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
