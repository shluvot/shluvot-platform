import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../dummies/PageHeader/PageHeader';
import Spinner from '../../../dummies/Spinner/Spinner';
import Button from '../../../dummies/Button/Button';
import RegistrantFilters from '../../../business/RegistrantFilters/RegistrantFilters';
import RegistrantTable from '../../../business/RegistrantTable/RegistrantTable';
import ManualStatusOverrideModal from '../../../business/ManualStatusOverrideModal/ManualStatusOverrideModal';
import { rowsToCsv } from '../../../business/RegistrantTable/actions/formatting';
import { loadRegistrants, changeFilters, overridePayment } from './actions/registrantListActions';
import { logout } from '../Auth/actions/authActions';

export default function RegistrantList() {
  const dispatch = useDispatch();
  const { rows, filters, status, error } = useSelector((state) => state.adminRegistrants);
  const [overrideTarget, setOverrideTarget] = useState(null);

  useEffect(() => {
    dispatch(loadRegistrants());
  }, [dispatch]);

  const handleExportCsv = () => {
    const blob = new Blob([rowsToCsv(rows)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'registrants.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">
      <PageHeader title="ניהול נרשמים" />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
        <Button variant="secondary" onClick={handleExportCsv}>
          ייצוא ל-CSV
        </Button>
        <Button variant="secondary" onClick={() => dispatch(logout())}>
          התנתקות
        </Button>
      </div>

      <RegistrantFilters filters={filters} onChange={(patch) => dispatch(changeFilters(patch))} />

      {status === 'loading' && <Spinner />}
      {status === 'error' && <p style={{ color: '#a13d3d' }}>שגיאה בטעינת הנרשמים: {error}</p>}
      {status !== 'loading' && status !== 'error' && (
        <RegistrantTable
          rows={rows}
          onOverridePayment={(registrant, payment) => setOverrideTarget({ registrant, payment })}
        />
      )}

      <ManualStatusOverrideModal
        isOpen={Boolean(overrideTarget)}
        registrant={overrideTarget?.registrant}
        payment={overrideTarget?.payment}
        onCancel={() => setOverrideTarget(null)}
        onConfirm={async ({ paymentId, status: newStatus, reason }) => {
          await dispatch(overridePayment(overrideTarget.registrant, { paymentId, status: newStatus, reason }));
          setOverrideTarget(null);
        }}
      />
    </div>
  );
}
