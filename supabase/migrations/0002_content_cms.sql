-- שלובות: תוכן ניהולי - בלוקים ניתנים לעריכה (hero/stats/timeline/testimonials/דפי מידע) + כתבות/עדכונים.
-- ראו plan §"כיוון עיצובי-תוכני" לפירוט. כל התוכן הציבורי הזה ייערך מהאדמין.

create table site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null,
  cover_image_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on articles (published, published_at desc);

create trigger set_updated_at_site_content before update on site_content
  for each row execute function set_updated_at();
create trigger set_updated_at_articles before update on articles
  for each row execute function set_updated_at();

alter table site_content enable row level security;
alter table articles enable row level security;

-- site_content: כל מי שמבקר באתר (גם מי שלא מחובר) צריך לראות את התוכן - public select.
-- כתיבה רק לצוות מחובר.
create policy "anyone can read site content" on site_content
  for select to public
  using (true);

create policy "staff can write site content" on site_content
  for insert to authenticated
  with check (true);

create policy "staff can update site content" on site_content
  for update to authenticated
  using (true);

-- articles: הציבור רואה רק כתבות שפורסמו, הצוות רואה ועורך הכל.
create policy "anyone can read published articles" on articles
  for select to public
  using (published = true);

create policy "staff can read all articles" on articles
  for select to authenticated
  using (true);

create policy "staff can write articles" on articles
  for insert to authenticated
  with check (true);

create policy "staff can update articles" on articles
  for update to authenticated
  using (true);

create policy "staff can delete articles" on articles
  for delete to authenticated
  using (true);

-- Storage bucket לתמונות (hero, כתבות) - ציבורי לקריאה, צוות בלבד לכתיבה.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "anyone can view media" on storage.objects
  for select to public
  using (bucket_id = 'media');

create policy "staff can upload media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media');

create policy "staff can update media" on storage.objects
  for update to authenticated
  using (bucket_id = 'media');

create policy "staff can delete media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media');

-- תוכן התחלתי (placeholder) לבלוקים הידועים - הצוות יערוך אותם מהאדמין בהמשך.
insert into site_content (key, value) values
  ('hero', '{"title": "שלובות — איגוד מטפלות במשפחתונים", "subtitle": "קול מקצועי, חם ומאוחד לכל מטפלת במשפחתון בישראל", "ctaLabel": "הרשמה לחברות באיגוד", "heroImageUrl": null}'),
  ('stats', '{"items": [{"label": "חברות באיגוד", "value": "850"}, {"label": "ישובים", "value": "40"}, {"label": "שנות פעילות", "value": "12"}]}'),
  ('value_props', '{"items": [{"title": "קהילה", "body": "מפגשים, הכשרות ושיתוף ידע בין חברות האיגוד."}, {"title": "קול מאוחד", "body": "ייצוג מול הרשויות והגופים המפעילים."}, {"title": "ייעוץ והכוונה", "body": "תמיכה מקצועית וזכויות עבור מטפלות במשפחתונים."}]}'),
  ('timeline', '{"events": [{"year": "2014", "label": "הקמת האיגוד"}, {"year": "2018", "label": "הכרה רשמית"}, {"year": "2022", "label": "הסכם קיבוצי ראשון"}]}'),
  ('testimonials', '{"items": [{"quote": "האיגוד נתן לי קול שלא היה לי קודם.", "authorName": "שם החברה", "authorRole": "ישוב"}]}'),
  ('about_page', '{"body": "שלובות הוא איגוד מקצועי המאחד מטפלות במשפחתונים ברחבי הארץ, ופועל לקידום זכויותיהן, הכשרתן והעצמתן המקצועית."}'),
  ('services_page', '{"body": "פירוט השירותים, ההטבות וההכשרות העומדים לרשות חברות האיגוד."}'),
  ('contact_page', '{"body": "ניתן לפנות אלינו במייל contact@shluvot.co.il"}')
on conflict (key) do nothing;
