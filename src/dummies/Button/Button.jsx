const VARIANT_STYLES = {
  primary: { background: 'var(--color-brand)', color: '#fff', border: 'none' },
  secondary: { background: 'transparent', color: 'var(--color-brand)', border: '1px solid var(--color-brand)' },
  danger: { background: '#a13d3d', color: '#fff', border: 'none' },
};

export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...VARIANT_STYLES[variant],
        padding: '0.6rem 1.4rem',
        borderRadius: 'var(--radius)',
        fontSize: 'var(--text-base)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}
