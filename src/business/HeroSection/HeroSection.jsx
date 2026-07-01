import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, GraduationCap, Lightbulb, Scale } from 'lucide-react';

const SERVICES = [
  { label: 'ליווי מקצועי', Icon: UserCheck },
  { label: 'הכשרות',       Icon: GraduationCap },
  { label: 'ייעוץ',        Icon: Lightbulb },
  { label: 'ייצוג מול\nהרשויות', Icon: Scale },
];


const PAUSE_BEFORE_END_SECONDS = 2.4;
// הפייד לתמונה מתחיל קצת לפני העצירה כדי שיתאים לה ויסתיר אותה —
// כשהסרטון עוצר, התמונה כבר חלקית גלויה.
const IMAGE_FADE_BEFORE_PAUSE_SECONDS = 0.7;

function useVideoAutoplay(videoRef) {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let pausedOnce = false;
    let fadeStarted = false;
    const handleReady = () => video.play().catch(() => {});
    const handleTimeUpdate = () => {
      if (!Number.isFinite(video.duration)) return;
      const remaining = video.duration - video.currentTime;
      if (!fadeStarted && remaining <= PAUSE_BEFORE_END_SECONDS + IMAGE_FADE_BEFORE_PAUSE_SECONDS) {
        fadeStarted = true;
        setShowImage(true);
      }
      if (!pausedOnce && remaining <= PAUSE_BEFORE_END_SECONDS) {
        pausedOnce = true;
        video.pause();
      }
    };

    if (video.readyState >= 3) handleReady();
    video.addEventListener('canplaythrough', handleReady);
    video.addEventListener('error', handleReady);
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('canplaythrough', handleReady);
      video.removeEventListener('error', handleReady);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef]);

  return showImage;
}

const PRIMARY_BTN = {
  display: 'inline-block',
  background: 'var(--color-gold)',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 800,
  fontSize: '16px',
  padding: '14px 32px',
  borderRadius: '999px',
  boxShadow: '0 8px 24px rgba(201,162,39,.45)',
  whiteSpace: 'nowrap',
};


export default function HeroSection() {
  const videoRef = useRef(null);
  const showImage = useVideoAutoplay(videoRef);

  return (
    <>
    <section
      style={{
        background: 'var(--color-bg)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* תוכן ראשי - שתי עמודות */}
      <div
        style={{
          flex: 1,
          maxWidth: '1180px',
          margin: '0 auto',
          width: '100%',
          padding: 'clamp(56px,7vh,80px) 28px clamp(40px,5vh,60px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(40px,6vw,80px)',
          alignItems: 'start',
        }}
      >
        {/* עמודה שמאלית: כותרת + טקסט + כפתור + עיגולי שירותים */}
        <div style={{ alignSelf: 'start' }}>

          {/* תגית מזהה */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '1.5px',
            color: 'var(--color-gold)',
            fontWeight: 600,
            marginBottom: '1rem',
          }}>
            שלובות · איגוד מטפלות המשפחתונים
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(34px,4.5vw,58px)',
            lineHeight: 1.1,
            margin: '0 0 28px',
            color: 'var(--color-navy)',
            letterSpacing: '-1.5px',
            whiteSpace: 'pre-line',
          }}>
            {'משפחתון הוא בית.\nאנחנו הבית של מי שמנהלת אותו.'}
          </h1>

          {([
            'משפחתון הוא מסגרת חינוכית חמה ואינטימית לפעוטות,',
            'המנוהלת בידי מטפלת מקצועית בביתה.',
            null, // שורה מיוחדת עם שלובות מודגשת
            'אנחנו מספקות ליווי מקצועי, הכשרות, ייעוץ וייצוג מול הרשויות',
            'כדי שתוכלו להתמקד במה שחשוב באמת: הילדים.',
          ]).map((line, i) => (
            <p key={i} style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--color-text-muted)', margin: '0 0 4px' }}>
              {line ?? (
                <>
                  <strong style={{ color: 'var(--color-gold)', fontWeight: 800 }}>שלובות</strong>
                  {' הוא האיגוד שמאחד את מנהלות המשפחתונים - ודואג שלא תהיו לבד.'}
                </>
              )}
            </p>
          ))}

          {/* 4 עיגולים נפרדים מחוברים בחוליה/שרשרת בין כל שניים */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '32px', gap: 0 }}>
            {SERVICES.map(({ label: svc, Icon }, i) => (
              <div key={svc} style={{ display: 'flex', alignItems: 'center' }}>
                {/* העיגול עצמו */}
                <div style={{
                  width: '108px', height: '108px', borderRadius: '50%',
                  background: 'rgba(248,245,238,.95)',
                  border: '2.5px solid rgba(201,162,39,.5)',
                  backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                  boxShadow: '0 4px 16px rgba(27,47,82,.1)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '7px', padding: '12px 8px', textAlign: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={28} strokeWidth={1.6} color="var(--color-navy)" />
                  <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.25, whiteSpace: 'pre-line' }}>
                    {svc}
                  </span>
                </div>
                {/* חוליית שרשרת בין עיגולים */}
                {i < SERVICES.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '0 4px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(201,162,39,.55)' }} />
                    <div style={{ width: '14px', height: '2px', background: 'rgba(201,162,39,.35)' }} />
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(201,162,39,.55)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* עמודה ימנית: עיגול וידאו ענק + עיגולים משתלבים כחוליות בשרשרת */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {/*
            אפקט "שרשרת": כל טבעת מפוצלת לשני חצאים באמצעות clipPath:
            - חצי "מאחורי" (zIndex 0): נסתר מאחורי העיגול הראשי
            - חצי "לפני" (zIndex 2): עובר מעל העיגול הראשי
            זה יוצר אשליה שהטבעת עוברת דרך העיגול הראשי, כמו חוליות שרשרת.
          */}

          {/* טבעת זהב גדולה — השתלבות כשרשרת מהצד העליון-שמאלי של העיגול הראשי */}
          {/* חצי "מאחורי" (זווית תחתונה-ימנית): נסתר מאחורי העיגול הראשי */}
          <div style={{
            position: 'absolute',
            width: 'clamp(150px, 22vh, 230px)', height: 'clamp(150px, 22vh, 230px)',
            borderRadius: '50%', border: '3px solid rgba(201,162,39,.55)',
            top: '-6%', left: '-8%',
            zIndex: 0,
            clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
          }} />
          {/* חצי "לפני" (זווית עליונה-שמאלית): עובר מעל העיגול הראשי */}
          <div style={{
            position: 'absolute',
            width: 'clamp(150px, 22vh, 230px)', height: 'clamp(150px, 22vh, 230px)',
            borderRadius: '50%', border: '3px solid rgba(201,162,39,.55)',
            top: '-6%', left: '-8%',
            zIndex: 2,
            clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
          }} />

          {/* טבעת navy בינונית — השתלבות מהצד התחתון-ימני */}
          {/* חצי "מאחורי" (עליון-שמאלי): נסתר */}
          <div style={{
            position: 'absolute',
            width: 'clamp(115px, 17vh, 175px)', height: 'clamp(115px, 17vh, 175px)',
            borderRadius: '50%', border: '3px solid rgba(27,47,82,.45)',
            bottom: '-5%', right: '-6%',
            zIndex: 0,
            clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
          }} />
          {/* חצי "לפני" (תחתון-ימני): עובר מעל */}
          <div style={{
            position: 'absolute',
            width: 'clamp(115px, 17vh, 175px)', height: 'clamp(115px, 17vh, 175px)',
            borderRadius: '50%', border: '3px solid rgba(27,47,82,.45)',
            bottom: '-5%', right: '-6%',
            zIndex: 2,
            clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
          }} />

          {/* טבעת קטנה נוספת שמשתלבת עם טבעת הזהב — יוצרת שרשרת של 3 */}
          <div style={{
            position: 'absolute',
            width: 'clamp(65px, 10vh, 100px)', height: 'clamp(65px, 10vh, 100px)',
            borderRadius: '50%', border: '2.5px solid rgba(201,162,39,.35)',
            top: '-14%', left: '-2%',
            zIndex: 3,
            clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
          }} />
          <div style={{
            position: 'absolute',
            width: 'clamp(65px, 10vh, 100px)', height: 'clamp(65px, 10vh, 100px)',
            borderRadius: '50%', border: '2.5px solid rgba(201,162,39,.35)',
            top: '-14%', left: '-2%',
            zIndex: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
          }} />

          {/* עיגול הוידאו הראשי — עם מסגרת כפולה */}
          <div
            style={{
              position: 'relative',
              flexShrink: 0,
              zIndex: 1,
              width: 'clamp(380px, 56vh, 600px)',
              height: 'clamp(380px, 56vh, 600px)',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: `
                0 0 0 5px rgba(201,162,39,.65),
                0 0 0 20px rgba(248,245,238,.97),
                0 0 0 26px rgba(201,162,39,.3),
                0 40px 90px rgba(27,47,82,.22),
                0 12px 30px rgba(27,47,82,.12)
              `,
            }}
          >
            <video
              ref={videoRef}
              src="/video.mp4"
              muted
              playsInline
              preload="auto"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* פתרון "זום-אאוט אמיתי" ללא objectFit:cover:
                height:100% + width:auto → תמונה ב-16:9 טבעי = 1.778× רוחב העיגול.
                scale(0.90) → מקטין ל-1.6×, overflow:hidden קוצץ → רואים 62.5% מהרוחב
                לעומת 56.25% עם cover = עוד 6% רוחב נוסף משני הצדדים.
                translate(-23%,0) → ממרכז את החלק הנראה על השלט. */}
            <img
              src="/stop-frame.png"
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: 'auto',
                transform: 'translate(-23%, 0) scale(0.90)',
                opacity: showImage ? 1 : 0,
                transition: 'opacity 2.2s ease',
              }}
            />
          </div>
        </div>
      </div>

    </section>

      {/* כפתור "הצטרפו לאיגוד" — position:fixed כדי שלא ייחתך ע"י overflow:hidden
          של ה-section. נשאר גלוי בפינה שמאל-למטה בכל עוד הדף פתוח. */}
      <Link
        to="/registration"
        className="hero-join-btn"
        style={{
          ...PRIMARY_BTN,
          position: 'fixed',
          left: '32px',
          bottom: '32px',
          zIndex: 200,
          boxShadow: '0 10px 30px rgba(201,162,39,.5)',
        }}
      >
        הצטרפו לאיגוד
      </Link>
    </>
  );
}
