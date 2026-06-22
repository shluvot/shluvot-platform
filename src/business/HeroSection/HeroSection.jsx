import { Link } from 'react-router-dom';
import Button from '../../dummies/Button/Button';

export default function HeroSection({ title, subtitle, ctaLabel, heroImageUrl }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--space-5) var(--space-3)',
        backgroundImage: heroImageUrl ? `linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url(${heroImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>{title}</h1>
      {subtitle && <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)' }}>{subtitle}</p>}
      {ctaLabel && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          <Link to="/registration">
            <Button>{ctaLabel}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
