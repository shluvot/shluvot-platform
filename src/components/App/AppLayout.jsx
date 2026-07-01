import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Footer from '../../dummies/Footer/Footer';

// אותו האדר בכל הדפים — sticky, semi-transparent עם blur
const NAV_LINKS = [
  { to: '/',         label: 'בית' },
  { to: '/updates',  label: 'עדכונים' },
  { to: '/#contact', label: 'צרו קשר' },
];

const NAV_BTN = {
  display: 'inline-block', background: 'var(--color-gold)', color: '#fff',
  textDecoration: 'none', fontWeight: 800, fontSize: '15px',
  padding: '10px 22px', borderRadius: '999px',
  boxShadow: '0 6px 18px rgba(201,162,39,.4)', whiteSpace: 'nowrap',
};

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  return (
    <div>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: isLanding ? 'rgba(240,238,248,.95)' : 'var(--color-surface)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isLanding ? 'rgba(211,200,238,.5)' : 'var(--color-border)'}`,
      }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', letterSpacing: '-.5px', color: 'var(--color-navy)' }}>
              שלובות
            </span>
          </Link>

          <nav className="desktop-nav" style={{ gap: '24px' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{ color: 'var(--color-navy)', textDecoration: 'none', fontWeight: 600, fontSize: '15px', opacity: 0.75, whiteSpace: 'nowrap' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Link to="/registration" style={NAV_BTN} className="desktop-nav">
              הצטרפו לאיגוד
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label="תפריט"
              className="mobile-menu-btn"
              style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-navy)', lineHeight: 1 }}
            >
              ☰
            </button>
          </div>

          {isMenuOpen && (
            <div style={{
              position: 'absolute', insetInlineEnd: 'var(--space-4)', top: '100%',
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              padding: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: '0.6rem', zIndex: 10,
            }}>
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--color-navy)', textDecoration: 'none', fontWeight: 600 }}>
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
