export default function TextField({ label, name, value, onChange, type = 'text', error, required = false }) {
  return (
    <label style={{ display: 'block', marginBottom: 'var(--space-3)' }}>
      <span style={{ display: 'block', marginBottom: '0.4rem', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-navy)' }}>
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{
          width: '100%',
          padding: '0.7rem 1rem',
          borderRadius: '10px',
          border: `1.5px solid ${error ? '#E0554F' : 'var(--color-border)'}`,
          fontSize: 'var(--text-base)',
          fontFamily: 'inherit',
          background: '#fff',
          color: 'var(--color-text)',
        }}
      />
      {error && <span style={{ color: '#E0554F', fontSize: 'var(--text-sm)', fontWeight: 600 }}>{error}</span>}
    </label>
  );
}
