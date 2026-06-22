import { Link } from 'react-router-dom';
import HeartIcon from '../../dummies/HeartIcon/HeartIcon';
import WaveDivider from '../../dummies/WaveDivider/WaveDivider';

export default function HeroSection({ eyebrow, title, subtitle, ctaLabel, heroImageUrl }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--space-4)',
          padding: 'var(--space-5) var(--space-4) var(--space-4)',
          maxWidth: '78rem',
          marginInline: 'auto',
        }}
      >
        <div style={{ flex: '1 1 24rem' }}>
          {eyebrow && (
            <p style={{ color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.2rem' }}>{eyebrow}</p>
          )}
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: 0, marginBottom: 'var(--space-2)' }}>{title}</h1>
          {subtitle && (
            <p style={{ color: 'var(--color-text)', fontSize: 'var(--text-lg)', maxWidth: '32rem' }}>{subtitle}</p>
          )}
          {ctaLabel && (
            <Link
              to="/registration"
              style={{
                display: 'inline-block',
                marginTop: 'var(--space-2)',
                background: 'var(--color-pink)',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                padding: '0.85rem 2rem',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              {ctaLabel}
            </Link>
          )}
        </div>

        <div
          style={{
            flex: '1 1 20rem',
            minHeight: '18rem',
            borderRadius: '1.5rem',
            backgroundImage: heroImageUrl
              ? `url(${heroImageUrl})`
              : 'linear-gradient(135deg, var(--color-blue) 0%, var(--color-pink) 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div style={{ position: 'absolute', insetInlineEnd: '2rem', top: '1.5rem' }}>
        <HeartIcon size={32} />
      </div>

      <WaveDivider />
    </div>
  );
}
