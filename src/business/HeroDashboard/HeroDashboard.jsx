import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  LabelList,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

// כל הנתונים כאן סטטיים ומתועדים במקור - זה תוכן עיצובי/שיווקי, לא דאטה חי, ולכן לא עובר
// דרך ה-SDK/Supabase. אם בעתיד נרצה לערוך את המספרים מהאדמין, יש להעביר אותם ל-site_content.
// הגרפים בנויים עם recharts (ספריית גרפים אמיתית) - עם צירים, רשת וסקאלה אמיתית.
// חשוב: כל עטיפת גרף חייבת direction:'ltr' מפורש - בלעדיו ה-direction:rtl שעולה מהעמוד
// "דולף" לחישובי הפריסה הפנימיים של recharts (שמניחים LTR) וכל הציר/תוויות מתבלבלים.
// המשפך (funnel) מצויר כ-SVG מותאם-אישית (לא ע"י <Funnel> של recharts) כדי לקבל צלעות
// מעוגלות-פנימה בין כל שלב - ל-recharts אין תמיכה מובנית בצורה כזו, רק בטרפזים בזוויות חדות.

const NAVY = '#1B2F52';
const GOLD = '#C9A227';
const TEAL = '#3D6B7D';
const WINE = '#7D3B4A';
const BRONZE = '#8C6E4A';
const SAGE = '#5C7A63';

// הכרטיסים שקופים (אין רקע לבן מתחתיהם) - NAVY עדיין משמש כצבע מילוי בגרף הפאי (תקף
// על כל רקע), אבל טקסט כהה (כמו ה-AXIS_TEXT/GRID הישנים שנועדו לרקע לבן) לא קריא על
// הרקע הכהה/שקוף החדש. כל טקסט (כותרות, מספרים, תוויות, קווי-רשת) משתמש בקבועים
// הבהירים האלה במקום.
const LIGHT_TEXT = '#F5F2EA';
const LIGHT_MUTED = '#C9CEDC';
const LIGHT_GRID = 'rgba(245,242,234,.22)';

const TRACK_A = 'משרד העבודה';
const TRACK_B = 'חוק פעוטות בסיכון';
const toddlersStacked = [{ category: 'פעוטות', [TRACK_A]: 10864, [TRACK_B]: 5100 }];

const donutData = [
  { name: 'סבסוד להורים', color: NAVY },
  { name: 'שכר לימוד מפוקח', color: GOLD },
  { name: 'הכרה כמסגרת מוכרת', color: TEAL },
  { name: 'עבודה מול נהלים', color: WINE },
  { name: 'אמון מול הורים', color: BRONZE },
  { name: 'חיבור למערך ציבורי', color: SAGE },
].map((d) => ({ ...d, value: 1 }));

const funnelStages = [
  { name: 'פניות מהשטח', color: TEAL },
  { name: 'איסוף נתונים ובעיות חוזרות', color: BRONZE },
  { name: 'גיבוש דרישות מקצועיות', color: SAGE },
  { name: 'ייצוג מול רשויות ומקבלי החלטות', color: WINE },
  { name: 'קידום זכויות, תגמולים ותנאים', color: GOLD },
];
const funnelData = funnelStages.map((stage, i) => ({ ...stage, value: 100 - i * 18 }));

const cardStyle = {
  background: 'transparent',
  borderRadius: '12px',
  padding: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '14.5px',
  fontWeight: 700,
  color: LIGHT_TEXT,
  marginBottom: '7px',
  lineHeight: 1.3,
};

const sourceStyle = {
  fontSize: '11px',
  color: LIGHT_MUTED,
  marginTop: '6px',
  lineHeight: 1.4,
  borderTop: `1px solid ${LIGHT_GRID}`,
  paddingTop: '5px',
};

const numberFont = { fontFamily: 'var(--font-mono)' };

const RADIAN = Math.PI / 180;

// תווית-קריאה לפאי: קו דק מהפרוסה אל הטקסט, במקום לג'נד נפרדת מתחת לגרף.
// הטקסט בתוך foreignObject ברוחב קבוע (לא <text> רגיל) כדי שיתעטף לשתי שורות
// במקום להיחתך - חשוב במיוחד במסכים צרים שבהם הכרטיס עצמו צר.
function renderDonutCallout(props) {
  const { cx, cy, midAngle, outerRadius, index } = props;
  const entry = donutData[index];
  const cos = Math.cos(-RADIAN * midAngle);
  const sin = Math.sin(-RADIAN * midAngle);
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + 16) * cos;
  const my = cy + (outerRadius + 16) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  const ey = my;
  const isRight = cos >= 0;
  const boxWidth = 116;
  const boxX = isRight ? ex + 4 : ex - 4 - boxWidth;
  return (
    <g key={entry.name}>
      <path d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`} stroke={entry.color} strokeWidth={1.5} fill="none" />
      <circle cx={sx} cy={sy} r={3} fill={entry.color} stroke="none" />
      <foreignObject x={boxX} y={ey - 18} width={boxWidth} height={36}>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13.5px',
            lineHeight: 1.3,
            color: LIGHT_MUTED,
            direction: 'rtl',
            textAlign: isRight ? 'left' : 'right',
          }}
        >
          {entry.name}
        </div>
      </foreignObject>
    </g>
  );
}

// משפך מצויר ידנית כ-SVG: כל שלב הוא path עם צלעות bezier שמתעגלות פנימה אל השלב הבא,
// כך שכל הרצועות יוצרות מתאר אחיד של משפך רציף ולא מדרגות חדות. לכל שלב יוצא קו-מוביל
// אל שם השלב עצמו (לא אחוז) - כל שלב "מספר את עצמו" בטקסט, כמו שהתבקש.
function CurvedFunnel({ stages }) {
  const stageHeight = 60;
  const height = stages.length * stageHeight;
  const width = 480;
  const cx = 358;
  const maxWidth = 220;
  const minBottomWidth = 44;
  const labelLineEndX = 228;
  const labelBoxX = 6;
  const labelBoxWidth = labelLineEndX - labelBoxX - 8;

  const widths = stages.map((s) => (s.value / stages[0].value) * maxWidth);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
      {stages.map((stage, i) => {
        const yTop = i * stageHeight;
        const yBottom = yTop + stageHeight;
        const yMid = yTop + stageHeight / 2;
        const topW = widths[i];
        const bottomW = i === stages.length - 1 ? minBottomWidth : widths[i + 1];
        const topLeft = cx - topW / 2;
        const topRight = cx + topW / 2;
        const bottomLeft = cx - bottomW / 2;
        const bottomRight = cx + bottomW / 2;
        const leadStartX = cx - (topW + bottomW) / 4;
        const d = `M ${topLeft} ${yTop} C ${topLeft} ${yMid}, ${bottomLeft} ${yMid}, ${bottomLeft} ${yBottom} L ${bottomRight} ${yBottom} C ${bottomRight} ${yMid}, ${topRight} ${yMid}, ${topRight} ${yTop} Z`;
        return (
          <g key={stage.name}>
            <path d={d} fill={stage.color} stroke="rgba(255,255,255,.45)" strokeWidth={i === 0 ? 0 : 1} />
            <line x1={leadStartX} y1={yMid} x2={labelLineEndX} y2={yMid} stroke={stage.color} strokeWidth={1.4} />
            <circle cx={leadStartX} cy={yMid} r={3} fill={stage.color} />
            <foreignObject x={labelBoxX} y={yMid - 22} width={labelBoxWidth} height={44}>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  lineHeight: 1.3,
                  color: LIGHT_MUTED,
                  textAlign: 'right',
                  direction: 'rtl',
                }}
              >
                {stage.name}
              </div>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
}

export default function HeroDashboard() {
  return (
    <div
      className="hero-dashboard-shell"
      style={{
        position: 'relative',
        width: 'clamp(320px, 96vw, 1380px)',
        background: 'linear-gradient(155deg, rgba(20,33,61,.5) 0%, rgba(11,20,38,.55) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1.5px solid var(--color-gold)',
        borderRadius: '22px',
        boxShadow: '0 30px 70px rgba(7,13,26,.5)',
        padding: '14px',
      }}
    >
      <div className="hero-dashboard-row">
        <div style={cardStyle}>
          <div style={titleStyle}>ענף שלם: כמה מסגרות, כמה פעוטות</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <div>
              <div style={{ ...numberFont, fontWeight: 700, fontSize: 'clamp(32px,4vw,44px)', color: LIGHT_TEXT, lineHeight: 1 }}>3,466</div>
              <div style={{ width: '28px', height: '3px', background: GOLD, margin: '8px 0' }} />
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: LIGHT_TEXT }}>משפחתונים מוכרים לסבסוד בישראל</div>
            </div>

            <div style={{ borderTop: `1px solid ${LIGHT_GRID}` }} />

            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: LIGHT_TEXT }}>כ-16,000 פעוטות בשני מסלולים</span>
                <span style={{ ...numberFont, fontSize: '15px', fontWeight: 700, color: GOLD }}>16,000</span>
              </div>
              <div style={{ height: '160px', direction: 'ltr' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={toddlersStacked} layout="vertical" margin={{ top: 6, right: 36, bottom: 6, left: 0 }}>
                    <CartesianGrid stroke={LIGHT_GRID} horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12, fill: LIGHT_MUTED, fontFamily: 'var(--font-mono)' }} axisLine={{ stroke: LIGHT_GRID }} tickLine={false} />
                    <Bar dataKey={TRACK_A} stackId="a" fill={TEAL} barSize={36}>
                      <LabelList dataKey={TRACK_A} position="insideRight" formatter={(v) => v.toLocaleString('he-IL')} style={{ fontSize: 13, fill: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 700 }} />
                    </Bar>
                    <Bar dataKey={TRACK_B} stackId="a" fill={BRONZE} radius={[0, 4, 4, 0]} barSize={36}>
                      <LabelList dataKey={TRACK_B} position="insideRight" formatter={(v) => v.toLocaleString('he-IL')} style={{ fontSize: 13, fill: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 700 }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', gap: '14px', marginTop: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: LIGHT_MUTED }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '1px', background: TEAL }} /> מסלול {TRACK_A}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: LIGHT_MUTED }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '1px', background: BRONZE }} /> מסלול {TRACK_B}
                </span>
              </div>
            </div>
          </div>
          <div style={sourceStyle}>נתוני תשפ״ד 2023/24, לוח 5, מרכז המחקר והמידע של הכנסת</div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>סמל הוא לא רק אישור — הוא שער למערכת שלמה</div>
          <div style={{ position: 'relative', height: '280px', direction: 'ltr' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  innerRadius="34%"
                  outerRadius="46%"
                  paddingAngle={2.5}
                  stroke="none"
                  isAnimationActive={false}
                  label={renderDonutCallout}
                  labelLine={false}
                >
                  {donutData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: 700,
                color: LIGHT_TEXT,
                lineHeight: 1.2,
                pointerEvents: 'none',
              }}
            >
              סמל מוכר
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>מהקושי היומיומי — לשינוי מערכתי</div>
          <div style={{ height: '280px', direction: 'ltr' }}>
            <CurvedFunnel stages={funnelData} />
          </div>
        </div>
      </div>
    </div>
  );
}
