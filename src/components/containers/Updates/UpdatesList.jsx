import { useEffect, useState } from 'react';
import PageHeader from '../../../dummies/PageHeader/PageHeader';
import Spinner from '../../../dummies/Spinner/Spinner';
import ArticleGrid from '../../../business/ArticleGrid/ArticleGrid';
import { sdk } from '../../../sdk';

export default function UpdatesList() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    sdk.articles
      .getPublishedArticles()
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  return (
    <div className="page" style={{ paddingBlock: 'var(--space-4) var(--space-6)' }}>
      <PageHeader eyebrow="עדכונים" title="עדכונים וחדשות" subtitle="כל מה שחשוב לדעת על האיגוד ועל הפעילות שלנו" />
      {articles === null ? <Spinner /> : <ArticleGrid articles={articles} />}
    </div>
  );
}
