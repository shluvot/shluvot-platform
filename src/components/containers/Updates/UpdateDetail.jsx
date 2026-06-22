import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../../dummies/PageHeader/PageHeader';
import Spinner from '../../../dummies/Spinner/Spinner';
import EmptyState from '../../../dummies/EmptyState/EmptyState';
import { sdk } from '../../../sdk';

export default function UpdateDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(undefined);

  useEffect(() => {
    sdk.articles
      .getArticleBySlug(slug)
      .then(setArticle)
      .catch(() => setArticle(null));
  }, [slug]);

  if (article === undefined) return <Spinner />;
  if (article === null) return <EmptyState message="העדכון לא נמצא" />;

  return (
    <div className="page" style={{ maxWidth: '40rem' }}>
      <PageHeader title={article.title} />
      {article.cover_image_url && (
        <img
          src={article.cover_image_url}
          alt=""
          style={{ width: '100%', borderRadius: 'var(--radius)', marginBottom: 'var(--space-3)' }}
        />
      )}
      {article.body.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
