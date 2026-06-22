import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import HeartIcon from '../../dummies/HeartIcon/HeartIcon';

const LINKS = [
  { to: '/about', label: 'אודות' },
  { to: '/services', label: 'שירותים' },
  { to: '/updates', label: 'עדכונים' },
  { to: '/contact', label: 'יצירת קשר' },
];

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className="page-frame" />

      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--space-2) var(--space-4)',
          position: 'relative',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
          <HeartIcon size={24} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'var(--text-lg)', color: 'var(--color-brand)' }}>
            שלובות
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link
            to="/registration"
            style={{
              background: 'var(--color-pink)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 'var(--text-sm)',
              padding: '0.5rem 1.2rem',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            הרשמה
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="תפריט"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--color-brand)',
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
    </div>
  );
}
