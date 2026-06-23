import { useState } from 'react';
import Modal from '../../dummies/Modal/Modal';
import Select from '../../dummies/Select/Select';
import TextField from '../../dummies/TextField/TextField';
import Button from '../../dummies/Button/Button';
import { validateOverride } from './actions/validation';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'ממתין' },
  { value: 'paid', label: 'שולם' },
  { value: 'failed', label: 'נכשל' },
  { value: 'overdue', label: 'בפיגור' },
];

export default function ManualStatusOverrideModal({ isOpen, registrant, payment, onConfirm, onCancel }) {
  const [status, setStatus] = useState(payment?.status ?? '');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleConfirm = () => {
    const validationErrors = validateOverride({ status, reason });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onConfirm({ paymentId: payment.id, status, reason });
  };

  return (
    <Modal isOpen={isOpen} title={`עדכון סטטוס תשלום — ${registrant?.full_name ?? ''}`} onClose={onCancel}>
      <Select label="סטטוס חדש" name="status" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
      {errors.status && <p style={{ color: '#E0554F' }}>{errors.status}</p>}
      <TextField label="סיבה" name="reason" value={reason} onChange={setReason} error={errors.reason} required />
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
        <Button onClick={handleConfirm}>אישור</Button>
        <Button variant="secondary" onClick={onCancel}>
          ביטול
        </Button>
      </div>
    </Modal>
  );
}
