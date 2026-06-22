// מקבל callback מנדרים פלוס (או מבדיקת curl ידנית), כותב audit לפני כל לוגיקה,
// ומעדכן payments/registrants על בסיס ה-reference. ראו §4 בתוכנית להסבר המלא.
// !!! TODO-CONFIRM-WITH-NEDARIM-PLUS-SUPPORT !!!
// אין כאן עדיין אימות חתימה/transaction-status מול נדרים פלוס - לפי התוכנית, זה חוסם לפני production
// (ראו "נקודות פתוחות" בתוכנית) - כרגע בוטחים בתוכן ה-payload לצורך בדיקה, וזה מסומן כסיכון שארית.

import { createServiceClient } from '../_shared/serviceClient.ts';

function extractReference(payload: Record<string, unknown>): string | null {
  const candidate = payload.param1 ?? payload.reference ?? payload.Param1;
  return typeof candidate === 'string' ? candidate : null;
}

function extractSuccess(payload: Record<string, unknown>): boolean {
  const status = String(payload.status ?? payload.Status ?? '').toLowerCase();
  return status === 'success' || status === 'paid' || status === 'true';
}

Deno.serve(async (req) => {
  const supabase = createServiceClient();

  let payload: Record<string, unknown> = {};
  if (req.method === 'POST') {
    payload = await req.json().catch(() => ({}));
  } else {
    payload = Object.fromEntries(new URL(req.url).searchParams);
  }

  const headers = Object.fromEntries(req.headers.entries());

  const reference = extractReference(payload);

  // תמיד כותבים audit לפני כל לוגיקה - שום callback לא הולך לאיבוד גם אם הפענוח שגוי.
  const { data: auditRow, error: auditError } = await supabase
    .from('nedarim_webhook_audit')
    .insert({ reference, raw_payload: payload, raw_headers: headers })
    .select()
    .single();

  if (auditError) {
    console.error('failed to write audit row', auditError);
  }

  if (!reference) {
    if (auditRow) {
      await supabase
        .from('nedarim_webhook_audit')
        .update({ processing_error: 'missing reference' })
        .eq('id', auditRow.id);
    }
    return new Response('OK', { status: 200 });
  }

  const { data: payment } = await supabase.from('payments').select('*').eq('reference', reference).single();

  if (!payment) {
    if (auditRow) {
      await supabase
        .from('nedarim_webhook_audit')
        .update({ processing_error: `no payment found for reference ${reference}` })
        .eq('id', auditRow.id);
    }
    return new Response('OK', { status: 200 });
  }

  const success = extractSuccess(payload);
  const newStatus = success ? 'paid' : 'failed';

  await supabase
    .from('payments')
    .update({
      status: newStatus,
      paid_at: success ? new Date().toISOString() : null,
      nedarim_transaction_id: String(payload.TransactionId ?? payload.transactionId ?? ''),
      nedarim_raw_payload: payload,
    })
    .eq('id', payment.id);

  if (success) {
    await supabase.from('registrants').update({ status: 'active' }).eq('id', payment.registrant_id);
  }

  if (auditRow) {
    await supabase.from('nedarim_webhook_audit').update({ processed: true }).eq('id', auditRow.id);
  }

  return new Response('OK', { status: 200 });
});
