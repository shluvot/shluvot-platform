export default function Select({ label, name, value, onChange, options, placeholder }) {
  return (
    <label style={{ display: 'block', marginBottom: 'var(--space-3)' }}>
      {label && (
        <span style={{ display: 'block', marginBottom: '0.4rem', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-navy)' }}>
          {label}
        </span>
      )}
      <select
        name={name}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.7rem 1rem',
          borderRadius: '10px',
          border: '1.5px solid var(--color-border)',
          fontSize: 'var(--text-base)',
          fontFamily: 'inherit',
          background: '#fff',
          color: 'var(--color-text)',
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
