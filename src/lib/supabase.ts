import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url?: string) => {
  if (!url || url.includes('your_supabase_project_url')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const isSupabaseConfigured = Boolean(isValidUrl(rawUrl) && rawAnonKey && !rawAnonKey.includes('your_supabase_anon_key'));

if (!isSupabaseConfigured) {
  console.warn('Supabase URL ou Key está ausente ou inválida no .env. Executando em modo local/demonstração.');
}

const supabaseUrl = isSupabaseConfigured ? (rawUrl as string) : 'https://placeholder.supabase.co';
const supabaseAnonKey = isSupabaseConfigured ? (rawAnonKey as string) : 'placeholder-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

