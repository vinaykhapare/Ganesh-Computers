-- ==============================================================================
-- GANESH COMPUTERS & ACCESSORIES - ADMIN AUTHENTICATION SETUP
-- ==============================================================================
-- Security Model:
-- - Strict Admin-Only System.
-- - No Public Registration / Signups allowed.
-- - Customers NEVER authenticate or hold accounts.
-- - Admin accounts are created strictly by the system administrator.
-- ==============================================================================

/*
HOW TO CONFIGURE SUPABASE AUTH DASHBOARD:
--------------------------------------------------------------------------------
1. Navigate to your Supabase Project Dashboard -> Authentication -> Providers -> Email
2. Ensure "Enable Email provider" is turned ON.
3. Turn OFF "Enable Email Confirmations" if you want instant admin activation.
4. Go to Authentication -> Signers / URL Configuration:
   - Site URL: https://your-domain.vercel.app (or http://localhost:5173 for local dev)
   - Redirect URLs: Add http://localhost:5173/admin/dashboard and https://your-domain.vercel.app/admin/dashboard
5. Go to Authentication -> Settings:
   - Toggle OFF "Enable Signups" (Disable public sign-ups completely so that 
     random visitors cannot create accounts even if they inspect API calls).
6. Create the Admin user:
   Option A (Dashboard):
     - Go to Authentication -> Users -> Add User -> Create User
     - Email: admin@ganeshcomputers.com
     - Password: Choose a strong master password (e.g. at least 12 characters)
     - Auto Confirm: Checked
   Option B (SQL Editor if permitted by project role):
*/

-- Example SQL for creating user in auth.users (if using Supabase self-hosted or migration runner):
-- Note: In Supabase Cloud, creating users via Dashboard -> Authentication -> Users -> "Create User" is the recommended secure approach.

-- Verification query: check that your admin account exists
SELECT id, email, created_at, confirmed_at, role 
FROM auth.users 
WHERE email = 'admin@ganeshcomputers.com';
