import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../../../dummies/PageHeader/PageHeader';
import Card from '../../../dummies/Card/Card';
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
    return (
      <div className="page" style={{ maxWidth: '32rem', textAlign: 'center', paddingBlock: 'var(--space-4) var(--space-6)' }}>
        <NedarimRedirectPanel error="חסר מזהה תשלום" />
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: '32rem', textAlign: 'center', paddingBlock: 'var(--space-4) var(--space-6)' }}>
      <PageHeader title="תודה על ההרשמה!" />
      {error && (
        <Card>
          <p style={{ color: '#E0554F', fontWeight: 600, margin: 0 }}>{error}</p>
        </Card>
      )}
      {!error && !payment && <NedarimRedirectPanel isLoading />}
      {payment && (
        <Card>
          <div
            style={{
              width: '64px',
              height: '64px',
              background: 'var(--color-yellow-pop)',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: 'var(--color-purple)',
            }}
          >
            ✓
          </div>
          <p style={{ margin: 0, fontSize: 'var(--text-lg)' }}>
            סטטוס תשלום: <StatusBadge status={payment.status} />
          </p>
        </Card>
      )}
    </div>
  );
}
