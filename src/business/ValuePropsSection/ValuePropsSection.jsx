import Card from '../../dummies/Card/Card';

export default function ValuePropsSection({ items }) {
  if (!items?.length) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))', gap: 'var(--space-3)' }}>
      {items.map((item, index) => (
        <Card key={index}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </Card>
      ))}
    </div>
  );
}
