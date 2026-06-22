export function validateStep(step, values) {
  const errors = {};

  if (step === 0) {
    if (!values.fullName?.trim()) errors.fullName = 'שדה חובה';
    if (!values.email?.trim()) errors.email = 'שדה חובה';
    if (!values.phone?.trim()) errors.phone = 'שדה חובה';
  }

  if (step === 1) {
    if (!values.address?.trim()) errors.address = 'שדה חובה';
    if (!values.city?.trim()) errors.city = 'שדה חובה';
  }

  return errors;
}

export const STEP_COUNT = 3;
