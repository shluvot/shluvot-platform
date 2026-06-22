import { createClient } from '@supabase/supabase-js';

// היחיד בכל האפליקציה שמייבא @supabase/supabase-js.
// כל קוד אחר (containers/actions) חייב לעבור דרך הפונקציות ב-sdk/, לא לקרוא ל-supabase ישירות.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
