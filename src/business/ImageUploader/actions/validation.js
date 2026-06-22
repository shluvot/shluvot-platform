const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export function validateImageFile(file) {
  if (!file.type.startsWith('image/')) return 'יש לבחור קובץ תמונה';
  if (file.size > MAX_SIZE_BYTES) return 'התמונה גדולה מ-5MB';
  return null;
}
