import TextField from '../../dummies/TextField/TextField';
import Button from '../../dummies/Button/Button';
import Card from '../../dummies/Card/Card';

// עריכת רשימת אובייקטים קטנים (stats/timeline/testimonials/value_props) - אותה תבנית בכל ארבעתם.
export default function RepeatableListEditor({ items, fields, onChange, addLabel = 'הוספה' }) {
  const updateItem = (index, key, value) => {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    onChange(next);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    const blank = Object.fromEntries(fields.map((field) => [field.key, '']));
    onChange([...items, blank]);
  };

  return (
    <div>
      {items.map((item, index) => (
        <Card key={index}>
          <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'start' }}>
            <div style={{ flex: 1 }}>
              {fields.map((field) => (
                <TextField
                  key={field.key}
                  label={field.label}
                  name={field.key}
                  value={item[field.key] ?? ''}
                  onChange={(value) => updateItem(index, field.key, value)}
                />
              ))}
            </div>
            <Button variant="danger" onClick={() => removeItem(index)}>
              הסרה
            </Button>
          </div>
        </Card>
      ))}
      <Button variant="secondary" onClick={addItem}>
        {addLabel}
      </Button>
    </div>
  );
}
