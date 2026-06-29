const VARIANT_STYLES = {
  primary: {
    background: 'var(--color-gold)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 10px 24px rgba(201,162,39,.35)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-navy)',
    border: '1.5px solid rgba(27,47,82,.3)',
    boxShadow: 'none',
  },
  danger: {
    background: '#E0554F',
    color: '#fff',
    border: 'none',
    boxShadow: '0 10px 24px rgba(224,85,79,.35)',
  },
};

export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...VARIANT_STYLES[variant],
        padding: '0.75rem 1.75rem',
        borderRadius: 'var(--radius-pill)',
        fontWeight: 700,
        fontSize: 'var(--text-base)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}
