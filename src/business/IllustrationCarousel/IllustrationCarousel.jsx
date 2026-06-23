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

  const trackStyle = {
    display: 'flex',
    width: `${FRAME_COUNT * 100}%`,
    transform: `translateX(-${idx * 20}%)`,
    transition,
  };

  return (
    <div>
      <div
        style={{
          borderRadius: '228px 228px 24px 24px',
          overflow: 'hidden',
          aspectRatio: '348 / 454',
          boxShadow: '0 24px 60px rgba(30, 19, 54, 0.35)',
        }}
      >
        <div style={trackStyle}>
          {frames.map((frame, i) => (
            <div key={i} style={{ flex: '0 0 20%' }}>
              {frame}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          marginInline: 'auto',
          maxWidth: '20rem',
          background: 'var(--color-purple-light)',
          borderRadius: 'var(--radius-pill)',
          overflow: 'hidden',
          padding: '0.9rem 0',
        }}
      >
        <div style={trackStyle}>
          {captions.map((caption, i) => (
            <div
              key={i}
              style={{
                flex: '0 0 20%',
                textAlign: 'center',
                color: '#fff',
                fontWeight: 600,
                fontSize: 'var(--text-sm)',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
            >
              {caption}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
