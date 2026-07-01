import { useEffect, useRef, useState } from 'react';

// מחלץ את המספר מתוך הערך ("+3,200" → 3200) ומחזיר גם את הפרפיקס/סופיקס
function parseValue(raw) {
  const str = String(raw ?? '');
  const num = parseFloat(str.replace(/[^0-9.]/g, ''));
  const prefix = str.match(/^[^0-9]*/)?.[0] ?? '';
  const suffix = str.match(/[^0-9]*$/)?.[0] ?? '';
  return { num: isNaN(num) ? null : num, prefix, suffix, raw: str };
}

function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || target === null) return;
    let start = null;
    const raf = requestAnimationFrame(function tick(ts) {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

function AnimatedStat({ item }) {
  const { num, prefix, suffix, raw } = parseValue(item.value);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(num, 1800, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const display = num !== null
    ? prefix + count.toLocaleString('he-IL') + suffix
    : raw;

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(48px,6vw,72px)', lineHeight: 1, color: 'var(--color-gold)' }}>
        {display}
      </div>
      <div style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(247,241,232,.8)', marginTop: '8px' }}>
        {item.label}
      </div>
    </div>
  );
}

export default function StatsStrip({ items, animated = false }) {
  if (!items?.length) return null;

  return (
    <section style={{ background: 'var(--color-navy-deep)', color: 'var(--color-cream-text)', padding: 'clamp(56px,7vw,84px) 28px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '-30px', left: '8%', width: '140px', height: '140px', background: 'var(--color-gold)', borderRadius: '50%', opacity: 0.12 }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '36px' }}>
          {items.map((item, i) =>
            animated
              ? <AnimatedStat key={i} item={item} />
              : (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(48px,6vw,72px)', lineHeight: 1, color: 'var(--color-gold)' }}>{item.value}</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(247,241,232,.8)', marginTop: '8px' }}>{item.label}</div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}
