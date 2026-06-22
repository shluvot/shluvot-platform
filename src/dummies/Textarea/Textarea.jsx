export default function Textarea({ label, name, value, onChange, rows = 5, required = false }) {
  return (
    <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
      {label && (
        <span style={{ display: 'block', marginBottom: '0.3rem', fontSize: 'var(--text-sm)' }}>
          {label}
          {required ? ' *' : ''}
        </span>
      )}
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        required={required}
        style={{
          width: '100%',
          padding: '0.6rem 0.8rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--color-border)',
          fontSize: 'var(--text-base)',
          fontFamily: 'inherit',
          resize: 'vertical',
        }}
      />
    </label>
  );
}
