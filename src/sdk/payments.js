import { supabase } from './supabaseClient';

export async function createPaymentSession({ registrantId, billingCycle, amountIls }) {
  const { data, error } = await supabase.functions.invoke('create-payment-session', {
    body: { registrant_id: registrantId, billing_cycle: billingCycle, amount_ils: amountIls },
  });
  if (error) throw error;
  return data; // { transactionId, reference }
}

export async function getPaymentByReference(reference) {
  // payments חסום ל-anon ב-RLS בכוונה; הפונקציה הזו עוברת דרך Edge Function עם service_role
  // שמחזירה רק את ה-status, כדי שנרשם יוכל לבדוק את התשלום של עצמו בלי לחשוף את הטבלה כולה.
  const { data, error } = await supabase.functions.invoke('get-payment-status', {
    body: { reference },
  });
  if (error) throw error;
  return data; // { status }
}

export async function overridePaymentStatus(paymentId, { status, reason }) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { data, error } = await supabase
    .from('payments')
    .update({
      status,
      manually_overridden: true,
      manual_override_reason: reason,
      manual_override_by: userData.user.id,
    })
    .eq('id', paymentId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
