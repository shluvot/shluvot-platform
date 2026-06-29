import { Link } from 'react-router-dom';
import MonoLabel from '../../dummies/MonoLabel/MonoLabel';
import ArticleGrid from '../ArticleGrid/ArticleGrid';

export default function UpdatesPreviewSection({ label, heading, ctaLabel, articles }) {
  return (
    // position:sticky+z-index - חלק מסדרת ה"ערימה" העקבית של כל סקשני דף הנחיתה (ראו
    // הסבר ב-HeroSection.jsx). הסקשן הזה בא כעת ישר אחרי "אודות" (לפי בקשה מפורשת), אז
    // z-index=2 (לא 4 כמו קודם) - חייב להתאים בדיוק לסדר ה-DOM בLanding.jsx. רקע כהה
    // (navy) בכוונה - שובר רצף עם "אודות" שלפניו (בהיר) וגם עם BenefitsGrid שאחריו
    // (section-cool, בהיר). הכרטיסים (ArticleCard/EmptyState) כבר לבנים אז הם "צפים"
    // יפה על הרקע הכהה בלי שינוי - רק כותרת ה-h2 צריכה override מפורש לטקסט בהיר.
    <section id="updates" style={{ position: 'sticky', top: 0, zIndex: 2, background: 'var(--color-navy)', paddingBlock: 'clamp(64px,9vw,110px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', paddingInline: '28px' }}>
        <div style={{ textAlign: 'center', maxWidth: '36rem', marginInline: 'auto', marginBottom: 'var(--space-5)' }}>
          <MonoLabel color="var(--color-gold)">{label}</MonoLabel>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginTop: 0, color: 'var(--color-cream-text)' }}>{heading}</h2>
        </div>

        <ArticleGrid articles={articles} emptyMessage="עדכונים חדשים יתפרסמו כאן בקרוב" />

        <div style={{ textAlign: 'center', marginTop: 'var(--space-5)' }}>
          <Link
            to="/updates"
            style={{
              display: 'inline-block',
              background: 'var(--color-gold)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              padding: '0.85rem 2.2rem',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 10px 24px rgba(201,162,39,.35)',
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
