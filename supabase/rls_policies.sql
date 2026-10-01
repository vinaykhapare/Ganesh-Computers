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