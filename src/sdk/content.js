import { supabase } from './supabaseClient';

export async function getAllSiteContent() {
  const { data, error } = await supabase.from('site_content').select('key, value');
  if (error) throw error;
  return Object.fromEntries(data.map((row) => [row.key, row.value]));
}

export async function updateSiteContent(key, value) {
  const { error } = await supabase.from('site_content').update({ value }).eq('key', key);
  if (error) throw error;
}
