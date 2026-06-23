import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../dummies/PageHeader/PageHeader';
import AdminNav from '../../../dummies/AdminNav/AdminNav';
import Spinner from '../../../dummies/Spinner/Spinner';
import Button from '../../../dummies/Button/Button';
import ConfirmDialog from '../../../dummies/ConfirmDialog/ConfirmDialog';
import RegistrantFilters from '../../../business/RegistrantFilters/RegistrantFilters';
import RegistrantTable from '../../../business/RegistrantTable/RegistrantTable';
import ManualStatusOverrideModal from '../../../business/ManualStatusOverrideModal/ManualStatusOverrideModal';
import RegistrantEditModal from '../../../business/RegistrantEditModal/RegistrantEditModal';
import { rowsToCsv } from '../../../business/RegistrantTable/actions/formatting';
import { loadRegistrants, changeFilters, overridePayment, updateRegistrantDetails, deleteRegistrant } from './actions/registrantListActions';
import { logout } from '../Auth/actions/authActions';

export default function RegistrantList() {
  const dispatch = useDispatch();
  const { rows, filters, status, error } = useSelector((state) => state.adminRegistrants);
  const [overrideTarget, setOverrideTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteRegistrant(deleteTarget.id));
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="page">
      <PageHeader eyebrow="אדמין" title="ניהול נרשמים" />
      <AdminNav />
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
      {status === 'error' && <p style={{ color: '#E0554F', fontWeight: 600 }}>שגיאה בטעינת הנרשמים: {error}</p>}
      {status !== 'loading' && status !== 'error' && (
        <RegistrantTable
          rows={rows}
          onOverridePayment={(registrant, payment) => setOverrideTarget({ registrant, payment })}
          onEdit={(registrant) => setEditTarget(registrant)}
          onDelete={(registrant) => setDeleteTarget(registrant)}
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

      <RegistrantEditModal
        isOpen={Boolean(editTarget)}
        registrant={editTarget}
        onCancel={() => setEditTarget(null)}
        onConfirm={async (patch) => {
          await dispatch(updateRegistrantDetails(editTarget.id, patch));
          setEditTarget(null);
        }}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="מחיקת נרשם"
        message={`למחוק את ${deleteTarget?.full_name ?? ''}? הפעולה לא הפיכה ותמחק גם את היסטוריית התשלומים שלה.`}
        confirmLabel={isDeleting ? 'מוחק...' : 'מחיקה'}
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
