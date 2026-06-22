import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  return (
    <Link to={`/updates/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article>
        {article.cover_image_url && (
          <img
            src={article.cover_image_url}
            alt=""
            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 'var(--radius)' }}
          />
        )}
        <h3 style={{ marginBottom: '0.2rem' }}>{article.title}</h3>
        {article.excerpt && <p style={{ color: 'var(--color-text-muted)' }}>{article.excerpt}</p>}
      </article>
    </Link>
  );
}
