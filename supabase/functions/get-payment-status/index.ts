// payments חסום ל-anon לחלוטין ב-RLS (רק staff מאומת יכול לקרוא) - מכוון, כדי שאף אחד לא יוכל
// לדפדף את כל טבלת התשלומים עם המפתח הציבורי. נרשם שמחזיק reference (UUID לא ניחושי) בודק את הסטטוס
// שלו עצמו דרך הפונקציה הזו, שמחזירה רק את השדה status - בלי amount/registrant_id/payload גולמי.

import { createServiceClient } from '../_shared/serviceClient.ts';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  const { reference } = await req.json().catch(() => ({}));

  if (!reference) {
    return new Response(JSON.stringify({ error: 'missing reference' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createServiceClient();
  const { data: payment } = await supabase.from('payments').select('status').eq('reference', reference).single();

  if (!payment) {
    return new Response(JSON.stringify({ error: 'payment not found' }), {
      status: 404,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ status: payment.status }), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
});
