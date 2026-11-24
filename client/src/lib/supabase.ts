import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Resolve environment variables from multiple standard names across Vite & Vercel
const sanitizeEnv = (val: unknown): string => {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/^["']|["']$/g, '');
};

const getEnv = (keys: string[]): string => {
  for (const key of keys) {
    // Check Vite's import.meta.env
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      const metaVal = sanitizeEnv((import.meta.env as Record<string, unknown>)[key]);
      if (metaVal) return metaVal;
    }

    // Check process.env if available (defined in vite.config or node runtime)
    const globalProcess = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process;
    if (globalProcess?.env) {
      const procVal = sanitizeEnv(globalProcess.env[key]);
      if (procVal) return procVal;
    }
  }
  return '';
};

export const supabaseUrl = getEnv([
  'VITE_SUPABASE_URL',
  'SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
]);

export const supabaseKey = getEnv([
  'VITE_SUPABASE_PUBLISHABLE_KEY',
  'VITE_SUPABASE_ANON_KEY',
  'SUPABASE_ANON_KEY',
  'SUPABASE_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
]);

const placeholderValues = new Set([
  'https://your-project-id.supabase.co',
  'your-anon-key',
  'your-supabase-anon-key-here',
  'your-publishable-key',
  'your-supabase-publishable-key-here',
]);

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !placeholderValues.has(supabaseUrl) &&
  !placeholderValues.has(supabaseKey) &&
  supabaseUrl.startsWith('http')
);

let supabaseInstance: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch (error) {
    console.error('[Supabase] Failed to initialize Supabase client:', error);
  }
} else {
  console.warn(
    '[Supabase] Supabase credentials missing or invalid. Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY / VITE_SUPABASE_PUBLISHABLE_KEY.'
  );
}

export const supabase = supabaseInstance;
