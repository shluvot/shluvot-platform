export function validateOverride({ status, reason }) {
  const errors = {};
  if (!status) errors.status = 'יש לבחור סטטוס';
  if (!reason || reason.trim().length < 3) errors.reason = 'יש לציין סיבה (לפחות 3 תווים)';
  return errors;
}
