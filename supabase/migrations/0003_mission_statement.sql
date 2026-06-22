-- בלוק תוכן נוסף: הצהרת משימה (בהשראת עיצוב הרפרנס), + eyebrow קצר ל-hero.
insert into site_content (key, value) values
  ('mission_statement', '{"intro": "שלובות הוא עמותה רשומה שמטרתה", "body": "לקדם, לתמוך ולחזק את מעמדן המקצועי של מטפלות במשפחתונים בישראל.", "quote": "האיגוד נתן לי קול שלא היה לי קודם - הרגשתי שיש מי שדואג לי כמטפלת ולא רק כעוד מספר."}')
on conflict (key) do nothing;

update site_content set value = value || '{"eyebrow": "בונות יחד"}'::jsonb where key = 'hero';
