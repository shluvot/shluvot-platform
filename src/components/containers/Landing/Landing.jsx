import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeroSection from '../../../business/HeroSection/HeroSection';
import MissionStatement from '../../../business/MissionStatement/MissionStatement';
import StatsStrip from '../../../business/StatsStrip/StatsStrip';
import ValuePropsSection from '../../../business/ValuePropsSection/ValuePropsSection';
import TestimonialList from '../../../business/TestimonialList/TestimonialList';
import Timeline from '../../../business/Timeline/Timeline';
import ArticleGrid from '../../../business/ArticleGrid/ArticleGrid';
import PageHeader from '../../../dummies/PageHeader/PageHeader';
import { sdk } from '../../../sdk';

export default function Landing() {
  const blocks = useSelector((state) => state.siteContent.blocks);
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    sdk.articles
      .getPublishedArticles()
      .then((articles) => setLatestArticles(articles.slice(0, 3)))
      .catch(() => setLatestArticles([]));
  }, []);

  const hero = blocks.hero ?? {};
  const mission = blocks.mission_statement ?? {};
  const stats = blocks.stats?.items ?? [];
  const valueProps = blocks.value_props?.items ?? [];
  const testimonials = blocks.testimonials?.items ?? [];
  const timelineEvents = blocks.timeline?.events ?? [];
  const missionQuoteItem = mission.quote ? [{ quote: mission.quote }] : [];

  return (
    <div>
      <HeroSection
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        ctaLabel={hero.ctaLabel}
        heroImageUrl={hero.heroImageUrl}
      />

      <div className="page">
        <section style={{ margin: 'var(--space-5) 0' }}>
          <MissionStatement intro={mission.intro} body={mission.body} />
        </section>

        {missionQuoteItem.length > 0 && (
          <section style={{ margin: 'var(--space-4) 0' }}>
            <TestimonialList items={missionQuoteItem} />
          </section>
        )}

        <StatsStrip items={stats} />

        <ValuePropsSection items={valueProps} />

        {testimonials.length > 0 && (
          <section style={{ margin: 'var(--space-5) 0' }}>
            <PageHeader title="חברות מספרות" />
            <TestimonialList items={testimonials} />
          </section>
        )}

        {timelineEvents.length > 0 && (
          <section style={{ margin: 'var(--space-5) 0' }}>
            <PageHeader title="ציר זמן" />
            <Timeline events={timelineEvents} />
          </section>
        )}

        <section style={{ margin: 'var(--space-5) 0' }}>
          <PageHeader title="עדכונים אחרונים" />
          <ArticleGrid articles={latestArticles} />
          <div style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}>
            <Link to="/updates">לכל העדכונים ←</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
