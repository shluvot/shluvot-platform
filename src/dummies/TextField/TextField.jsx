export default function TextField({ label, name, value, onChange, type = 'text', error, required = false }) {
  return (
    <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
      <span style={{ display: 'block', marginBottom: '0.3rem', fontSize: 'var(--text-sm)' }}>
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
          padding: '0.6rem 0.8rem',
          borderRadius: 'var(--radius)',
          border: `1px solid ${error ? '#a13d3d' : 'var(--color-border)'}`,
          fontSize: 'var(--text-base)',
        }}
      />
      {error && <span style={{ color: '#a13d3d', fontSize: 'var(--text-sm)' }}>{error}</span>}
    </label>
  );
}
