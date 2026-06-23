-- שלובות: עיצוב חדש (Claude Design handoff) - דף אחד מלא.
-- טבלת leads לטופס "השאירו פרטים" בסקשן יצירת קשר (נפרד מ-registrants/payments).
create table leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  region text,
  message text,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

create policy "anyone can submit a lead" on leads
  for insert to public
  with check (true);

create policy "staff can read leads" on leads
  for select to authenticated
  using (true);

-- עדכון תוכן הבלוקים לפי העיצוב החדש.
update site_content set value = '{
  "eyebrow": "איגוד מטפלות המשפחתונים",
  "title": "שלובות",
  "subtitle": "אנחנו כאן כדי לחזק, לייצג וללוות אתכן — מהיום הראשון של המשפחתון ולאורך כל הדרך. הכשרה, זכויות, קהילה וגב מקצועי במקום אחד.",
  "ctaLabel": "הצטרפו לאיגוד",
  "secondaryCtaLabel": "מה זה משפחתון?",
  "badges": ["ליווי מקצועי", "הכשרות והשתלמויות", "קהילה ארצית"]
}'::jsonb where key = 'hero';

update site_content set value = '{
  "label": "מי אנחנו",
  "heading": "משפחתון הוא בית.\nאנחנו הבית של מי שמנהלת אותו.",
  "body": "משפחתון הוא מסגרת חינוכית חמה ואינטימית לפעוטות, המנוהלת בידי מטפלת מקצועית בביתה. שלובות הוא האיגוד שמאחד את המטפלות — ודואג שלא תהיו לבד.\nאנחנו מספקות ליווי מקצועי, הכשרות, ייעוץ וייצוג מול הרשויות — כדי שתוכלו להתמקד במה שחשוב באמת: הילדים."
}'::jsonb where key = 'about_page';

update site_content set value = '{"items": [
  {"label": "מטפלות חברות", "value": "3,200+"},
  {"label": "שנות פעילות", "value": "18"},
  {"label": "שביעות רצון חברות", "value": "95%"},
  {"label": "אזורי פעילות בארץ", "value": "40"}
]}'::jsonb where key = 'stats';

update site_content set value = '{
  "label": "למה להצטרף",
  "heading": "יתרונות החברות באיגוד",
  "items": [
    {"title": "ליווי מקצועי והכשרות", "body": "השתלמויות, ימי עיון וייעוץ פדגוגי שוטף — כדי שתמשיכו לצמוח כל הזמן."},
    {"title": "ייעוץ וייצוג משפטי", "body": "גב משפטי מול רשויות, רגולציה והורים — שתדעו שאתן מוגנות."},
    {"title": "זכויות וביטוח", "body": "הסדרי ביטוח, מידע על זכויות והטבות בלעדיות לחברות האיגוד."},
    {"title": "קהילה ורשת תמיכה", "body": "מפגשים, קבוצות ושיתוף ידע עם מטפלות מכל הארץ — לא לבד."},
    {"title": "ייצוג מול הרשויות", "body": "קול חזק ומאוחד מול משרדי הממשלה — בשבילכן ובשביל המקצוע."},
    {"title": "כלים פדגוגיים", "body": "מערכים, חומרים ומאגר ידע מקצועי שמחכים לכן באזור האישי."}
  ]
}'::jsonb where key = 'value_props';

update site_content set value = '{
  "label": "בואו נדבר",
  "heading": "מצטרפות לשלובות?",
  "body": "השאירו פרטים ונחזור אליכן עם כל המידע על ההצטרפות, ההטבות והליווי. בלי התחייבות.",
  "phone": "1-800-000-000",
  "email": "hello@shluvot.org.il"
}'::jsonb where key = 'contact_page';
