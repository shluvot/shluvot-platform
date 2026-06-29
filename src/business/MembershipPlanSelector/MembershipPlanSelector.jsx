const PLANS = [
  { id: 'annual', label: 'שנתי', billingCycle: 'annual' },
  { id: 'monthly', label: 'חודשי', billingCycle: 'monthly' },
];

export default function MembershipPlanSelector({ billingCycle, onSelectCycle }) {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: '0 0 var(--space-3)' }}>
      <legend style={{ marginBottom: '0.6rem', fontWeight: 700, color: 'var(--color-navy)' }}>מחזור תשלום</legend>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {PLANS.map((plan) => {
          const isSelected = billingCycle === plan.billingCycle;
          return (
            <label
              key={plan.id}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: isSelected ? 'rgba(201,162,39,.1)' : 'var(--color-surface)',
                border: `2px solid ${isSelected ? 'var(--color-gold)' : 'var(--color-border)'}`,
                borderRadius: '14px',
                padding: '0.9rem 1rem',
                cursor: 'pointer',
                fontWeight: 700,
                color: isSelected ? 'var(--color-gold)' : 'var(--color-text)',
              }}
            >
              <input
                type="radio"
                name="billingCycle"
                value={plan.billingCycle}
                checked={isSelected}
                onChange={() => onSelectCycle(plan.billingCycle)}
                style={{ accentColor: 'var(--color-gold)' }}
              />
              {plan.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
