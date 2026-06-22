export default function TestimonialList({ items }) {
  if (!items?.length) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            border: '2px solid var(--color-blue)',
            borderRadius: '1.25rem',
            padding: 'var(--space-4)',
            textAlign: 'center',
            maxWidth: '40rem',
            marginInline: 'auto',
          }}
        >
          <div style={{ color: 'var(--color-pink)', fontSize: '2.5rem', lineHeight: 0.5, fontFamily: 'Georgia, serif' }}>
            &ldquo;
          </div>
          <p style={{ fontSize: 'var(--text-lg)', margin: '0.5rem 0' }}>{item.quote}</p>
          {item.authorName && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              — {item.authorName}
              {item.authorRole ? `, ${item.authorRole}` : ''}
            </p>
          )}
          <div style={{ color: 'var(--color-pink)', fontSize: '2.5rem', lineHeight: 0.5, fontFamily: 'Georgia, serif' }}>
            &rdquo;
          </div>
        </div>
      ))}
    </div>
  );
}
