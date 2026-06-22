const PLANS = [
  { id: 'annual', label: 'שנתי', billingCycle: 'annual' },
  { id: 'monthly', label: 'חודשי', billingCycle: 'monthly' },
];

export default function MembershipPlanSelector({ billingCycle, onSelectCycle }) {
  return (
    <fieldset style={{ border: 'none', padding: 0, marginBottom: 'var(--space-2)' }}>
      <legend style={{ marginBottom: '0.4rem', fontSize: 'var(--text-sm)' }}>מחזור תשלום</legend>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {PLANS.map((plan) => (
          <label
            key={plan.id}
            style={{
              border: `1px solid ${billingCycle === plan.billingCycle ? 'var(--color-brand)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius)',
              padding: '0.6rem 1rem',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name="billingCycle"
              value={plan.billingCycle}
              checked={billingCycle === plan.billingCycle}
              onChange={() => onSelectCycle(plan.billingCycle)}
              style={{ marginInlineEnd: '0.4rem' }}
            />
            {plan.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
