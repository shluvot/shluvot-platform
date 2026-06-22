import { supabase } from './supabaseClient';

export async function createRegistrant(registrant) {
  // אנון אין לו SELECT policy בכוונה (v1: אין לנרשם גישת קריאה אפילו לרשומה של עצמו - ראו §9 בתוכנית ל-Phase 2).
  // לכן לא ניתן לבקש .select() בחזרה על insert - זה דורש מדיניות SELECT וייכשל ב-RLS גם אם ה-INSERT עצמו מותר.
  // פותרים ע"י יצירת ה-id בצד הלקוח ושליחתו במפורש, כך שלא צריך לקרוא את השורה בחזרה כדי לדעת אותו.
  const id = crypto.randomUUID();
  const { error } = await supabase.from('registrants').insert({ id, ...registrant });
  if (error) throw error;
  return { id, ...registrant };
}

export async function getRegistrants({ search = '', status = null } = {}) {
  let query = supabase.from('registrants').select('*, payments(*)').order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function updateRegistrant(id, patch) {
  const { data, error } = await supabase.from('registrants').update(patch).eq('id', id).select().single();
  if (error) throw error;
  return data;
}
