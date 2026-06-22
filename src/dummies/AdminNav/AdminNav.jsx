import { Link } from 'react-router-dom';

export default function AdminNav() {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
      <Link to="/admin/registrants">נרשמים</Link>
      <Link to="/admin/content">תוכן האתר</Link>
      <Link to="/admin/articles">עדכונים וחדשות</Link>
    </div>
  );
}
