import TextField from '../../dummies/TextField/TextField';
import Textarea from '../../dummies/Textarea/Textarea';
import Button from '../../dummies/Button/Button';
import ImageUploader from '../ImageUploader/ImageUploader';

export default function ArticleEditorForm({
  values,
  errors,
  isUploadingImage,
  isSaving,
  onFieldChange,
  onUploadCoverImage,
  onSave,
  onCancel,
}) {
  return (
    <div>
      <TextField
        label="כותרת"
        name="title"
        value={values.title}
        onChange={(value) => onFieldChange('title', value)}
        error={errors.title}
        required
      />
      <TextField
        label="תקציר (מוצג ברשימת העדכונים)"
        name="excerpt"
        value={values.excerpt}
        onChange={(value) => onFieldChange('excerpt', value)}
      />
      <Textarea
        label="תוכן הכתבה"
        name="body"
        value={values.body}
        onChange={(value) => onFieldChange('body', value)}
        error={errors.body}
        rows={10}
        required
      />
      <ImageUploader currentUrl={values.cover_image_url} onUpload={onUploadCoverImage} isUploading={isUploadingImage} />
      <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
        <input
          type="checkbox"
          checked={values.published}
          onChange={(e) => onFieldChange('published', e.target.checked)}
          style={{ marginInlineEnd: '0.4rem' }}
        />
        מפורסם (גלוי לציבור)
      </label>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Button onClick={onSave} disabled={isSaving}>
          {isSaving ? 'שומר...' : 'שמירה'}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          ביטול
        </Button>
      </div>
    </div>
  );
}
