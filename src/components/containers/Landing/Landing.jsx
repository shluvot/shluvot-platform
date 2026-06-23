import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HeroSection from '../../../business/HeroSection/HeroSection';
import AboutSection from '../../../business/AboutSection/AboutSection';
import StatsStrip from '../../../business/StatsStrip/StatsStrip';
import BenefitsGrid from '../../../business/BenefitsGrid/BenefitsGrid';
import UpdatesPreviewSection from '../../../business/UpdatesPreviewSection/UpdatesPreviewSection';
import ContactSection from '../../../business/ContactSection/ContactSection';
import { sdk } from '../../../sdk';

export default function Landing() {
  const blocks = useSelector((state) => state.siteContent.blocks);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    sdk.articles
      .getPublishedArticles()
      .then((articles) => setLatestArticles(articles.slice(0, 3)))
      .catch(() => setLatestArticles([]));
  }, []);

  const hero = blocks.hero ?? {};
  const about = blocks.about_page ?? {};
  const stats = blocks.stats?.items ?? [];
  const benefits = blocks.value_props ?? {};
  const updatesPreview = blocks.updates_preview ?? {};
  const contact = blocks.contact_page ?? {};

  const handleLeadSubmit = async (lead) => {
    setSubmitting(true);
    try {
      await sdk.leads.createLead(lead);
      setSent(true);
    } catch (error) {
      console.error('שליחת הטופס נכשלה', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <HeroSection
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        ctaLabel={hero.ctaLabel}
        secondaryCtaLabel={hero.secondaryCtaLabel}
        badges={hero.badges}
      />

      <AboutSection label={about.label} heading={about.heading} body={about.body} />

      <StatsStrip items={stats} />

      <BenefitsGrid label={benefits.label} heading={benefits.heading} items={benefits.items} />

      <UpdatesPreviewSection
        label={updatesPreview.label}
        heading={updatesPreview.heading}
        ctaLabel={updatesPreview.ctaLabel}
        articles={latestArticles}
      />

      <ContactSection
        label={contact.label}
        heading={contact.heading}
        body={contact.body}
        phone={contact.phone}
        email={contact.email}
        onSubmit={handleLeadSubmit}
        submitting={submitting}
        sent={sent}
      />
    </div>
  );
}
