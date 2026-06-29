// איורי SVG סטטיים לקרוסלת ה-hero - עיצוב דקורטיבי, לא תוכן ניהולי (אין סיבה שצוות יערוך וקטור גרפי).
//
// HERO_FRAMES_LEGACY: הסט המקורי (דמויות מצוירות) - הלקוח חש שזה "ילדותי" ולא משדר
// ביטחון/עוצמה למטפלות. נשמר כאן בכוונה (לא נמחק) למקרה שנרצה לחזור אליו בעתיד.
// HERO_FRAMES: הסט הפעיל הנוכחי - לא איורים שטוחים/"מצוירים" אלא טקסטורת רקע כהה
// (גרדיאנט + גרין דק) עם איקון קו-דק זהב צף עליה, בסגנון "פוטוגרפי/פרימיום" קרוב
// יותר לצילום עמום מאשר לציור, על בסיס המשמעות של הכיתוב (caption) שמשויך לכל פריים.
// פריים 4 חוזר בכוונה על פריים 0 (אותו caption בדיוק) - כדי שאיפוס הלופ בקרוסלה ייראה רציף.
const panelShell = (icon) => (
  <>
    <defs>
      <radialGradient id="navyGlow" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#1B2F52" />
        <stop offset="55%" stopColor="#0F1B33" />
        <stop offset="100%" stopColor="#070D1A" />
      </radialGradient>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
      </filter>
    </defs>
    <rect width="348" height="454" fill="url(#navyGlow)" />
    <rect width="348" height="454" filter="url(#grain)" />
    <circle cx="174" cy="234" r="120" fill="#C9A227" opacity="0.07" />
    <circle cx="62" cy="64" r="2.5" fill="#C9A227" opacity="0.5" />
    <circle cx="104" cy="44" r="1.8" fill="#C9A227" opacity="0.4" />
    <circle cx="298" cy="80" r="2" fill="#C9A227" opacity="0.45" />
    <circle cx="280" cy="384" r="1.8" fill="#C9A227" opacity="0.35" />
    <circle cx="50" cy="394" r="2" fill="#C9A227" opacity="0.4" />

    {icon}
  </>
);

const photoFrame = (src, alt) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(15,27,51,.1) 0%, rgba(15,27,51,.65) 100%)',
      }}
    />
  </div>
);

// לא בשימוש כרגע (פריימים 0/4 הוחלפו לתמונת guideyou.png האמיתית) - נשמר למקרה שנרצה לחזור לאיקון.
export const compassIcon = (
  <g key="compass" fill="none" stroke="#C9A227" strokeWidth="2">
    <circle cx="174" cy="234" r="86" strokeOpacity="0.7" />
    <g strokeWidth="2.5" strokeLinecap="round">
      <line x1="174" y1="130" x2="174" y2="150" />
      <line x1="174" y1="318" x2="174" y2="338" />
      <line x1="62" y1="234" x2="82" y2="234" />
      <line x1="266" y1="234" x2="286" y2="234" />
    </g>
    <polygon points="174,178 188,234 174,222 160,234" fill="#C9A227" stroke="none" />
    <polygon points="174,290 188,234 174,246 160,234" fill="none" stroke="#C9A227" strokeWidth="2" />
    <circle cx="174" cy="234" r="5" fill="#C9A227" stroke="none" />
  </g>
);

// לא בשימוש כרגע (פריים 1 הוחלף לתמונת allcountry.png האמיתית) - נשמר למקרה שנרצה לחזור לאיקון.
export const linkedRingsIcon = (
  <g key="rings" fill="none" stroke="#C9A227" strokeWidth="3">
    <circle cx="134" cy="234" r="46" />
    <circle cx="174" cy="234" r="46" />
    <circle cx="214" cy="234" r="46" />
  </g>
);

// לא בשימוש כרגע (פריים 2 הוחלף לתמונת learn.png האמיתית) - נשמר למקרה שנרצה לחזור לאיקון.
export const openBookIcon = (
  <g key="book">
    <g fill="none" stroke="#C9A227" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M174 190 L174 288" />
      <path d="M174 190 Q108 174 84 194 L84 276 Q108 258 174 274" />
      <path d="M174 190 Q240 174 264 194 L264 276 Q240 258 174 274" />
    </g>
    <g stroke="#C9A227" strokeWidth="1.5" strokeOpacity="0.65" strokeLinecap="round">
      <line x1="102" y1="216" x2="152" y2="223" />
      <line x1="102" y1="236" x2="152" y2="241" />
      <line x1="102" y1="256" x2="152" y2="259" />
      <line x1="196" y1="223" x2="246" y2="216" />
      <line x1="196" y1="241" x2="246" y2="236" />
      <line x1="196" y1="259" x2="246" y2="256" />
    </g>
  </g>
);

const institutionIcon = (
  <g key="institution" fill="none" stroke="#C9A227">
    <polyline points="120,210 174,172 228,210" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="108" y1="210" x2="240" y2="210" strokeWidth="2" />
    <g strokeWidth="2.5" strokeLinecap="round">
      <line x1="130" y1="220" x2="130" y2="290" />
      <line x1="156" y1="220" x2="156" y2="290" />
      <line x1="192" y1="220" x2="192" y2="290" />
      <line x1="218" y1="220" x2="218" y2="290" />
    </g>
    <line x1="108" y1="298" x2="240" y2="298" strokeWidth="2.5" strokeLinecap="round" />
  </g>
);

export const HERO_FRAMES = [
  <div key="0" style={{ width: '100%', height: '100%' }}>
    {photoFrame('/guideyou.png', 'ליווי חם לכל אורך הדרך')}
  </div>,
  <div key="1" style={{ width: '100%', height: '100%' }}>
    {photoFrame('/allcountry.png', 'קהילה ארצית של מטפלות, מחוברות זו לזו בכל הארץ')}
  </div>,
  <div key="2" style={{ width: '100%', height: '100%' }}>
    {photoFrame('/learn.png', 'הכשרות וכלים פדגוגיים')}
  </div>,
  <svg key="3" viewBox="0 0 348 454" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
    {panelShell(institutionIcon)}
  </svg>,
  <div key="4" style={{ width: '100%', height: '100%' }}>
    {photoFrame('/guideyou.png', 'ליווי חם לכל אורך הדרך')}
  </div>,
];

export const HERO_CAPTIONS = [
  'ליווי חם לכל אורך הדרך',
  'קהילה ארצית של מטפלות',
  'הכשרות וכלים פדגוגיים',
  'הבית המקצועי שלכן',
  'ליווי חם לכל אורך הדרך',
];

export const HERO_FRAMES_LEGACY = [
  <svg key="0" viewBox="0 0 348 454" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
    <rect width="348" height="454" fill="#BFE0F2" />
    <circle cx="290" cy="82" r="33" fill="#E9A93C" />
    <circle cx="62" cy="64" r="7" fill="#FFFFFF" opacity="0.65" />
    <circle cx="104" cy="44" r="4.5" fill="#FFFFFF" opacity="0.55" />
    <circle cx="298" cy="168" r="5.5" fill="#FFFFFF" opacity="0.55" />
    <circle cx="174" cy="244" r="124" fill="#FFFFFF" opacity="0.18" />
    <path d="M100 454 Q100 244 174 240 Q248 244 248 454 Z" fill="#E86A4E" />
    <circle cx="174" cy="200" r="42" fill="#2A1E3E" />
    <circle cx="174" cy="208" r="37" fill="#F1D9C2" />
    <circle cx="162" cy="208" r="3.2" fill="#3A2E26" />
    <circle cx="186" cy="208" r="3.2" fill="#3A2E26" />
    <circle cx="156" cy="220" r="5" fill="#E86A4E" opacity="0.45" />
    <circle cx="192" cy="220" r="5" fill="#E86A4E" opacity="0.45" />
    <path d="M60 454 Q60 348 100 345 Q140 348 140 454 Z" fill="#E9A93C" />
    <circle cx="100" cy="328" r="25" fill="#2A1E3E" />
    <circle cx="100" cy="334" r="21" fill="#F1D9C2" />
    <circle cx="93" cy="334" r="2.4" fill="#3A2E26" />
    <circle cx="107" cy="334" r="2.4" fill="#3A2E26" />
    <path d="M210 454 Q210 354 248 351 Q286 354 286 454 Z" fill="#F6EFE3" />
    <circle cx="248" cy="338" r="23" fill="#6b4a30" />
    <circle cx="248" cy="344" r="19" fill="#F1D9C2" />
    <circle cx="242" cy="344" r="2.2" fill="#3A2E26" />
    <circle cx="255" cy="344" r="2.2" fill="#3A2E26" />
  </svg>,
  <svg key="1" viewBox="0 0 348 454" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
    <rect width="348" height="454" fill="#BFE0F2" />
    <circle cx="288" cy="78" r="30" fill="#E9A93C" />
    <circle cx="60" cy="60" r="6" fill="#FFFFFF" opacity="0.55" />
    <circle cx="300" cy="150" r="5" fill="#FFFFFF" opacity="0.55" />
    <circle cx="174" cy="250" r="122" fill="#FFFFFF" opacity="0.18" />
    <rect x="0" y="404" width="348" height="50" fill="#FFE3D1" />
    <path d="M40 454 Q40 372 74 369 Q108 372 108 454 Z" fill="#E86A4E" />
    <circle cx="74" cy="350" r="24" fill="#2A1E3E" />
    <circle cx="74" cy="356" r="20" fill="#F1D9C2" />
    <circle cx="68" cy="356" r="2.3" fill="#3A2E26" />
    <circle cx="80" cy="356" r="2.3" fill="#3A2E26" />
    <path d="M112 454 Q112 376 144 373 Q176 376 176 454 Z" fill="#9B7BD4" />
    <circle cx="144" cy="354" r="24" fill="#6b4a30" />
    <circle cx="144" cy="360" r="20" fill="#F1D9C2" />
    <circle cx="138" cy="360" r="2.3" fill="#3A2E26" />
    <circle cx="150" cy="360" r="2.3" fill="#3A2E26" />
    <path d="M180 454 Q180 372 212 369 Q244 372 244 454 Z" fill="#E9A93C" />
    <circle cx="212" cy="350" r="24" fill="#2A1E3E" />
    <circle cx="212" cy="356" r="20" fill="#F1D9C2" />
    <circle cx="206" cy="356" r="2.3" fill="#3A2E26" />
    <circle cx="218" cy="356" r="2.3" fill="#3A2E26" />
    <path d="M248 454 Q248 376 280 373 Q312 376 312 454 Z" fill="#F6EFE3" />
    <circle cx="280" cy="354" r="24" fill="#6b4a30" />
    <circle cx="280" cy="360" r="20" fill="#F1D9C2" />
    <circle cx="274" cy="360" r="2.3" fill="#3A2E26" />
    <circle cx="286" cy="360" r="2.3" fill="#3A2E26" />
  </svg>,
  <svg key="2" viewBox="0 0 348 454" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
    <rect width="348" height="454" fill="#BFE0F2" />
    <circle cx="288" cy="80" r="30" fill="#E9A93C" />
    <circle cx="60" cy="64" r="6" fill="#FFFFFF" opacity="0.55" />
    <circle cx="300" cy="160" r="5" fill="#FFFFFF" opacity="0.55" />
    <circle cx="174" cy="246" r="122" fill="#FFFFFF" opacity="0.18" />
    <path d="M120 454 Q120 300 174 296 Q228 300 228 454 Z" fill="#E86A4E" />
    <circle cx="174" cy="252" r="40" fill="#2A1E3E" />
    <circle cx="174" cy="260" r="35" fill="#F1D9C2" />
    <circle cx="162" cy="260" r="3" fill="#3A2E26" />
    <circle cx="186" cy="260" r="3" fill="#3A2E26" />
    <circle cx="156" cy="272" r="4.5" fill="#E86A4E" opacity="0.45" />
    <circle cx="192" cy="272" r="4.5" fill="#E86A4E" opacity="0.45" />
    <rect x="44" y="392" width="32" height="32" rx="5" fill="#E9A93C" />
    <rect x="44" y="356" width="32" height="32" rx="5" fill="#9B7BD4" />
    <rect x="96" y="402" width="156" height="48" rx="7" fill="#F6EFE3" />
    <rect x="170" y="402" width="6" height="48" fill="#BFE0F2" />
    <rect x="112" y="416" width="44" height="5" rx="2" fill="#cdbfae" />
    <rect x="190" y="416" width="44" height="5" rx="2" fill="#cdbfae" />
    <rect x="112" y="430" width="44" height="5" rx="2" fill="#cdbfae" />
    <rect x="190" y="430" width="44" height="5" rx="2" fill="#cdbfae" />
  </svg>,
  <svg key="3" viewBox="0 0 348 454" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
    <rect width="348" height="454" fill="#BFE0F2" />
    <circle cx="292" cy="76" r="30" fill="#E9A93C" />
    <circle cx="58" cy="60" r="6" fill="#FFFFFF" opacity="0.55" />
    <circle cx="300" cy="150" r="5" fill="#FFFFFF" opacity="0.55" />
    <rect x="0" y="392" width="348" height="62" fill="#FFE3D1" />
    <rect x="54" y="300" width="13" height="92" rx="6" fill="#7a5a3c" />
    <circle cx="60" cy="292" r="40" fill="#3F8F6E" />
    <polygon points="120,206 200,128 280,206" fill="#E86A4E" />
    <rect x="134" y="206" width="132" height="186" rx="8" fill="#F6EFE3" />
    <rect x="182" y="300" width="42" height="92" rx="6" fill="#E9A93C" />
    <circle cx="156" cy="250" r="16" fill="#BFE0F2" />
    <circle cx="250" cy="330" r="15" fill="#F1D9C2" />
    <path d="M232 392 Q232 348 250 346 Q268 348 268 392 Z" fill="#9B7BD4" />
    <circle cx="296" cy="344" r="12" fill="#F1D9C2" />
    <path d="M282 392 Q282 356 296 354 Q310 356 310 392 Z" fill="#E9A93C" />
  </svg>,
  <svg key="4" viewBox="0 0 348 454" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
    <rect width="348" height="454" fill="#BFE0F2" />
    <circle cx="290" cy="82" r="33" fill="#E9A93C" />
    <circle cx="62" cy="64" r="7" fill="#FFFFFF" opacity="0.65" />
    <circle cx="104" cy="44" r="4.5" fill="#FFFFFF" opacity="0.55" />
    <circle cx="298" cy="168" r="5.5" fill="#FFFFFF" opacity="0.55" />
    <circle cx="174" cy="244" r="124" fill="#FFFFFF" opacity="0.18" />
    <path d="M100 454 Q100 244 174 240 Q248 244 248 454 Z" fill="#E86A4E" />
    <circle cx="174" cy="200" r="42" fill="#2A1E3E" />
    <circle cx="174" cy="208" r="37" fill="#F1D9C2" />
    <circle cx="162" cy="208" r="3.2" fill="#3A2E26" />
    <circle cx="186" cy="208" r="3.2" fill="#3A2E26" />
    <circle cx="156" cy="220" r="5" fill="#E86A4E" opacity="0.45" />
    <circle cx="192" cy="220" r="5" fill="#E86A4E" opacity="0.45" />
    <path d="M60 454 Q60 348 100 345 Q140 348 140 454 Z" fill="#E9A93C" />
    <circle cx="100" cy="328" r="25" fill="#2A1E3E" />
    <circle cx="100" cy="334" r="21" fill="#F1D9C2" />
    <circle cx="93" cy="334" r="2.4" fill="#3A2E26" />
    <circle cx="107" cy="334" r="2.4" fill="#3A2E26" />
    <path d="M210 454 Q210 354 248 351 Q286 354 286 454 Z" fill="#F6EFE3" />
    <circle cx="248" cy="338" r="23" fill="#6b4a30" />
    <circle cx="248" cy="344" r="19" fill="#F1D9C2" />
    <circle cx="242" cy="344" r="2.2" fill="#3A2E26" />
    <circle cx="255" cy="344" r="2.2" fill="#3A2E26" />
  </svg>,
];
