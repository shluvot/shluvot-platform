// יוצר reference + שורת payments(status='pending'), ואז מנסה ליצור טרנזקציית iframe בנדרים פלוס.
// !!! TODO-CONFIRM-WITH-NEDARIM-PLUS-SUPPORT !!!
// שמות השדות/ה-endpoint למטה מבוססים על דוגמת אינטגרציה לא-רשמית (ראו §4 בתוכנית), לא תיעוד API מלא.
// כל עוד הסודות NEDARIM_MOSAD_ID/NEDARIM_API_KEY לא מוגדרים - הפונקציה רצה ב"מצב בדיקה" (TEST MODE):
// יוצרת את שורת ה-payment כרגיל אבל מחזירה transactionId מדומה, כדי שאפשר לבדוק את כל הזרימה
// (כולל ה-webhook) לפני שיש קרדנציאלס אמיתיים מהעמותה.

import { createServiceClient } from '../_shared/serviceClient.ts';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// סכומי דמי חבר - חייב להתאים בדיוק לערכים בצד הלקוח (src/components/containers/Registration/actions/registrationActions.js).
// נבדק כאן בשרת כדי שלקוח לא יוכל לשלוח amount_ils שרירותי.
const AMOUNT_BY_CYCLE: Record<string, number> = { monthly: 30, annual: 300 };

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    const { registrant_id, billing_cycle, amount_ils } = await req.json();

    if (!registrant_id || !billing_cycle || !AMOUNT_BY_CYCLE[billing_cycle]) {
      return new Response(JSON.stringify({ error: 'invalid request' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const expectedAmount = AMOUNT_BY_CYCLE[billing_cycle];
    if (Number(amount_ils) !== expectedAmount) {
      return new Response(JSON.stringify({ error: 'amount mismatch' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createServiceClient();
    const reference = crypto.randomUUID();

    const { error: insertError } = await supabase.from('payments').insert({
      registrant_id,
      reference,
      kind: 'recurring_setup',
      amount_ils: expectedAmount,
      billing_cycle,
      status: 'pending',
    });

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const mosadId = Deno.env.get('NEDARIM_MOSAD_ID');
    const apiKey = Deno.env.get('NEDARIM_API_KEY');
    const nedarimBaseUrl = Deno.env.get('NEDARIM_BASE_URL');

    if (!mosadId || !apiKey || !nedarimBaseUrl) {
      // TEST MODE: אין קרדנציאלס אמיתיים עדיין - מדמים את ה-callback של נדרים פלוס בעצמנו
      // (קריאה ל-nedarim-webhook עם payload מדומה) כדי שכל הזרימה תיבדק מקצה לקצה בלי curl ידני.
      const testTransactionId = `TEST-${reference}`;
      try {
        await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/nedarim-webhook`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ param1: reference, status: 'success', TransactionId: testTransactionId }),
        });
      } catch (webhookError) {
        console.error('TEST MODE webhook simulation failed', webhookError);
      }

      return new Response(
        JSON.stringify({ transactionId: testTransactionId, reference, testMode: true }),
        { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
      );
    }

    // TODO-CONFIRM-WITH-NEDARIM-PLUS-SUPPORT: שמות השדות והendpoint המדויקים לא מאומתים.
    const nedarimResponse = await fetch(nedarimBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        MosadId: mosadId,
        ApiValid: apiKey,
        Amount: String(expectedAmount),
        PaymentType: 'HK',
        param1: reference,
        CallBack: `${Deno.env.get('SUPABASE_URL')}/functions/v1/nedarim-webhook`,
      }),
    });

    const nedarimData = await nedarimResponse.json().catch(() => null);
    const transactionId = nedarimData?.TransactionId ?? null;

    return new Response(JSON.stringify({ transactionId, reference, testMode: false }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }
});
