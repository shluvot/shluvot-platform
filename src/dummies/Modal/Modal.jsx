export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(27,47,82,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-3)',
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: '18px',
          padding: 'var(--space-4)',
          minWidth: '20rem',
          maxWidth: '32rem',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(27,47,82,.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3
            style={{
              marginTop: 0,
              marginBottom: 'var(--space-3)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              color: 'var(--color-navy)',
            }}
          >
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
}
