import TextField from '../../dummies/TextField/TextField';
import Button from '../../dummies/Button/Button';
import Card from '../../dummies/Card/Card';
import MembershipPlanSelector from '../MembershipPlanSelector/MembershipPlanSelector';

const STEP_LABELS = ['פרטים אישיים', 'כתובת', 'מסלול חברות'];

function StepProgress({ step }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: 'var(--space-3)' }}>
      {STEP_LABELS.map((label, index) => (
        <div key={label} style={{ flex: 1 }}>
          <div
            style={{
              height: '6px',
              borderRadius: 'var(--radius-pill)',
              background: index <= step ? 'var(--color-gold)' : 'var(--color-border)',
              marginBottom: '0.4rem',
            }}
          />
          <span
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: index === step ? 700 : 500,
              color: index === step ? 'var(--color-navy)' : 'var(--color-text-muted)',
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function RegistrationWizard({
  step,
  values,
  errors,
  status,
  onFieldChange,
  onSelectCycle,
  onNext,
  onBack,
  onSubmit,
}) {
  return (
    <div>
      <StepProgress step={step} />
      <Card>
        {step === 0 && (
          <div>
            <TextField
              label="שם מלא"
              name="fullName"
              value={values.fullName}
              onChange={(value) => onFieldChange('fullName', value)}
              error={errors.fullName}
              required
            />
            <TextField
              label="אימייל"
              name="email"
              type="email"
              value={values.email}
              onChange={(value) => onFieldChange('email', value)}
              error={errors.email}
              required
            />
            <TextField
              label="טלפון"
              name="phone"
              value={values.phone}
              onChange={(value) => onFieldChange('phone', value)}
              error={errors.phone}
              required
            />
            <Button onClick={onNext}>הבא</Button>
          </div>
        )}

        {step === 1 && (
          <div>
            <TextField
              label="כתובת"
              name="address"
              value={values.address}
              onChange={(value) => onFieldChange('address', value)}
              error={errors.address}
              required
            />
            <TextField
              label="עיר"
              name="city"
              value={values.city}
              onChange={(value) => onFieldChange('city', value)}
              error={errors.city}
              required
            />
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button variant="secondary" onClick={onBack}>
                הקודם
              </Button>
              <Button onClick={onNext}>הבא</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <MembershipPlanSelector billingCycle={values.billingCycle} onSelectCycle={onSelectCycle} />
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button variant="secondary" onClick={onBack}>
                הקודם
              </Button>
              <Button onClick={onSubmit} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'שולח...' : 'המשך לתשלום'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
