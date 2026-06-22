import TextField from '../../dummies/TextField/TextField';
import Select from '../../dummies/Select/Select';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'ממתין' },
  { value: 'active', label: 'פעיל' },
  { value: 'cancelled', label: 'מבוטל' },
];

export default function RegistrantFilters({ filters, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'end', marginBottom: 'var(--space-3)' }}>
      <div style={{ flex: 1 }}>
        <TextField
          label="חיפוש"
          name="search"
          value={filters.search}
          onChange={(value) => onChange({ search: value })}
        />
      </div>
      <div style={{ width: '12rem' }}>
        <Select
          label="סטטוס"
          name="status"
          value={filters.status ?? ''}
          onChange={(value) => onChange({ status: value || null })}
          options={STATUS_OPTIONS}
          placeholder="הכל"
        />
      </div>
    </div>
  );
}
