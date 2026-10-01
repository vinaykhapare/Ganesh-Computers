import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

const LOCAL_ADMIN_KEY = 'ganesh_admin_session';

export interface AdminUser {
  id: string;
  email?: string;
  role?: string;
}

export const authService = {
  /**
   * Signs in the administrator using Supabase Authentication.
   * Credentials are authenticated strictly against Supabase Auth.
   */
  async signIn(email: string, password: string): Promise<{ user: User | null; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return {
        user: null,
        error: 'Authentication service is not configured. Please check your Supabase environment settings.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      // Remove any legacy local test session key
      try {
        localStorage.removeItem(LOCAL_ADMIN_KEY);
      } catch {
        // ignore storage errors
      }

      return { user: data.user };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred during authentication.';
      return { user: null, error: message };
    }
  },

  /**
   * Signs out the administrator
   */
  async signOut(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Error during Supabase signout:', err);
      }
    }
    try {
      localStorage.removeItem(LOCAL_ADMIN_KEY);
    } catch {
      // ignore
    }
  },

  /**
   * Retrieves the current active admin session directly from Supabase
   */
  async getInitialSession(): Promise<{ user: User | null; session: Session | null }> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching Supabase session:', error);
          return { user: null, session: null };
        }
        return {
          user: data.session?.user || null,
          session: data.session,
        };
      } catch (err) {
        console.error('Error fetching Supabase session:', err);
      }
    }

    return { user: null, session: null };
  },

  /**
   * Listen to Supabase auth state changes
   */
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    if (isSupabaseConfigured && supabase) {
      return supabase.auth.onAuthStateChange(callback);
    }
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
};