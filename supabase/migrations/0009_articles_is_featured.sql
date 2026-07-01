-- הוספת שדה "כתבה מובילה" לטבלת הכתבות.
-- הכתבה המובילה מוצגת גדולה ובולטת בראש סקשן הבלוג בדף הנחיתה.
-- רק כתבה אחת יכולה להיות מובילה בכל זמן נתון - הסדר נאכף בצד הלקוח
-- (הכתבה הראשונה עם is_featured=true מוצגת, שאר הכתבות אחריה).
alter table articles add column if not exists is_featured boolean not null default false;
