import MonoLabel from '../../dummies/MonoLabel/MonoLabel';
import {
  UserCheck, MessageCircle, Shield, Users, Scale, BookOpen,
} from 'lucide-react';

// אייקון מותאם לכל יתרון לפי התוכן בפועל.
const BADGE_CONFIGS = [
  { Icon: UserCheck,     bg: 'var(--color-navy)', color: '#fff',             shadow: 'rgba(45,27,82,.45)' },  // ליווי מקצועי והכשרות
  { Icon: MessageCircle, bg: 'var(--color-gold)', color: 'var(--color-navy)', shadow: 'rgba(201,162,39,.5)' }, // ייעוץ וייצוג משפטי
  { Icon: Shield,        bg: 'var(--color-navy)', color: '#fff',             shadow: 'rgba(45,27,82,.45)' },  // זכויות וביטוח
  { Icon: Users,         bg: 'var(--color-gold)', color: 'var(--color-navy)', shadow: 'rgba(201,162,39,.5)' }, // קהילה ורשת תמיכה
  { Icon: Scale,         bg: 'var(--color-navy)', color: '#fff',             shadow: 'rgba(45,27,82,.45)' },  // ייצוג מול הרשויות
  { Icon: BookOpen,      bg: 'var(--color-gold)', color: 'var(--color-navy)', shadow: 'rgba(201,162,39,.5)' }, // כלים פדגוגיים
];

export default function BenefitsGrid({ label, heading, items }) {
  if (!items?.length) return null;

  return (
    <section id="benefits" style={{ background: 'var(--color-navy)', padding: 'clamp(64px,9vw,110px) 28px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
          <MonoLabel color="var(--color-gold)">{label}</MonoLabel>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(34px,5vw,52px)', lineHeight: 1.1, margin: 0, color: 'var(--color-cream-text)', letterSpacing: '-1px' }}>
            {heading}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          {items.map((item, index) => {
            const { Icon, bg, color, shadow } = BADGE_CONFIGS[index % BADGE_CONFIGS.length];
            return (
              <div key={index} style={{ position: 'relative', background: 'var(--color-surface)', borderRadius: '18px', padding: '38px 30px 30px', boxShadow: '0 8px 28px rgba(45,27,82,.07)' }}>
                {/* באדג' אייקון צף — אפקט ריחוף ע"י שכבות-צל מרובות + הטייה קלה */}
                <div style={{
                  position: 'absolute',
                  top: '-18px',
                  right: '28px',
                  width: '52px',
                  height: '52px',
                  background: bg,
                  borderRadius: '14px',
                  color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(-6deg)',
                  boxShadow: `0 2px 4px ${shadow.replace(',.', ',.08)')}, 0 8px 20px ${shadow}, 0 18px 36px ${shadow.replace(',.4)', ',.18)').replace(',.5)', ',.22)')}`,
                }}>
                  <Icon size={26} strokeWidth={1.8} />
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '22px', margin: '10px 0 10px', color: 'var(--color-navy)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: 0 }}>
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
