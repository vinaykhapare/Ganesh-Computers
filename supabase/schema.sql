-- ==============================================================================
-- GANESH COMPUTERS & ACCESSORIES - MASTER DATABASE SCHEMA
-- ==============================================================================
-- Business: Ganesh Computers & Accessories
-- Domain: Computer Hardware, Laptops, Components, Peripherals & Accessories Catalog
-- Architecture: Product Catalog with WhatsApp Inquiries (Non-Ecommerce)
-- Security: Admin-Only Authentication, Public Read-Only Access, Row Level Security
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. Table: products
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- 2. Indexes for High Performance Queries & Search
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products (featured);
CREATE INDEX IF NOT EXISTS idx_products_stock_status ON public.products (stock_status);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products (price ASC);

-- Full-Text Search Composite Index (GIN)
CREATE INDEX IF NOT EXISTS idx_products_fts ON public.products
    USING gin(to_tsvector('english'::regconfig, name || ' ' || coalesce(description, '') || ' ' || category));

-- ------------------------------------------------------------------------------
-- 3. Automatic Updated_At Timestamp Trigger
-- ------------------------------------------------------------------------------
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
-- 4. Enable Row Level Security (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Comments for database documentation
COMMENT ON TABLE public.products IS 'Inventory catalog for Ganesh Computers & Accessories';
COMMENT ON COLUMN public.products.id IS 'Unique identifier for the product';
COMMENT ON COLUMN public.products.name IS 'Full product commercial title';
COMMENT ON COLUMN public.products.slug IS 'URL-friendly unique identifier for public routing';
COMMENT ON COLUMN public.products.description IS 'Detailed technical specifications and overview';
COMMENT ON COLUMN public.products.price IS 'Retail price in INR (₹)';
COMMENT ON COLUMN public.products.category IS 'Hardware taxonomy classification';
COMMENT ON COLUMN public.products.image_url IS 'Publicly accessible URL from Supabase storage or CDN';
COMMENT ON COLUMN public.products.stock_status IS 'Inventory availability: in_stock, limited_stock, out_of_stock';
COMMENT ON COLUMN public.products.featured IS 'Flag for highlighting on homepage carousel / featured grid';
