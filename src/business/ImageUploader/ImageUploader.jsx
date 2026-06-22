import { useRef, useState } from 'react';
import Button from '../../dummies/Button/Button';
import Spinner from '../../dummies/Spinner/Spinner';
import { validateImageFile } from './actions/validation';

export default function ImageUploader({ currentUrl, onUpload, isUploading }) {
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onUpload(file);
  };

  return (
    <div style={{ marginBottom: 'var(--space-2)' }}>
      {currentUrl && (
        <img
          src={currentUrl}
          alt=""
          style={{ maxWidth: '12rem', borderRadius: 'var(--radius)', display: 'block', marginBottom: '0.5rem' }}
        />
      )}
      {isUploading ? (
        <Spinner label="מעלה תמונה..." />
      ) : (
        <Button variant="secondary" onClick={() => fileInputRef.current.click()}>
          {currentUrl ? 'החלפת תמונה' : 'העלאת תמונה'}
        </Button>
      )}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
      {error && <p style={{ color: '#a13d3d' }}>{error}</p>}
    </div>
  );
}
