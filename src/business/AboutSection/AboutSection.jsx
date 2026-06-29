import MonoLabel from '../../dummies/MonoLabel/MonoLabel';
// קובץ illustration.jsx נשמר על הדיסק (לא נמחק) למקרה שנרצה לחזור לאיור אחרי שהוחלף
// כאן בתמונה אמיתית - אבל לא מיובא יותר, כדי לא להישאר עם import לא בשימוש.

export default function AboutSection({ label, heading, body }) {
  const paragraphs = (body ?? '').split('\n').filter(Boolean);

  return (
    // position:sticky+top:0 - אותה תבנית כמו כל הסקשנים בעמוד הנחיתה: נדבק לראש המסך,
    // נשאר תקוע עד שגובהו נגלל, ואז משתחרר בדיוק כשהסקשן הבא (שכבר ממתין מתחתיו, עם
    // z-index גבוה יותר) מתחיל לעלות ולכסות אותו. z-index גבוה מהירו (0) חובה - אלמנט
    // עם position אבל בלי z-index מפורש עדיין "מנצח" אלמנטים סטטיים בציור, בלי קשר לסדר
    // ב-DOM, אז כל הסקשנים חייבים להשתתף בסדר העקבי הזה כדי שהירו לא "יחזור להיחשף".
    <section id="about" style={{ position: 'sticky', top: 0, zIndex: 1, background: 'var(--color-bg)', padding: 'clamp(64px,9vw,110px) 28px' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(36px,6vw,72px)',
          alignItems: 'center',
        }}
      >
        <div>
          <MonoLabel color="var(--color-gold)">{label}</MonoLabel>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(34px,5vw,52px)', lineHeight: 1.08, margin: '0 0 22px', color: 'var(--color-navy)', letterSpacing: '-1px', whiteSpace: 'pre-line' }}>
            {heading}
          </h2>
          {paragraphs.map((paragraph, i) => (
            <p key={i} style={{ fontSize: '18px', lineHeight: 1.75, color: 'var(--color-text-muted)', margin: i === paragraphs.length - 1 ? 0 : '0 0 18px' }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div style={{ position: 'relative', justifySelf: 'center' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '22px',
              right: '-22px',
              width: '100%',
              height: '100%',
              background: 'var(--color-gold)',
              borderRadius: '18px',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: 'clamp(280px,40vw,420px)',
              height: 'clamp(280px,40vw,420px)',
              borderRadius: '18px',
              overflow: 'hidden',
              background: 'var(--color-section-cool)',
              boxShadow: '0 24px 50px rgba(27,35,48,.25)',
            }}
          >
            <img
              src="/shluvotsection.png"
              alt="שלובות - איגוד מטפלות המשפחתונים"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
