-- תיקון: ציטוט הטסטימוניאל בסיד היה דומה מדי לציטוט בהצהרת המשימה ונראה כשגיאת שכפול.
update site_content
set value = '{"items": [
  {"quote": "ההכשרות של האיגוד שינו לי את העבודה היומיומית עם הילדים.", "authorName": "שם החברה", "authorRole": "ישוב"},
  {"quote": "תמיד יש מישהו לפנות אליו כשיש בעיה עם ההורים או הרשות.", "authorName": "שם החברה", "authorRole": "ישוב"}
]}'::jsonb
where key = 'testimonials';
