import { sdk } from '../../../../sdk';

// v1: סטטוס התשלום מנוהל ב-useState מקומי בקונטיינר, לא ב-Redux (state חד-פעמי, לא משותף).
export async function fetchPaymentStatus(reference) {
  return sdk.payments.getPaymentByReference(reference);
}
