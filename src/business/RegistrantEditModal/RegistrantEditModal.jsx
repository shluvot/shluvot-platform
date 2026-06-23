import { useState } from 'react';
import Modal from '../../dummies/Modal/Modal';
import TextField from '../../dummies/TextField/TextField';
import Select from '../../dummies/Select/Select';
import Textarea from '../../dummies/Textarea/Textarea';
import Button from '../../dummies/Button/Button';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'ממתין' },
  { value: 'active', label: 'פעיל' },
  { value: 'cancelled', label: 'מבוטל' },
];

const BILLING_CYCLE_OPTIONS = [
  { value: 'monthly', label: 'חודשי' },
  { value: 'annual', label: 'שנתי' },
];

function buildDraft(registrant) {
  return {
    full_name: registrant?.full_name ?? '',
    email: registrant?.email ?? '',
    phone: registrant?.phone ?? '',
    national_id: registrant?.national_id ?? '',
    address: registrant?.address ?? '',
    city: registrant?.city ?? '',
    billing_cycle: registrant?.billing_cycle ?? 'monthly',
    status: registrant?.status ?? 'pending',
    notes: registrant?.notes ?? '',
  };
}

export default function RegistrantEditModal({ isOpen, registrant, onConfirm, onCancel }) {
  const [draft, setDraft] = useState(() => buildDraft(registrant));
  const [savedForId, setSavedForId] = useState(registrant?.id);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // המודאל נשאר mounted בין פתיחות (כדי לאפשר אנימציית סגירה בעתיד); כשמטרת העריכה מתחלפת יש לאפס את הטיוטה.
  if (registrant?.id !== savedForId) {
    setDraft(buildDraft(registrant));
    setSavedForId(registrant?.id);
  }

  const set = (key) => (value) => setDraft((prev) => ({ ...prev, [key]: value }));

  const handleConfirm = async () => {
    const validationErrors = {};
    if (!draft.full_name.trim()) validationErrors.full_name = 'שדה חובה';
    if (!draft.email.trim()) validationErrors.email = 'שדה חובה';
    if (!draft.phone.trim()) validationErrors.phone = 'שדה חובה';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    try {
      await onConfirm(draft);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title={`עריכת נרשם — ${registrant?.full_name ?? ''}`} onClose={onCancel}>
      <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingInlineEnd: '0.3rem' }}>
        <TextField label="שם מלא" name="full_name" value={draft.full_name} onChange={set('full_name')} error={errors.full_name} required />
        <TextField label="אימייל" name="email" type="email" value={draft.email} onChange={set('email')} error={errors.email} required />
        <TextField label="טלפון" name="phone" value={draft.phone} onChange={set('phone')} error={errors.phone} required />
        <TextField label="תעודת זהות" name="national_id" value={draft.national_id} onChange={set('national_id')} />
        <TextField label="כתובת" name="address" value={draft.address} onChange={set('address')} />
        <TextField label="עיר" name="city" value={draft.city} onChange={set('city')} />
        <Select label="מחזור חיוב" name="billing_cycle" value={draft.billing_cycle} onChange={set('billing_cycle')} options={BILLING_CYCLE_OPTIONS} />
        <Select label="סטטוס נרשם" name="status" value={draft.status} onChange={set('status')} options={STATUS_OPTIONS} />
        <Textarea label="הערות" name="notes" value={draft.notes} onChange={set('notes')} rows={3} />
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
        <Button onClick={handleConfirm} disabled={isSaving}>
          {isSaving ? 'שומר...' : 'שמירה'}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          ביטול
        </Button>
      </div>
    </Modal>
  );
}
