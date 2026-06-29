import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about', label: 'אודות' },
  { href: '#benefits', label: 'יתרונות' },
  { to: '/updates', label: 'עדכונים' },
  { href: '#contact', label: 'צרו קשר' },
];

// קצב נגינה: פי 2.2 למשך רוב הסרטון, ולקראת הסוף (האחוז האחרון מהמשך הכולל) מאט בעדינות
// (ease-out) לקראת עצירה - לא קפיצה חדה. אחוז (לא שניות קבועות) כדי שזה יעבוד נכון
// בלי תלות באורך המדויק של הקובץ.
const BASE_PLAYBACK_RATE = 2.2;
const MIN_PLAYBACK_RATE = 0.15;
const SLOWDOWN_FRACTION = 0.22;
// כפתורי ה-CTA מתגלים בפייד רגע לפני שהסרטון נגמר (לא רק כש-ended קורה) - שניות קבועות
// (לא אחוז) כי "רגע לפני הסוף" הוא משך קצר ואבסולוטי, לא יחסי לאורך הסרטון.
const CTA_REVEAL_BEFORE_END_SECONDS = 1.3;

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

// בסיס משותף לשני כפתורי ה-CTA - מבטיח שהם *בדיוק* באותו גודל (לא קירוב ויזואלי) כי שני
// הכפתורים חולקים את כל מאפייני המידות/המסגרת, ונבדלים רק במילוי (gold מלא לעומת שקוף-בהיר,
// מוגדר ב-global.css כ-.hero-cta-primary/.hero-cta-secondary - לא כאן). outline+outlineOffset
// (לא border) כי outline לא צמוד לקופסה - יוצר פער אמיתי שבו רואים את הסרטון בין הכפתור
// למסגרת. backdrop-filter על שני הכפתורים כדי שהם "יקלטו" את צבעי הסרטון מתחתם.
// outlineColor (לא outline shorthand!) נשאר כאן רק כברירת מחדל - outlineWidth/Style/Offset
// בלבד צריכים להיות קבועים; outlineColor חייב להיות מוגדר ב-CSS (לא inline) כדי ש-:hover
// יוכל לשנות אותו בלי שה-inline style ינצח אותו (inline מנצח כל stylesheet חיצוני).
const CTA_BUTTON_BASE = {
  textDecoration: 'none',
  fontSize: '16px',
  padding: '14px 32px',
  borderRadius: '999px',
  whiteSpace: 'nowrap',
  outlineWidth: '1.5px',
  outlineStyle: 'solid',
  outlineOffset: '5px',
  backdropFilter: 'blur(10px) saturate(160%)',
  WebkitBackdropFilter: 'blur(10px) saturate(160%)',
};

// לופ requestAnimationFrame אחד (לא timeupdate, שמתעדכן רק כמה פעמים בשניה ונראה "מדורג")
// שגם מאט את video.playbackRate בעדינות לקראת הסוף וגם מסמן מתי לגלות את כפתורי ה-CTA -
// שני אפקטים שתלויים באותו ציר זמן (currentTime/duration), אז עדיף לופ משותף אחד.
function useVideoTimeline(videoRef, isReady) {
  const [showCtas, setShowCtas] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = BASE_PLAYBACK_RATE;

    let rafId;
    function tick() {
      const { currentTime, duration } = video;
      if (Number.isFinite(duration) && duration > 0) {
        const remaining = duration - currentTime;

        const windowSeconds = duration * SLOWDOWN_FRACTION;
        if (remaining <= windowSeconds) {
          const t = Math.min(1, Math.max(0, 1 - remaining / windowSeconds));
          const eased = easeOutCubic(t);
          video.playbackRate = Math.max(
            MIN_PLAYBACK_RATE,
            BASE_PLAYBACK_RATE - (BASE_PLAYBACK_RATE - MIN_PLAYBACK_RATE) * eased
          );
        } else {
          video.playbackRate = BASE_PLAYBACK_RATE;
        }

        if (remaining <= CTA_REVEAL_BEFORE_END_SECONDS) {
          setShowCtas(true);
        }
      }
      if (!video.ended && !video.paused) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [videoRef, isReady]);

  return showCtas;
}

// וידאו ההירו: לא autoplay רגיל - מחכים ל-canplaythrough (או ל-error, כדי לא להיתקע
// לנצח אם הקובץ נכשל) ורק אז קוראים ל-play() בעצמנו, כדי שההפעלה תתאם בדיוק לרגע שבו
// מסך-הטעינה נעלם. muted+playsInline נדרשים כדי שדפדפנים (בעיקר Safari/iOS) יאפשרו
// autoplay כלל. אין loop - הסרטון רץ פעם אחת ונשאר על הפריים האחרון.
function useVideoReady(videoRef) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 3) {
      setIsReady(true);
      return;
    }

    function handleReady() {
      setIsReady(true);
    }
    video.addEventListener('canplaythrough', handleReady);
    video.addEventListener('error', handleReady);
    return () => {
      video.removeEventListener('canplaythrough', handleReady);
      video.removeEventListener('error', handleReady);
    };
  }, [videoRef]);

  useEffect(() => {
    if (isReady) {
      videoRef.current?.play().catch(() => {});
    }
  }, [isReady, videoRef]);

  useEffect(() => {
    document.body.style.overflow = isReady ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isReady]);

  return isReady;
}

export default function HeroSection() {
  const videoRef = useRef(null);
  const isReady = useVideoReady(videoRef);
  const showCtas = useVideoTimeline(videoRef, isReady);

  return (
    <>
      {!isReady && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0d0f24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="spinner-ring" />
        </div>
      )}

      {/* position:sticky (לא fixed+ספייסר נפרד) - זה התבנית האחידה שכל הסקשנים בעמוד
          משתמשים בה: כל סקשן "נדבק" לראש המסך כשמגיעים אליו, ונשאר תקוע במקום עד שגובהו
          המלא נגלל, ורק אז משתחרר - בדיוק באותו זמן שהסקשן הבא (שכבר היה נדבק מתחתיו)
          מתחיל לעלות ולכסות אותו. position:sticky שומר את המקום בזרימה הרגילה (לא צריך
          ספייסר נפרד כמו ב-fixed), ולכן כל הסקשנים יכולים להשתמש בו בעקביות, כל אחד עם
          z-index הולך ועולה לפי סדר ה-DOM - כדי שיתערמו זה על זה בכיוון הנכון. בלי
          z-index מפורש על *כל* הסקשנים, אלמנטים סטטיים (בלי position) תמיד מצוירים
          *מתחת* לאלמנטים ממוקמים (positioned) - בלי קשר לסדר ה-DOM ביניהם - וזו הייתה
          הבאגה שגרמה להירו "להיחשף" שוב מתחת לסקשנים שעדיין לא קיבלו position+z-index. */}
      <section style={{ position: 'sticky', top: 0, zIndex: 0, height: '100vh', overflow: 'hidden', background: '#0d0f24' }}>
        <video
          ref={videoRef}
          src="/video.mp4"
          muted
          playsInline
          preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* באדג' עגול - היה לוגו משרד התמ"ת (כיסוי דקורטיבי בלבד לסימן ה-AI שהסרטון
            נוצר בו), הוחלף לכפתור "צרו קשר" פעיל (עוגן ל-#contact) כיוון שעדיף שהמקום
            הזה יהיה שימושי ולא רק קוסמטי - עדיין מכסה את אותו סימן AI כתופעת-לוואי, כי
            המיקום/גודל נשארו זהים. אחוזים (לא px קבועים!) - מדדנו את מיקום הסימן במדויק
            ברשת-פיקסלים ב-viewport ידוע (1440x900: מרכז הסימן ב-(1363,750), כלומר 5.35%
            מהקצה הימני, 16.67% מהתחתון), והמרנו לאחוזים כדי שהמיקום היחסי יישאר נכון בכל
            גודל/זום של חלון הדפדפן. הגודל (5vw, לא %) כדי שהעיגול יישאר עיגול אמיתי. */}
        <a
          href="#contact"
          aria-label="צרו קשר"
          className="hero-contact-badge"
          style={{
            position: 'absolute',
            right: '6.9%',
            bottom: '12.7%',
            width: 'clamp(56px, 5vw, 90px)',
            height: 'clamp(56px, 5vw, 90px)',
            borderRadius: '50%',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-gold)',
            border: '2px solid rgba(255,255,255,.92)',
            textDecoration: 'none',
            color: '#fff',
          }}
        >
          <MessageCircle size="46%" strokeWidth={2} />
        </a>

        {/* ממוקם קצת מתחת למרכז (top:58%, לא 50%) כדי לשבת מתחת לטקסט השלט שמופיע על
            הסרטון, ולא לחפוף אותו. מתגלה בפייד (לא מופיע ישר) ממש לפני שהסרטון נגמר. */}
        <div
          style={{
            position: 'absolute',
            top: '58%',
            left: '50%',
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            opacity: showCtas ? 1 : 0,
            transform: showCtas ? 'translate(-50%, -50%)' : 'translate(-50%, -40%)',
            transition: 'opacity 1s ease, transform 1s ease',
            pointerEvents: showCtas ? 'auto' : 'none',
          }}
        >
          <Link
            to="/registration"
            className="hero-cta-btn hero-cta-primary"
            style={{ ...CTA_BUTTON_BASE, color: '#fff', fontWeight: 800 }}
          >
            הצטרפו לאיגוד
          </Link>
          <a
            href="#about"
            className="hero-cta-btn hero-cta-secondary"
            style={{ ...CTA_BUTTON_BASE, color: 'var(--color-cream-text)', fontWeight: 700 }}
          >
            מי אנחנו
          </a>
        </div>

        <header
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            maxWidth: '1180px',
            margin: '0 auto',
            padding: '26px 28px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', letterSpacing: '-.5px', color: 'var(--color-cream-text)' }}>
            שלובות
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '26px', rowGap: '10px', justifyContent: 'flex-end' }}>
            {NAV_LINKS.map((link) => {
              const linkStyle = { color: 'var(--color-cream-text)', textDecoration: 'none', fontWeight: 600, fontSize: '15px', opacity: 0.85, whiteSpace: 'nowrap' };
              return link.to ? (
                <Link key={link.to} to={link.to} style={linkStyle}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} style={linkStyle}>
                  {link.label}
                </a>
              );
            })}
            <Link
              to="/registration"
              style={{
                background: 'var(--color-gold)',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '16px',
                padding: '12px 28px',
                borderRadius: '999px',
                boxShadow: '0 8px 24px rgba(201,162,39,.55)',
              }}
            >
              הצטרפו לאיגוד
            </Link>
          </nav>
        </header>
      </section>
    </>
  );
}
