import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../../../dummies/PageHeader/PageHeader';
import NedarimRedirectPanel from '../../../business/NedarimRedirectPanel/NedarimRedirectPanel';
import StatusBadge from '../../../business/StatusBadge/StatusBadge';
import { fetchPaymentStatus } from './actions/paymentReturnActions';

export default function PaymentReturn() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('ref');
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reference) return;
    fetchPaymentStatus(reference)
      .then(setPayment)
      .catch((err) => setError(err.message));
  }, [reference]);

  if (!reference) {
    return <NedarimRedirectPanel error="חסר מזהה תשלום" />;
  }

  return (
    <div className="page" style={{ maxWidth: '32rem', textAlign: 'center' }}>
      <PageHeader title="תודה על ההרשמה!" />
      {error && <p style={{ color: '#a13d3d' }}>{error}</p>}
      {!error && !payment && <NedarimRedirectPanel isLoading />}
      {payment && (
        <p>
          סטטוס תשלום: <StatusBadge status={payment.status} />
        </p>
      )}
    </div>
  );
}
