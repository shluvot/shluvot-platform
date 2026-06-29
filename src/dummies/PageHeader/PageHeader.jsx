import MonoLabel from '../MonoLabel/MonoLabel';

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header style={{ marginBlock: 'var(--space-5)', textAlign: 'center' }}>
      {eyebrow && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MonoLabel color="var(--color-gold)">{eyebrow}</MonoLabel>
        </div>
      )}
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: 'clamp(28px, 4vw, 42px)',
          letterSpacing: '-0.5px',
          color: 'var(--color-navy)',
          margin: 0,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)', marginTop: '0.6rem' }}>{subtitle}</p>
      )}
    </header>
  );
}
