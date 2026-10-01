-- ==============================================================================
-- GANESH COMPUTERS & ACCESSORIES - INVENTORY SEED / INSERT TEMPLATE
-- ==============================================================================
-- Dummy demo products have been removed as requested.
-- You can enter your real shop products in two easy ways:
--
-- METHOD 1 (Recommended):
-- Use your live Admin Dashboard at: http://localhost:5173/admin/products/new
-- (Includes image uploading to Supabase Storage, auto slug generation, and real-time preview)
--
-- METHOD 2 (Direct SQL batch insert):
-- Fill in your real inventory below and run in Supabase SQL Editor:
-- ==============================================================================

/*
INSERT INTO public.products (name, slug, description, price, category, image_url, stock_status, featured)
VALUES
(
    'Real Product Title Here',
    'real-product-slug-here',
    'Detailed specifications, warranty information, and description.',
    25000.00,
    'Computer & Laptops', -- Choose from categories
    'https://...',
    'in_stock', -- 'in_stock', 'limited_stock', 'out_of_stock'
    true
)
ON CONFLICT (slug) DO NOTHING;  
*/
