import { createClient } from 'jsr:@supabase/supabase-js@2';

// היחיד שמייצר קליינט עם service_role - בודק את ה-RLS ל-payments/audit, לא חשוף לדפדפן.
export function createServiceClient() {
  return createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
}
