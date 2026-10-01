
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    category VARCHAR(100) NOT NULL,
    image_url TEXT,
    stock_status VARCHAR(50) NOT NULL DEFAULT 'in_stock'
        CHECK (stock_status IN ('in_stock', 'limited_stock', 'out_of_stock')),
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products (featured);
CREATE INDEX IF NOT EXISTS idx_products_stock_status ON public.products (stock_status);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products (price ASC);
CREATE INDEX IF NOT EXISTS idx_products_fts ON public.products
    USING gin(to_tsvector('english'::regconfig, name || ' ' || coalesce(description, '') || ' ' || category));

-- Automatic updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_products_updated_at ON public.products;
CREATE TRIGGER trigger_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- PART 2: ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
CREATE POLICY "Allow public read access to products"
ON public.products
FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin to insert products" ON public.products;
CREATE POLICY "Allow authenticated admin to insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated admin to update products" ON public.products;
CREATE POLICY "Allow authenticated admin to update products"
ON public.products
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated admin to delete products" ON public.products;
CREATE POLICY "Allow authenticated admin to delete products"
ON public.products
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- PART 3: STORAGE SETUP & POLICIES (product-images bucket)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
CREATE POLICY "Admins can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
CREATE POLICY "Admins can update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;
CREATE POLICY "Admins can delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- ------------------------------------------------------------------------------
-- PART 4: CATALOG READY (Real Inventory Mode)
-- ------------------------------------------------------------------------------
-- Database schema, indexes, security policies, and image storage are all active.
-- Add your real store inventory via the Admin Dashboard at:
-- http://localhost:5173/admin/products/new
-- ==============================================================================
