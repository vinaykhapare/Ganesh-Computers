import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product } from '../../types';
import { generateSlug } from '../../utils/slugify';
import { storageService } from '../../services/storageService';
import { CATEGORIES_LIST } from '../../constants/categories';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  FileText, 
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Zod Validation Schema
const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  slug: z
    .string()
    .min(3, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  category: z.string().min(1, 'Please select a hardware category'),
  price: z.coerce.number().min(0, 'Price must be greater than or equal to 0'),
  stock_status: z.enum(['in_stock', 'limited_stock', 'out_of_stock']),
  featured: z.boolean(),
  image_url: z.string().nullable().optional(),
  description: z.string().min(10, 'Please provide at least 10 characters of technical description'),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  mode = 'create',
}) => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [autoSlug, setAutoSlug] = useState(mode === 'create');
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image_url || null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      category: initialData?.category || 'Computer & Laptops',
      price: initialData?.price || 0,
      stock_status: initialData?.stock_status || 'in_stock',
      featured: initialData?.featured || false,
      image_url: initialData?.image_url || '',
      description: initialData?.description || '',
    },
  });

  const watchedName = watch('name');

  // Auto-generate slug when name changes if autoSlug enabled
  useEffect(() => {
    if (autoSlug && watchedName) {
      const generated = generateSlug(watchedName);
      setValue('slug', generated, { shouldValidate: true });
    }
  }, [watchedName, autoSlug, setValue]);

  // Handle file upload to Supabase Storage
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const toastId = toast.loading('Uploading asset to Supabase storage...');

    try {
      const result = await storageService.uploadProductImage(file);
      if (result.error || !result.url) {
        toast.error(result.error || 'Failed to upload image', { id: toastId });
      } else {
        setPreviewUrl(result.url);
        setValue('image_url', result.url, { shouldValidate: true });
        toast.success('Asset uploaded successfully!', { id: toastId });
      }
    } catch {
      toast.error('Unexpected error uploading file', { id: toastId });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setValue('image_url', '', { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Product Information */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-700" />
                <span>Primary Specifications</span>
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Core descriptive information and identification properties
              </p>
            </div>

            {/* Product Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 font-heading">
                Product Title / Model Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                {...register('name')}
                placeholder="e.g. Dell Latitude 5420 Core i5 11th Gen 16GB RAM"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Slug URL */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-heading">
                  URL-Friendly Slug <span className="text-red-500">*</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoSlug}
                    onChange={(e) => setAutoSlug(e.target.checked)}
                    className="rounded border-slate-300 text-slate-900"
                  />
                  <span>Auto-generate from title</span>
                </label>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                  /products/
                </span>
                <Input
                  type="text"
                  {...register('slug')}
                  className="pl-24 font-mono text-xs"
                  placeholder="dell-latitude-5420-16gb"
                />
              </div>
              {errors.slug && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.slug.message}
                </p>
              )}
            </div>

            {/* Category and Price Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 font-heading">
                  Hardware Department <span className="text-red-500">*</span>
                </label>
                <Select {...register('category')}>
                  {CATEGORIES_LIST.filter((c) => c !== 'All Categories').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
                {errors.category && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 font-heading">
                  Retail Showroom Price (INR ₹) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  step="any"
                  {...register('price')}
                  placeholder="0"
                />
                {errors.price && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 font-heading">
                Detailed Technical Specifications <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('description')}
                rows={5}
                placeholder="Include processor, RAM, storage, screen size, warranty details, and physical condition..."
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 font-sans leading-relaxed"
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Media, Inventory Status & Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Stock Status & Visibility Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold font-heading text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Availability & Visibility
            </h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 font-heading">
                Stock Status
              </label>
              <Select {...register('stock_status')}>
                <option value="in_stock">In Stock (Showroom Available)</option>
                <option value="limited_stock">Limited Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </Select>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="rounded border-slate-300 text-slate-900 mt-0.5"
                />
                <div>
                  <span className="font-semibold block text-slate-900">Featured Showcase</span>
                  <span className="text-[11px] text-slate-500">
                    Display prominently on the homepage featured hardware section.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Product Image Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold font-heading text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Hardware Photography
            </h3>

            {previewUrl ? (
              <div className="relative aspect-[4/3] rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center p-2">
                <img
                  src={previewUrl}
                  alt="Product preview"
                  className="max-h-full max-w-full object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1 rounded-md bg-slate-900/80 text-white hover:bg-red-600 transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-lg border border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                <ImageIcon className="w-8 h-8 opacity-40 mb-1.5" />
                <span className="text-xs font-medium text-slate-600">No image uploaded</span>
                <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WEBP up to 5MB</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="w-full inline-flex">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageFileChange}
                  disabled={isUploadingImage}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUploadingImage}
                  className="w-full gap-2 cursor-pointer font-semibold"
                  onClick={(e) => {
                    const input = e.currentTarget.parentElement?.querySelector('input');
                    input?.click();
                  }}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploadingImage ? 'Uploading to Supabase...' : 'Upload Image'}</span>
                </Button>
              </label>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Or enter direct public image URL:
                </label>
                <Input
                  type="url"
                  {...register('image_url')}
                  onChange={(e) => setPreviewUrl(e.target.value)}
                  placeholder="https://..."
                  className="text-xs h-8"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2.5">
            <Button
              type="submit"
              disabled={isLoading || isUploadingImage}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-10"
            >
              {isLoading
                ? 'Saving to Database...'
                : mode === 'create'
                ? 'Publish Hardware Item'
                : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
