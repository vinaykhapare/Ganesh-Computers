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

    // Fallback mode if Supabase is not configured yet
    if (!isSupabaseConfigured || !supabase) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ url: reader.result as string });
        };
        reader.onerror = () => {
          resolve({ url: '', error: 'Failed to read local file.' });
        };
        reader.readAsDataURL(file);
      });
    }

    try {
      const fileExt = file.name.split('.').pop();
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
        console.warn('Supabase storage upload failed, falling back to local preview URL:', uploadError.message);
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ url: reader.result as string });
          };
          reader.onerror = () => {
            resolve({ url: '', error: uploadError.message });
          };
          reader.readAsDataURL(file);
        });
      }

      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return { url: publicUrlData.publicUrl };
    } catch (err: unknown) {
      console.error('Storage upload exception:', err);
      return {
        url: '',
        error: err instanceof Error ? err.message : 'Unknown image upload error',
      };
    }
  },
};
