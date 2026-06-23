import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 5;
const ADVANCE_INTERVAL_MS = 3400;
const RESET_DELAY_MS = 790;
const EASE = 'transform .75s cubic-bezier(.65,0,.2,1)';

export default function IllustrationCarousel({ frames, captions }) {
  const [idx, setIdx] = useState(FRAME_COUNT - 1);
  const [transition, setTransition] = useState('none');
  const idxRef = useRef(FRAME_COUNT - 1);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      idxRef.current -= 1;
      setTransition(EASE);
      setIdx(idxRef.current);

      if (idxRef.current === 0) {
        resetTimeoutRef.current = setTimeout(() => {
          idxRef.current = FRAME_COUNT - 1;
          setTransition('none');
          setIdx(FRAME_COUNT - 1);
        }, RESET_DELAY_MS);
      }
    }, ADVANCE_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  // הטראק חייב direction:ltr קשיח, בלי תלות בכיווניות RTL של הדף - אחרת flex הופך
  // את סדר הפריימים ו-translateX זז לכיוון ההפוך ממה שהמתמטיקה מצפה לו.
  const trackStyle = {
    display: 'flex',
    height: '100%',
    width: `${FRAME_COUNT * 100}%`,
    transform: `translateX(-${idx * 20}%)`,
    transition,
    willChange: 'transform',
  };

  return (
    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'clamp(320px, 32vw, 432px)',
          height: 'clamp(418px, 42vw, 564px)',
          borderRadius: '228px 228px 24px 24px',
          overflow: 'hidden',
          boxShadow: '0 30px 70px rgba(46,31,71,.25)',
          background: '#BFE0F2',
          border: '5px solid #FFFFFF',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', direction: 'ltr' }}>
          <div style={trackStyle}>
            {frames.map((frame, i) => (
              <div key={i} style={{ flex: '0 0 20%', height: '100%' }}>
                {frame}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          marginTop: '-28px',
          width: 'clamp(300px, 26vw, 392px)',
          height: '58px',
          overflow: 'hidden',
          background: '#D2613F',
          borderRadius: '999px',
          boxShadow: '0 16px 38px rgba(0,0,0,.34)',
          direction: 'ltr',
        }}
      >
        <div style={trackStyle}>
          {captions.map((caption, i) => (
            <span
              key={i}
              style={{
                flex: '0 0 20%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                direction: 'rtl',
                color: '#fff',
                fontWeight: 800,
                fontSize: 'clamp(16px, 1.7vw, 21px)',
                whiteSpace: 'nowrap',
              }}
            >
              {caption}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
