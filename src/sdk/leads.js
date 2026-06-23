import { supabase } from './supabaseClient';

export async function createLead(lead) {
  // אנון ללא SELECT policy על leads (ראו registrants.js) - יוצרים id בצד הלקוח ולא מבקשים .select() בחזרה.
  const id = crypto.randomUUID();
  const { error } = await supabase.from('leads').insert({ id, ...lead });
  if (error) throw error;
  return { id, ...lead };
}

export async function getLeads() {
  const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}
