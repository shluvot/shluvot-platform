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
      .then((articles) => {
        // כתבה מובילה תמיד ראשונה
        const sorted = [...articles].sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        setLatestArticles(sorted.slice(0, 9));
      })
      .catch(() => setLatestArticles([]));
  }, []);

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
      <HeroSection />

      <AboutSection label={about.label} heading={about.heading} body={about.body} />

      {/* סדר: מי אנחנו(בהיר) → מספרים(כהה) → עדכונים(בהיר) → יתרונות(כהה) → יצירת קשר(בהיר) */}
      <StatsStrip items={stats} animated />

      <UpdatesPreviewSection
        label={updatesPreview.label}
        heading={updatesPreview.heading}
        ctaLabel={updatesPreview.ctaLabel}
        articles={latestArticles}
      />

      <BenefitsGrid label={benefits.label} heading={benefits.heading} items={benefits.items} />

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
