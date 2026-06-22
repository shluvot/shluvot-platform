import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PageHeader from '../../../dummies/PageHeader/PageHeader';
import RegistrationWizard from '../../../business/RegistrationWizard/RegistrationWizard';
import { changeField, goNext, goBack, submitRegistration } from './actions/registrationActions';

export default function Registration() {
  const dispatch = useDispatch();
  const { step, values, errors, status, paymentReference } = useSelector((state) => state.registration);

  if (status === 'submitted' && paymentReference) {
    return <Navigate to={`/payment/return?ref=${paymentReference}`} replace />;
  }

  return (
    <div className="page" style={{ maxWidth: '32rem' }}>
      <PageHeader title="הרשמה לחברות באיגוד" subtitle={`שלב ${step + 1} מ-3`} />
      <RegistrationWizard
        step={step}
        values={values}
        errors={errors}
        status={status}
        onFieldChange={(field, value) => dispatch(changeField(field, value))}
        onSelectCycle={(cycle) => dispatch(changeField('billingCycle', cycle))}
        onNext={() => dispatch(goNext())}
        onBack={() => dispatch(goBack())}
        onSubmit={() => dispatch(submitRegistration())}
      />
      {status === 'error' && <p style={{ color: '#a13d3d' }}>אירעה שגיאה. נסו שוב.</p>}
    </div>
  );
}
