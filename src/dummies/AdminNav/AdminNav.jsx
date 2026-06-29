import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/admin/registrants', label: 'נרשמים' },
  { to: '/admin/content', label: 'תוכן האתר' },
  { to: '/admin/articles', label: 'עדכונים וחדשות' },
];

export default function AdminNav() {
  return (
    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          style={({ isActive }) => ({
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 'var(--text-sm)',
            padding: '0.5rem 1.1rem',
            borderRadius: 'var(--radius-pill)',
            color: isActive ? '#fff' : 'var(--color-navy)',
            background: isActive ? 'var(--color-gold)' : 'var(--color-surface)',
            boxShadow: isActive ? '0 8px 18px rgba(201,162,39,.35)' : '0 4px 12px rgba(27,47,82,.06)',
          })}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
