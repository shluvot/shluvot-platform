const LABELS = {
  pending: 'ממתין',
  active: 'פעיל',
  cancelled: 'מבוטל',
  paid: 'שולם',
  failed: 'נכשל',
  overdue: 'בפיגור',
};

const STYLES = {
  pending: { bg: 'var(--color-gold)', color: 'var(--color-purple)' },
  active: { bg: '#4CAF82', color: '#fff' },
  cancelled: { bg: '#9b9499', color: '#fff' },
  paid: { bg: '#4CAF82', color: '#fff' },
  failed: { bg: '#E0554F', color: '#fff' },
  overdue: { bg: '#E0554F', color: '#fff' },
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] ?? { bg: '#9b9499', color: '#fff' };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.3rem 0.9rem',
        borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--text-sm)',
        fontWeight: 700,
        color: style.color,
        background: style.bg,
      }}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
