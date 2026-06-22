import { supabase } from './supabaseClient';

export async function getPublishedArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getArticleBySlug(slug) {
  const { data, error } = await supabase.from('articles').select('*').eq('slug', slug).eq('published', true).single();
  if (error) throw error;
  return data;
}

export async function getAllArticlesForStaff() {
  const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createArticle(article) {
  const { data, error } = await supabase.from('articles').insert(article).select().single();
  if (error) throw error;
  return data;
}

export async function updateArticle(id, patch) {
  const { data, error } = await supabase.from('articles').update(patch).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteArticle(id) {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;
}
