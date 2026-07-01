import { Link } from 'react-router-dom';
import MonoLabel from '../../dummies/MonoLabel/MonoLabel';
import EmptyState from '../../dummies/EmptyState/EmptyState';

// כתבה מובילה — תמונת-רקע עם כותרת מעל (סגנון כתבת שער עיתון)
function FeaturedStory({ article }) {
  return (
    <Link to={`/updates/${article.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '40px' }}>
      <article
        className="article-card"
        style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          minHeight: '320px',
          background: 'var(--color-navy)',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {article.cover_image_url && (
          <img
            src={article.cover_image_url}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
          />
        )}
        <div style={{ position: 'relative', padding: 'clamp(24px,4vw,40px)', width: '100%' }}>
          <span style={{ display: 'inline-block', background: 'var(--color-gold)', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '4px', letterSpacing: '1px', marginBottom: '12px' }}>
            כתבה מובילה
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(24px,3.5vw,38px)', margin: '0 0 12px', color: '#fff', lineHeight: 1.2 }}>
            {article.title}
          </h3>
          {article.excerpt && (
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'rgba(247,241,232,.8)', margin: '0 0 16px', maxWidth: '60ch' }}>
              {article.excerpt}
            </p>
          )}
          <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '14px' }}>קראו עוד ←</span>
        </div>
      </article>
    </Link>
  );
}

// פריט חדשותי — שורה עם קו מפריד, ללא קופסה
function NewsItem({ article, showImage = false }) {
  return (
    <Link to={`/updates/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article
        className="article-card"
        style={{ paddingBlock: '20px', borderTop: '1.5px solid rgba(45,27,82,.12)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
      >
        {showImage && article.cover_image_url && (
          <img
            src={article.cover_image_url}
            alt=""
            style={{ width: '100px', height: '72px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(15px,1.6vw,18px)', margin: '0 0 6px', color: 'var(--color-navy)', lineHeight: 1.3 }}>
            {article.title}
          </h3>
          {article.excerpt && (
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-muted)', margin: '0 0 8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {article.excerpt}
            </p>
          )}
          <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '13px' }}>קראו עוד ←</span>
        </div>
      </article>
    </Link>
  );
}

export default function UpdatesPreviewSection({ label, heading, ctaLabel, articles }) {
  const featured = articles?.[0];
  const secondary = articles?.slice(1, 3) ?? [];   // עמודה שמאלית — 2 חדשות בינוניות
  const list = articles?.slice(3) ?? [];            // שורה תחתונה — כל שאר הכתבות

  return (
    <section id="updates" style={{ background: 'var(--color-section-cool)', paddingBlock: 'clamp(64px,9vw,110px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', paddingInline: '28px' }}>

        <div style={{ textAlign: 'center', maxWidth: '36rem', marginInline: 'auto', marginBottom: 'clamp(36px,5vw,52px)' }}>
          <MonoLabel color="var(--color-gold)">{label}</MonoLabel>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginTop: 0, color: 'var(--color-navy)' }}>{heading}</h2>
        </div>

        {!articles?.length ? <EmptyState message="עדכונים חדשים יתפרסמו כאן בקרוב" /> : (
          <>
            {/* שורה עליונה: כתבת שער + 2 כתבות בינוניות */}
            <div style={{ display: 'grid', gridTemplateColumns: secondary.length ? '1.6fr 1fr' : '1fr', gap: '32px', marginBottom: '8px' }}>
              {featured && <FeaturedStory article={featured} />}
              {secondary.length > 0 && (
                <div>
                  {secondary.map((a) => <NewsItem key={a.id} article={a} showImage />)}
                </div>
              )}
            </div>

            {/* שורה תחתונה: כתבות נוספות — עם תמונות, רשת 3 עמודות */}
            {list.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0 32px' }}>
                {list.map((a) => <NewsItem key={a.id} article={a} showImage />)}
              </div>
            )}
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: 'var(--space-5)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>
            אלה רק חלק מהכתבות — עמוד העדכונים המלא כולל הרבה יותר
          </p>
          <Link to="/updates" style={{
            display: 'inline-block', background: 'var(--color-gold)', color: '#fff',
            textDecoration: 'none', fontWeight: 700, padding: '0.85rem 2.2rem',
            borderRadius: 'var(--radius-pill)', boxShadow: '0 10px 24px rgba(201,162,39,.35)',
          }}>
            {ctaLabel || 'לכל העדכונים'}
          </Link>
        </div>
      </div>
    </section>
  );
}
