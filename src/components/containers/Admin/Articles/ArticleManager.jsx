import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../../dummies/PageHeader/PageHeader';
import AdminNav from '../../../../dummies/AdminNav/AdminNav';
import Spinner from '../../../../dummies/Spinner/Spinner';
import Button from '../../../../dummies/Button/Button';
import EmptyState from '../../../../dummies/EmptyState/EmptyState';
import ArticleEditorForm from '../../../../business/ArticleEditorForm/ArticleEditorForm';
import { slugify, validateArticle } from '../../../../business/ArticleEditorForm/actions/validation';
import { loadArticles, saveArticle, removeArticle, uploadCoverImage } from './actions/articleManagerActions';

const BLANK_ARTICLE = { title: '', excerpt: '', body: '', cover_image_url: null, published: false };

export default function ArticleManager() {
  const dispatch = useDispatch();
  const { rows, status, error } = useSelector((state) => state.adminArticles);
  const [editingId, setEditingId] = useState(undefined); // undefined = list view, null = new article, id = editing
  const [draft, setDraft] = useState(BLANK_ARTICLE);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    dispatch(loadArticles());
  }, [dispatch]);

  const startNew = () => {
    setDraft(BLANK_ARTICLE);
    setErrors({});
    setEditingId(null);
  };

  const startEdit = (article) => {
    setDraft(article);
    setErrors({});
    setEditingId(article.id);
  };

  const handleSave = async () => {
    const validationErrors = validateArticle(draft);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSaving(true);
    try {
      const justPublished = draft.published && !draft.published_at;
      const fields = {
        title: draft.title,
        excerpt: draft.excerpt,
        body: draft.body,
        cover_image_url: draft.cover_image_url,
        published: draft.published,
        ...(justPublished ? { published_at: new Date().toISOString() } : {}),
        ...(editingId ? {} : { slug: slugify(draft.title) }),
      };
      await dispatch(saveArticle(editingId, fields));
      setEditingId(undefined);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadCoverImage = async (file) => {
    setIsUploadingImage(true);
    try {
      const url = await uploadCoverImage(file);
      setDraft((prev) => ({ ...prev, cover_image_url: url }));
    } finally {
      setIsUploadingImage(false);
    }
  };

  if (editingId !== undefined) {
    return (
      <div className="page">
        <PageHeader title={editingId ? 'עריכת עדכון' : 'עדכון חדש'} />
        <ArticleEditorForm
          values={draft}
          errors={errors}
          isUploadingImage={isUploadingImage}
          isSaving={isSaving}
          onFieldChange={(field, value) => setDraft({ ...draft, [field]: value })}
          onUploadCoverImage={handleUploadCoverImage}
          onSave={handleSave}
          onCancel={() => setEditingId(undefined)}
        />
      </div>
    );
  }

  return (
    <div className="page">
      <PageHeader title="ניהול עדכונים וחדשות" />
      <AdminNav />
      <Button onClick={startNew}>עדכון חדש</Button>

      {status === 'loading' && <Spinner />}
      {status === 'error' && <p style={{ color: '#a13d3d' }}>שגיאה: {error}</p>}
      {status !== 'loading' && status !== 'error' && rows.length === 0 && <EmptyState message="אין עדכונים עדיין" />}

      {rows.map((article) => (
        <div
          key={article.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-2) 0',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div>
            <strong>{article.title}</strong>{' '}
            <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              {article.published ? 'מפורסם' : 'טיוטה'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" onClick={() => startEdit(article)}>
              עריכה
            </Button>
            <Button variant="danger" onClick={() => dispatch(removeArticle(article.id))}>
              מחיקה
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
