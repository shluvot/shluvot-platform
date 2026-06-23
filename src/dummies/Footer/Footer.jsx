import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/#about', label: 'אודות' },
  { to: '/#benefits', label: 'יתרונות' },
  { to: '/updates', label: 'עדכונים' },
  { to: '/#contact', label: 'צרו קשר' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-footer-purple)', color: 'var(--color-cream-text)', padding: '48px 28px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', letterSpacing: '-.5px' }}>שלובות</div>
          <div style={{ fontSize: '14px', color: 'rgba(247,241,232,.6)', marginTop: '4px' }}>איגוד מטפלות המשפחתונים</div>
        </div>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} style={{ color: 'rgba(247,241,232,.85)', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div style={{ maxWidth: '1100px', margin: '28px auto 0', paddingTop: '20px', borderTop: '1px solid rgba(247,241,232,.15)', fontSize: '13px', color: 'rgba(247,241,232,.55)' }}>
        © 2026 שלובות — איגוד מטפלות המשפחתונים. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
