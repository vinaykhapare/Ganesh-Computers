# Ganesh Computers & Accessories — Production Deployment Guide

This guide details the step-by-step procedure for deploying **Ganesh Computers & Accessories** to **Supabase** (Database, Storage, Authentication) and **Vercel** (Frontend).

---

## 1. Supabase Backend Setup

### Step 1.1: Create Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Click **"New Project"**.
3. Choose your organization, set the project name to `ganesh-computers`, choose a secure database password, and select your closest AWS region (e.g. `ap-south-1` Mumbai).
4. Wait 1–2 minutes for the database to provision.

### Step 1.2: Run Master Database Schema & Indexes
1. In the Supabase Dashboard left menu, open **SQL Editor**.
2. Click **"New Query"**.
3. Copy the entire contents of [supabase/schema.sql](file:///d:/My%20Projects/Ganesh%20Computers/supabase/schema.sql) and paste into the editor.
4. Click **"Run"**.
   - This creates the `products` table, UUID generator, search indexes, and the automatic `updated_at` trigger function.

### Step 1.3: Enable Row Level Security (RLS) Policies
1. In the **SQL Editor**, open another query tab.
2. Copy the contents of [supabase/rls_policies.sql](file:///d:/My%20Projects/Ganesh%20Computers/supabase/rls_policies.sql).
3. Click **"Run"**.
   - Public visitors receive read-only (`SELECT`) permissions.
   - Insert, Update, and Delete actions are locked strictly to `authenticated` administrator accounts.

### Step 1.4: Configure Storage Bucket & Storage Policies
1. In the **SQL Editor**, open another query tab.
2. Copy the contents of [supabase/storage_setup.sql](file:///d:/My%20Projects/Ganesh%20Computers/supabase/storage_setup.sql).
3. Click **"Run"**.
   - Creates the public `product-images` bucket.
   - Enables public read access for catalog visitors.
   - Restricts image upload/modification privileges to logged-in admins.

### Step 1.5: Seed Initial Hardware Catalog Data (Optional but Recommended)
1. In the **SQL Editor**, open another query tab.
2. Copy the contents of [supabase/seed_data.sql](file:///d:/My%20Projects/Ganesh%20Computers/supabase/seed_data.sql).
3. Click **"Run"**.
   - Populates your catalog with top laptops, custom RTX rigs, components, monitors, and accessories.

### Step 1.6: Configure Admin-Only Authentication
1. Go to **Authentication** -> **Providers** -> **Email**.
   - Ensure "Enable Email provider" is **ON**.
   - Disable "Confirm email" for instant admin login.
2. Go to **Authentication** -> **Settings**.
   - **Crucial Security Step**: Toggle **OFF "Enable Signups"** so random visitors cannot register accounts.
3. Go to **Authentication** -> **Users** -> Click **"Add User"** -> **"Create User"**:
   - Email: `admin@ganeshcomputers.com`
   - Password: Enter your secure admin password (minimum 12 characters).
   - Auto Confirm User: Checked.
   - Click **"Create User"**.

### Step 1.7: Copy API Credentials
1. Go to **Project Settings** -> **API**.
2. Copy:
   - **Project URL** (e.g. `https://xyzcompany.supabase.co`)
   - **Project API Anon Key** (e.g. `eyJhbGciOi...`)

---

## 2. Frontend Configuration & Local Testing

1. Open `client/.env` and insert your credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-actual-publishable-key
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
VITE_WHATSAPP_PHONE=+919876543210
```
2. Test local build:
```bash
cd client
npm run build
```

---

## 3. Deployment to Vercel

### Option A: Via GitHub & Vercel Dashboard (Recommended)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Log in to [Vercel](https://vercel.com).
3. Click **"Add New..."** -> **"Project"**.
4. Import your repository.
5. In **Build and Output Settings**:
   - **Root Directory**: Select `client` (or click "Edit" and choose the `client` directory).
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: (Your Supabase project URL)
   - `VITE_SUPABASE_ANON_KEY`: (Your Supabase public anon key)
   - `VITE_WHATSAPP_PHONE`: (Store WhatsApp number, e.g. `+919876543210`)
7. Click **"Deploy"**.
8. Once deployed, add your Vercel production domain into **Supabase Dashboard** -> **Authentication** -> **URL Configuration** -> **Redirect URLs**:
   - `https://your-project.vercel.app/admin/dashboard`
   - `https://your-project.vercel.app/admin/login`

### Option B: Via Vercel CLI
```bash
cd client
npx vercel
# Follow prompts, set Root Directory to ./ and add environment variables
```

---

## 4. Single-Page Application (SPA) Routing Verification
The provided `client/vercel.json` already contains rewrite rules:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This ensures direct URLs (such as `/products/dell-xps-15-9530-creator-laptop` or `/admin/dashboard`) route seamlessly to React Router without 404 errors.
