import MonoLabel from '../../dummies/MonoLabel/MonoLabel';

export default function UpdatesHero({ eyebrow, title, subtitle }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-lavender-light)', paddingBlock: 'clamp(56px,8vw,90px)' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-40px',
          insetInlineEnd: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'var(--color-coral-pop)',
          opacity: 0.12,
        }}
      />

      <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', paddingInline: '28px' }}>
        <MonoLabel color="#D2613F">{eyebrow}</MonoLabel>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(36px,6vw,58px)',
            letterSpacing: '-1px',
            margin: 0,
            color: 'var(--color-purple)',
          }}
        >
          {title}
        </h1>

        <div style={{ height: '2px', background: 'rgba(46,31,71,.2)', margin: '22px 0 18px' }} />

        {subtitle && (
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', maxWidth: '36rem', margin: 0 }}>{subtitle}</p>
        )}
      </div>
    </section>
  );
}
