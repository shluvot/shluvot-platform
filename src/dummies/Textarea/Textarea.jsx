export default function Textarea({ label, name, value, onChange, rows = 5, required = false }) {
  return (
    <label style={{ display: 'block', marginBottom: 'var(--space-3)' }}>
      {label && (
        <span style={{ display: 'block', marginBottom: '0.4rem', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-navy)' }}>
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
          padding: '0.7rem 1rem',
          borderRadius: '10px',
          border: '1.5px solid var(--color-border)',
          fontSize: 'var(--text-base)',
          fontFamily: 'inherit',
          background: '#fff',
          color: 'var(--color-text)',
          resize: 'vertical',
        }}
      />
    </label>
  );
}
