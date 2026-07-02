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

export default function HeroSection() {
  const videoRef = useRef(null);
  const showImage = useVideoAutoplay(videoRef);

  return (
    <>
      <section className="hero-fullscreen" style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: '#0d0f24' }}>

        {/* וידאו מסך מלא */}
        <video
          ref={videoRef}
          src="/video.mp4"
          muted
          playsInline
          preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* פייד לתמונת סיום */}
        <img
          src="/stop-frame.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: showImage ? 1 : 0,
            transition: 'opacity 2.2s ease',
          }}
        />

        {/* שכבת כיהוי עדינה בשוליים */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,3,20,.2) 0%, transparent 30%, transparent 65%, rgba(5,3,20,.55) 100%)',
          pointerEvents: 'none',
        }} />

        {/* ═══ טבעות "שלובות" דקורטיביות — מוסתרות במובייל (hero-deco-rings) ═══ */}
        <div className="hero-deco-rings">
          <div style={{ position: 'absolute', width: 'clamp(160px,22vh,240px)', height: 'clamp(160px,22vh,240px)', borderRadius: '50%', border: '3px solid rgba(201,162,39,.55)', top: '10%', left: '12%', zIndex: 0, clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)' }} />
          <div style={{ position: 'absolute', width: 'clamp(160px,22vh,240px)', height: 'clamp(160px,22vh,240px)', borderRadius: '50%', border: '3px solid rgba(201,162,39,.55)', top: '10%', left: '12%', zIndex: 2, clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)' }} />
          <div style={{ position: 'absolute', width: 'clamp(120px,17vh,180px)', height: 'clamp(120px,17vh,180px)', borderRadius: '50%', border: '3px solid rgba(245,240,255,.45)', bottom: '22%', left: '26%', zIndex: 0, clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)' }} />
          <div style={{ position: 'absolute', width: 'clamp(120px,17vh,180px)', height: 'clamp(120px,17vh,180px)', borderRadius: '50%', border: '3px solid rgba(245,240,255,.45)', bottom: '22%', left: '26%', zIndex: 2, clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)' }} />
          <div style={{ position: 'absolute', width: 'clamp(70px,10vh,105px)', height: 'clamp(70px,10vh,105px)', borderRadius: '50%', border: '2.5px solid rgba(201,162,39,.35)', top: '3%', left: '26%', zIndex: 3, clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)' }} />
          <div style={{ position: 'absolute', width: 'clamp(70px,10vh,105px)', height: 'clamp(70px,10vh,105px)', borderRadius: '50%', border: '2.5px solid rgba(201,162,39,.35)', top: '3%', left: '26%', zIndex: 1, clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)' }} />
        </div>

        {/* ═══ עיגולי שירות — בתחתית ה-Hero, פייד אחד אחרי השני עם סיום הסרטון ═══ */}
        <div className="hero-service-row" style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 0,
        }}>
          {SERVICES.map(({ label: svc, Icon }, i) => (
            <div key={svc} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="hero-service-circle" style={{
                width: 'clamp(100px,12vh,128px)',
                height: 'clamp(100px,12vh,128px)',
                borderRadius: '50%',
                background: 'rgba(248,245,238,.96)',
                /* מסגרת כפולה: טבעת זהב פנימית → פס שקוף → טבעת זהב חיצונית → צל ריחוף */
                boxShadow: `
                  0 0 0 4px rgba(201,162,39,.7),
                  0 0 0 14px rgba(255,255,255,.1),
                  0 0 0 18px rgba(201,162,39,.28),
                  0 24px 48px rgba(0,0,0,.5),
                  0 10px 22px rgba(0,0,0,.3)
                `,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '6px', padding: '12px 8px', textAlign: 'center',
                flexShrink: 0,
                opacity: showImage ? 1 : 0,
                transform: showImage ? 'translateY(0)' : 'translateY(18px)',
                transition: `opacity 0.7s ease ${i * 0.22}s, transform 0.7s ease ${i * 0.22}s`,
              }}>
                <Icon size={30} strokeWidth={1.5} color="var(--color-navy)" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, whiteSpace: 'pre-line' }}>
                  {svc}
                </span>
              </div>
              {/* חוליית שרשרת */}
              {i < SERVICES.length - 1 && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '3px', padding: '0 5px',
                  opacity: showImage ? 1 : 0,
                  transition: `opacity 0.5s ease ${i * 0.22 + 0.35}s`,
                }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(201,162,39,.7)' }} />
                  <div style={{ width: '14px', height: '2px', background: 'rgba(201,162,39,.45)' }} />
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(201,162,39,.7)' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* כפתור "הצטרפו לאיגוד" צף */}
      <Link
        to="/registration"
        className="hero-join-btn"
        style={{
          display: 'inline-block', background: 'var(--color-gold)', color: '#fff',
          textDecoration: 'none', fontWeight: 800, fontSize: '16px',
          padding: '14px 32px', borderRadius: '999px',
          position: 'fixed', left: '32px', bottom: '32px', zIndex: 200,
          boxShadow: '0 10px 30px rgba(201,162,39,.5)',
        }}
      >
        הצטרפו לאיגוד
      </Link>
    </>
  );
}
