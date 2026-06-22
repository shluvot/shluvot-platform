import { supabase } from './supabaseClient';

export async function uploadImage(file) {
  const path = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from('media').upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}
