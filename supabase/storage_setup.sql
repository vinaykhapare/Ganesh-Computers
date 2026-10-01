INSERT INTO storage.buckets (
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
)
VALUES (
    'product-images',
    'product-images',
    true,
    5242880,
    ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/avif',
        'image/gif'
    ]
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