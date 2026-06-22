import { supabase } from './supabaseClient';

export async function createRegistrant(registrant) {
  const { data, error } = await supabase.from('registrants').insert(registrant).select().single();
  if (error) throw error;
  return data;
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
