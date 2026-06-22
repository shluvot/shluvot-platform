export function slugify(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export function validateArticle({ title, body }) {
  const errors = {};
  if (!title?.trim()) errors.title = 'שדה חובה';
  if (!body?.trim()) errors.body = 'שדה חובה';
  return errors;
}
