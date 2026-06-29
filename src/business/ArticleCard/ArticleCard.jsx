import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  return (
    <Link to={`/updates/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article
        className="article-card"
        style={{
          background: 'var(--color-surface)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(27,47,82,.08)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {article.cover_image_url ? (
          <img src={article.cover_image_url} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--color-section-cool)' }} />
        )}
        <div style={{ padding: 'var(--space-3)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', margin: '0 0 0.4rem', color: 'var(--color-navy)' }}>
            {article.title}
          </h3>
          {article.excerpt && <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{article.excerpt}</p>}
          <span style={{ display: 'inline-block', marginTop: '0.8rem', color: 'var(--color-gold)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
            קראו עוד ←
          </span>
        </div>
      </article>
    </Link>
  );
}
