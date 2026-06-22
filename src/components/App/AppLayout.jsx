import { Link, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div>
      <nav
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          padding: 'var(--space-2) var(--space-3)',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
        }}
      >
        <Link to="/">בית</Link>
        <Link to="/about">אודות</Link>
        <Link to="/services">שירותים</Link>
        <Link to="/updates">עדכונים</Link>
        <Link to="/contact">יצירת קשר</Link>
        <Link to="/registration">הרשמה</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
