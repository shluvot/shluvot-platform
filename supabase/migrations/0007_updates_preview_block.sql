insert into site_content (key, value) values (
  'updates_preview',
  '{
    "label": "בלוג האיגוד",
    "heading": "מה קורה בשלובות",
    "ctaLabel": "לכל העדכונים"
  }'::jsonb
)
on conflict (key) do update set value = excluded.value;
