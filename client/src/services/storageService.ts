import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UploadResult {
  url: string;
  error?: string;
}

export const storageService = {
  /**
   * Uploads an image file to the Supabase Storage 'product-images' bucket
   * Generates a unique timestamped file path.
   */
  async uploadProductImage(file: File): Promise<UploadResult> {
    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return { url: '', error: 'File size exceeds maximum 5MB limit.' };
    }

    // Validate MIME type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    if (!validMimes.includes(file.type)) {
      return { url: '', error: 'Only JPG, PNG, WEBP, AVIF and GIF images are allowed.' };
    }

    if (!isSupabaseConfigured || !supabase) {
      return {
        url: '',
        error: 'Supabase storage is not configured. Please check your Supabase environment variables.',
      };
    }

    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const fileName = `${Date.now()}_${sanitizedName}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('[storageService] Supabase storage upload failed:', uploadError.message);
        return {
          url: '',
          error: `Storage upload failed: ${uploadError.message}`,
        };
      }

      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return { url: publicUrlData.publicUrl };
    } catch (err: unknown) {
      console.error('[storageService] Storage upload exception:', err);
      return {
        url: '',
        error: err instanceof Error ? err.message : 'Unknown image upload error',
      };
    }
  },
};
