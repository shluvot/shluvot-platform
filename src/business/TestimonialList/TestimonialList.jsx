import Card from '../../dummies/Card/Card';

export default function TestimonialList({ items }) {
  if (!items?.length) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))', gap: 'var(--space-3)' }}>
      {items.map((item, index) => (
        <Card key={index}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)' }}>&ldquo;{item.quote}&rdquo;</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            — {item.authorName}
            {item.authorRole ? `, ${item.authorRole}` : ''}
          </p>
        </Card>
      ))}
    </div>
  );
}
