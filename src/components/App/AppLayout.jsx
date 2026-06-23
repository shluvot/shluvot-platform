import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../dummies/Footer/Footer';

const LINKS = [
  { to: '/#about', label: 'אודות' },
  { to: '/#benefits', label: 'יתרונות' },
  { to: '/updates', label: 'עדכונים' },
  { to: '/#contact', label: 'צרו קשר' },
];

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--space-3)',
          padding: 'var(--space-2) var(--space-4)',
          position: 'relative',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'var(--text-lg)', color: 'var(--color-purple)' }}>
            שלובות
          </span>
        </Link>

        <nav className="desktop-nav" style={{ gap: 'var(--space-3)' }}>
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 500 }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link
            to="/registration"
            style={{
              background: 'var(--color-terracotta)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 'var(--text-sm)',
              padding: '0.55rem 1.4rem',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            הצטרפו
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="תפריט"
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--color-purple)',
              lineHeight: 1,
            }}
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div
            style={{
              position: 'absolute',
              insetInlineEnd: 'var(--space-4)',
              top: '100%',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              padding: 'var(--space-2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              zIndex: 10,
            }}
          >
            {LINKS.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
