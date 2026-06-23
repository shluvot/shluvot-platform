import { Link } from 'react-router-dom';
import IllustrationCarousel from '../IllustrationCarousel/IllustrationCarousel';
import { HERO_FRAMES, HERO_CAPTIONS } from './illustrations';

const NAV_LINKS = [
  { href: '#about', label: 'אודות' },
  { href: '#benefits', label: 'יתרונות' },
  { to: '/updates', label: 'עדכונים' },
  { href: '#contact', label: 'צרו קשר' },
];

const BADGE_DOT_COLORS = ['var(--color-gold)', 'var(--color-terracotta)', 'var(--color-sage)'];

export default function HeroSection({ eyebrow, title, subtitle, ctaLabel, secondaryCtaLabel, badges }) {
  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--color-purple-dark)',
        color: 'var(--color-cream-text)',
        overflow: 'hidden',
        padding: '0 0 64px',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'clamp(160px,26vw,340px)',
          height: 'clamp(150px,24vw,300px)',
          background: 'var(--color-gold)',
          clipPath: 'polygon(0 0,100% 0,0 100%)',
          opacity: 0.18,
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-60px',
          right: '-50px',
          width: 'clamp(220px,30vw,420px)',
          height: 'clamp(140px,18vw,240px)',
          background: 'var(--color-terracotta)',
          transform: 'rotate(-9deg)',
          borderRadius: '14px',
          opacity: 0.22,
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '38%',
          right: '8%',
          width: '120px',
          height: '120px',
          border: '2px solid rgba(247,241,232,.15)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      <header
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '26px 28px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', letterSpacing: '-.5px', color: 'var(--color-cream-text)' }}>
          שלובות
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '26px', rowGap: '10px', justifyContent: 'flex-end' }}>
          {NAV_LINKS.map((link) => {
            const linkStyle = { color: 'var(--color-cream-text)', textDecoration: 'none', fontWeight: 600, fontSize: '15px', opacity: 0.85, whiteSpace: 'nowrap' };
            return link.to ? (
              <Link key={link.to} to={link.to} style={linkStyle}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} style={linkStyle}>
                {link.label}
              </a>
            );
          })}
          <Link
            to="/registration"
            style={{
              background: 'var(--color-terracotta)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '15px',
              padding: '9px 20px',
              borderRadius: '999px',
              boxShadow: '0 6px 18px rgba(196,78,46,.4)',
            }}
          >
            הצטרפו
          </Link>
        </nav>
      </header>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1180px', margin: '0 auto', padding: '38px 28px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(32px,5vw,72px)' }}>
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IllustrationCarousel frames={HERO_FRAMES} captions={HERO_CAPTIONS} />
          </div>

          <div style={{ flex: '1 1 360px', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'right' }}>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(56px,9vw,132px)',
                lineHeight: 0.86,
                letterSpacing: '-2px',
                margin: 0,
                color: 'var(--color-cream-text)',
              }}
            >
              {title}
            </h1>

            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '16px',
                letterSpacing: '2px',
                color: 'var(--color-gold)',
                marginTop: '4px',
                paddingRight: '5px',
              }}
            >
              {eyebrow}
            </div>

            {subtitle && (
              <p
                style={{
                  maxWidth: '540px',
                  margin: '26px 0 0',
                  fontSize: 'clamp(17px,1.6vw,20px)',
                  lineHeight: 1.65,
                  color: 'rgba(247,241,232,.75)',
                  textAlign: 'right',
                }}
              >
                {subtitle}
              </p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'flex-start', marginTop: '30px' }}>
              {ctaLabel && (
                <Link
                  to="/registration"
                  style={{
                    background: 'var(--color-terracotta)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 800,
                    fontSize: '17px',
                    padding: '15px 34px',
                    borderRadius: '12px',
                    boxShadow: '0 14px 30px rgba(196,78,46,.45)',
                  }}
                >
                  {ctaLabel}
                </Link>
              )}
              {secondaryCtaLabel && (
                <a
                  href="#about"
                  style={{
                    background: 'transparent',
                    color: 'var(--color-cream-text)',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '17px',
                    padding: '15px 30px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(247,241,232,.35)',
                  }}
                >
                  {secondaryCtaLabel}
                </a>
              )}
            </div>

            {badges?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-start', marginTop: '34px' }}>
                {badges.map((badge, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(247,241,232,.1)',
                      border: '1px solid rgba(247,241,232,.22)',
                      color: 'var(--color-cream-text)',
                      fontWeight: 600,
                      fontSize: '14px',
                      padding: '9px 18px',
                      borderRadius: '999px',
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: BADGE_DOT_COLORS[i % BADGE_DOT_COLORS.length],
                      }}
                    />
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
