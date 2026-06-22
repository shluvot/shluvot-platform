import EmptyState from '../../dummies/EmptyState/EmptyState';
import ArticleCard from '../ArticleCard/ArticleCard';

export default function ArticleGrid({ articles, emptyMessage = 'אין עדכונים להצגה' }) {
  if (!articles?.length) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))', gap: 'var(--space-3)' }}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
