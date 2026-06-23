import { Link } from 'react-router-dom';
import MonoLabel from '../../dummies/MonoLabel/MonoLabel';
import ArticleGrid from '../ArticleGrid/ArticleGrid';

export default function UpdatesPreviewSection({ label, heading, ctaLabel, articles }) {
  return (
    <section id="updates" style={{ background: 'var(--color-section-warm)', paddingBlock: 'clamp(64px,9vw,110px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', paddingInline: '28px' }}>
        <div style={{ textAlign: 'center', maxWidth: '36rem', marginInline: 'auto', marginBottom: 'var(--space-5)' }}>
          <MonoLabel color="var(--color-terracotta)">{label}</MonoLabel>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginTop: 0 }}>{heading}</h2>
        </div>

        <ArticleGrid articles={articles} emptyMessage="עדכונים חדשים יתפרסמו כאן בקרוב" />

        <div style={{ textAlign: 'center', marginTop: 'var(--space-5)' }}>
          <Link
            to="/updates"
            style={{
              display: 'inline-block',
              background: 'var(--color-terracotta)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              padding: '0.85rem 2.2rem',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 10px 24px rgba(196,78,46,.35)',
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
