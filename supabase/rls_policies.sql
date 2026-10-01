-- ==============================================================================
-- GANESH COMPUTERS & ACCESSORIES - ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Strict Zero-Trust Architecture:
-- 1. Anonymous Public Users: Read-only access to products.
-- 2. Authenticated Admin: Full CRUD access to products.
-- 3. No public insertion, modification, or deletion allowed.
-- ==============================================================================

-- Ensure RLS is active on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Policy 1: SELECT (Public Read-Only)
-- Allows any visitor (anonymous or authenticated) to view all products in the catalog
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
CREATE POLICY "Allow public read access to products"
ON public.products
FOR SELECT
TO public
USING (true);

-- ------------------------------------------------------------------------------
-- Policy 2: INSERT (Admin Only)
-- Allows only authenticated administrators to create new catalog entries
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated admin to insert products" ON public.products;
CREATE POLICY "Allow authenticated admin to insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- Policy 3: UPDATE (Admin Only)
-- Allows only authenticated administrators to edit products, prices, stock, images
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated admin to update products" ON public.products;
CREATE POLICY "Allow authenticated admin to update products"
ON public.products
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- Policy 4: DELETE (Admin Only)
-- Allows only authenticated administrators to remove products from catalog
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated admin to delete products" ON public.products;
CREATE POLICY "Allow authenticated admin to delete products"
ON public.products
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');
