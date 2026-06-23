import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    <div className="page" style={{ maxWidth: '40rem', paddingBlock: 'var(--space-4) var(--space-6)' }}>
      <Link to="/updates" style={{ color: 'var(--color-terracotta)', fontWeight: 700, textDecoration: 'none' }}>
        → כל העדכונים
      </Link>
      <PageHeader title={article.title} />
      {article.cover_image_url && (
        <img
          src={article.cover_image_url}
          alt=""
          style={{ width: '100%', borderRadius: '16px', marginBottom: 'var(--space-4)', boxShadow: '0 10px 30px rgba(46,31,71,.1)' }}
        />
      )}
      {article.body.split('\n').map((paragraph, index) => (
        <p key={index} style={{ fontSize: '18px', lineHeight: 1.75, color: 'var(--color-text-muted)' }}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
