import { Link } from 'react-router-dom';
import IllustrationCarousel from '../IllustrationCarousel/IllustrationCarousel';
import { HERO_FRAMES, HERO_CAPTIONS } from './illustrations';

const NAV_LINKS = [
  { href: '#about', label: 'אודות' },
  { href: '#benefits', label: 'יתרונות' },
  { href: '#contact', label: 'צרו קשר' },
];

const BADGE_DOT_COLORS = ['#E9A93C', '#E86A4E', '#F6EFE3'];

export default function HeroSection({ eyebrow, title, subtitle, ctaLabel, secondaryCtaLabel, badges }) {
  return (
    <section style={{ position: 'relative', background: '#2E1F47', color: '#F6EFE3', overflow: 'hidden', padding: '0 0 64px' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'clamp(160px,26vw,340px)',
          height: 'clamp(150px,24vw,300px)',
          background: '#E9A93C',
          clipPath: 'polygon(0 0,100% 0,0 100%)',
          opacity: 0.92,
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
          background: '#E86A4E',
          transform: 'rotate(-9deg)',
          borderRadius: '14px',
          opacity: 0.9,
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
          border: '2px solid rgba(246,239,227,.35)',
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
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', letterSpacing: '-.5px', color: '#F6EFE3' }}>
          שלובות
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '26px', rowGap: '10px', justifyContent: 'flex-end' }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} style={{ color: '#F6EFE3', textDecoration: 'none', fontWeight: 600, fontSize: '15px', opacity: 0.92, whiteSpace: 'nowrap' }}>
              {link.label}
            </a>
          ))}
          <Link
            to="/registration"
            style={{
              background: '#E86A4E',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '15px',
              padding: '9px 20px',
              borderRadius: '999px',
              boxShadow: '0 6px 18px rgba(232,106,78,.35)',
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
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                letterSpacing: '2px',
                color: 'rgba(246,239,227,.75)',
                marginBottom: '12px',
              }}
            >
              — {eyebrow} —
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(56px,9vw,132px)',
                lineHeight: 0.86,
                letterSpacing: '-2px',
                margin: 0,
                color: '#F6EFE3',
              }}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                style={{
                  maxWidth: '540px',
                  margin: '26px 0 0',
                  fontSize: 'clamp(17px,1.6vw,20px)',
                  lineHeight: 1.65,
                  color: 'rgba(246,239,227,.92)',
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
                    background: '#D2613F',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 800,
                    fontSize: '17px',
                    padding: '15px 34px',
                    borderRadius: '12px',
                    boxShadow: '0 14px 30px rgba(210,97,63,.45)',
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
                    color: '#F6EFE3',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '17px',
                    padding: '15px 30px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(246,239,227,.5)',
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
                      background: 'rgba(246,239,227,.08)',
                      border: '1px solid rgba(246,239,227,.28)',
                      color: '#F6EFE3',
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
