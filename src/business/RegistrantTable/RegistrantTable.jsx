import Table from '../../dummies/Table/Table';
import EmptyState from '../../dummies/EmptyState/EmptyState';
import StatusBadge from '../StatusBadge/StatusBadge';
import { formatDate } from './actions/formatting';

const COLUMNS = [
  { key: 'full_name', label: 'שם' },
  { key: 'email', label: 'אימייל' },
  { key: 'phone', label: 'טלפון' },
  { key: 'billing_cycle', label: 'מחזור חיוב' },
  { key: 'status', label: 'סטטוס נרשם' },
  { key: 'payment_status', label: 'סטטוס תשלום אחרון' },
  { key: 'last_payment_date', label: 'תאריך תשלום אחרון' },
  { key: 'actions', label: 'פעולות' },
];

export default function RegistrantTable({ rows, onOverridePayment }) {
  if (!rows || rows.length === 0) {
    return <EmptyState message="אין נרשמים להצגה" />;
  }

  return (
    <Table
      columns={COLUMNS}
      rows={rows}
      getRowKey={(row) => row.id}
      renderCell={(column, row) => {
        const lastPayment = row.payments?.[0];
        switch (column.key) {
          case 'billing_cycle':
            return row.billing_cycle === 'monthly' ? 'חודשי' : 'שנתי';
          case 'status':
            return <StatusBadge status={row.status} />;
          case 'payment_status':
            return lastPayment ? <StatusBadge status={lastPayment.status} /> : '—';
          case 'last_payment_date':
            return formatDate(lastPayment?.paid_at);
          case 'actions':
            return lastPayment ? (
              <button type="button" onClick={() => onOverridePayment(row, lastPayment)}>
                עדכון סטטוס
              </button>
            ) : (
              '—'
            );
          default:
            return row[column.key];
        }
      }}
    />
  );
}
