import TextField from '../../dummies/TextField/TextField';
import Button from '../../dummies/Button/Button';
import MembershipPlanSelector from '../MembershipPlanSelector/MembershipPlanSelector';

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
  if (step === 0) {
    return (
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
    );
  }

  if (step === 1) {
    return (
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
    );
  }

  return (
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
  );
}
