import Modal from '../Modal/Modal';
import Button from '../Button/Button';

export default function ConfirmDialog({ isOpen, title, message, confirmLabel = 'אישור', danger = false, onConfirm, onCancel }) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      {message && <p style={{ color: 'var(--color-text-muted)' }}>{message}</p>}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
        <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          ביטול
        </Button>
      </div>
    </Modal>
  );
}
