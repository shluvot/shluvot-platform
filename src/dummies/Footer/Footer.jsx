const LINKS = [
  { href: '#about', label: 'אודות' },
  { href: '#benefits', label: 'יתרונות' },
  { href: '#contact', label: 'צרו קשר' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-purple-dark)', color: 'rgba(255,255,255,0.75)', paddingBlock: 'var(--space-5)' }}>
      <div className="page" style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'var(--text-lg)', color: '#fff' }}>שלובות</div>
        <p style={{ margin: '0.4rem 0 var(--space-3)' }}>איגוד מטפלות המשפחתונים</p>

        <nav style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
              {link.label}
            </a>
          ))}
        </nav>

        <p style={{ fontSize: 'var(--text-sm)', margin: 0 }}>© 2026 שלובות — איגוד מטפלות המשפחתונים. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
}
