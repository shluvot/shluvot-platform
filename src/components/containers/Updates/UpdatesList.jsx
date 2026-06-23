import { useEffect, useState } from 'react';
import UpdatesHero from '../../../business/UpdatesHero/UpdatesHero';
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
    <div>
      <UpdatesHero eyebrow="בלוג האיגוד" title="עדכונים וחדשות" subtitle="כל מה שחשוב לדעת על האיגוד ועל הפעילות שלנו" />
      <div className="page" style={{ paddingBlock: 'var(--space-5) var(--space-6)' }}>
        {articles === null ? <Spinner /> : <ArticleGrid articles={articles} />}
      </div>
    </div>
  );
}
