import { Link } from 'react-router-dom';
import MonoLabel from '../../dummies/MonoLabel/MonoLabel';
import IllustrationCarousel from '../IllustrationCarousel/IllustrationCarousel';
import { HERO_FRAMES, HERO_CAPTIONS } from './illustrations';

const BADGE_COLORS = ['#E86A4E', '#E9A93C', '#9B7BD4'];

export default function HeroSection({ eyebrow, title, subtitle, ctaLabel, secondaryCtaLabel, badges }) {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-purple)',
        color: '#fff',
        paddingBlock: 'var(--space-6) var(--space-5)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          insetInlineStart: 0,
          top: 0,
          width: '14rem',
          height: '14rem',
          background: 'var(--color-mustard)',
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          opacity: 0.9,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          insetInlineEnd: '-3rem',
          bottom: '-3rem',
          width: '16rem',
          height: '16rem',
          background: 'var(--color-coral)',
          borderRadius: '3rem',
          transform: 'rotate(18deg)',
          opacity: 0.85,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          insetInlineEnd: '18%',
          top: '12%',
          width: '7rem',
          height: '7rem',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.25)',
        }}
      />

      <div className="page two-col" style={{ position: 'relative' }}>
        <div style={{ order: 2 }}>
          <MonoLabel variant="dash" color="var(--color-mustard)">
            {eyebrow}
          </MonoLabel>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6.25rem)',
              color: '#fff',
              margin: '0 0 var(--space-3)',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'var(--text-lg)', maxWidth: '32rem', marginBottom: 'var(--space-3)' }}>
              {subtitle}
            </p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: 'var(--space-4)' }}>
            {ctaLabel && (
              <Link
                to="/registration"
                style={{
                  display: 'inline-block',
                  background: 'var(--color-terracotta)',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  padding: '0.9rem 2.1rem',
                  borderRadius: 'var(--radius-pill)',
                }}
              >
                {ctaLabel}
              </Link>
            )}
            {secondaryCtaLabel && (
              <a
                href="#about"
                style={{
                  display: 'inline-block',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  padding: '0.9rem 2.1rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                }}
              >
                {secondaryCtaLabel}
              </a>
            )}
          </div>
          {badges?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {badges.map((badge, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.45rem 1rem',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <span
                    style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      borderRadius: '50%',
                      background: BADGE_COLORS[i % BADGE_COLORS.length],
                    }}
                  />
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ order: 1 }}>
          <IllustrationCarousel frames={HERO_FRAMES} captions={HERO_CAPTIONS} />
        </div>
      </div>
    </section>
  );
}
