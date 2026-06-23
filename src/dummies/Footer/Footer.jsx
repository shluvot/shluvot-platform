const LINKS = [
  { href: '#about', label: 'אודות' },
  { href: '#benefits', label: 'יתרונות' },
  { href: '#contact', label: 'צרו קשר' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#1E1336', color: '#F6EFE3', padding: '48px 28px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', letterSpacing: '-.5px' }}>שלובות</div>
          <div style={{ fontSize: '14px', color: 'rgba(246,239,227,.6)', marginTop: '4px' }}>איגוד מטפלות המשפחתונים</div>
        </div>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} style={{ color: 'rgba(246,239,227,.85)', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div style={{ maxWidth: '1100px', margin: '28px auto 0', paddingTop: '20px', borderTop: '1px solid rgba(246,239,227,.15)', fontSize: '13px', color: 'rgba(246,239,227,.55)' }}>
        © 2026 שלובות — איגוד מטפלות המשפחתונים. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
