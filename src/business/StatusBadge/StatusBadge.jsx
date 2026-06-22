const LABELS = {
  pending: 'ממתין',
  active: 'פעיל',
  cancelled: 'מבוטל',
  paid: 'שולם',
  failed: 'נכשל',
  overdue: 'בפיגור',
};

const COLORS = {
  pending: '#8a6d00',
  active: '#1f6f43',
  cancelled: '#6b6258',
  paid: '#1f6f43',
  failed: '#a13d3d',
  overdue: '#a13d3d',
};

export default function StatusBadge({ status }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.7rem',
        borderRadius: '1rem',
        fontSize: 'var(--text-sm)',
        color: '#fff',
        background: COLORS[status] ?? '#6b6258',
      }}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
