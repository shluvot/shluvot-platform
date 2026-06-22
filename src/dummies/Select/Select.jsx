export default function Select({ label, name, value, onChange, options, placeholder }) {
  return (
    <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
      {label && <span style={{ display: 'block', marginBottom: '0.3rem', fontSize: 'var(--text-sm)' }}>{label}</span>}
      <select
        name={name}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.6rem 0.8rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--color-border)',
          fontSize: 'var(--text-base)',
          background: '#fff',
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
