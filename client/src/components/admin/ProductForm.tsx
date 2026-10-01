import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { generateSlug } from '../../utils/slugify';
import { storageService } from '../../services/storageService';
import { CATEGORIES_LIST } from '../../lib/mockData';
import { Button } from '../common/Button';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Sparkles, 
  Layers, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
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
      category: initialData?.category || 'Components',
      price: initialData?.price || 0,
      stock_status: initialData?.stock_status || 'in_stock',
      featured: initialData?.featured || false,
      image_url: initialData?.image_url || '',
      description: initialData?.description || '',
    },
  });

  const watchedName = watch('name');
  const watchedStockStatus = watch('stock_status');

  // Auto-generate slug when name changes if autoSlug enabled
  useEffect(() => {
    if (autoSlug && watchedName) {
      const generated = generateSlug(watchedName);
      setValue('slug', generated, { shouldValidate: true });
    }
  }, [watchedName, autoSlug, setValue]);

  // Handle file upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const toastId = toast.loading('Uploading asset to storage...');

    try {
      const result = await storageService.uploadProductImage(file);
      if (result.error || !result.url) {
        toast.error(result.error || 'Failed to upload image', { id: toastId });
      } else {
        setPreviewUrl(result.url);
        setValue('image_url', result.url, { shouldValidate: true });
        toast.success('Asset uploaded successfully!', { id: toastId });
      }
    } catch (err: unknown) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Product Information */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E11D48]" />
                  Primary Hardware Specifications
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Core descriptive information and identification properties
                </p>
              </div>
            </div>

            {/* Product Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-heading">
                Product Name / Model <span className="text-[#E11D48]">*</span>
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder="e.g. ASUS ROG Strix G16 (2025) Intel i9 / RTX 4070"
                className="w-full px-4 py-3 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D48] focus:bg-white focus:ring-4 focus:ring-rose-500/10 transition-all font-sans"
              />
              {errors.name && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Slug input with auto/manual toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-heading">
                  URL Slug (Unique Permalink) <span className="text-[#E11D48]">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-xs font-semibold text-[#E11D48] hover:text-rose-700 hover:underline cursor-pointer transition-colors"
                >
                  {autoSlug ? 'Switch to Manual Slug' : 'Auto-Generate from Name'}
                </button>
              </div>
              <div className="flex items-center">
                <span className="px-3.5 py-3 bg-slate-100 border border-r-0 border-slate-200 text-xs text-slate-500 rounded-l-xl font-mono select-none">
                  /products/
                </span>
                <input
                  type="text"
                  {...register('slug')}
                  readOnly={autoSlug}
                  className={`w-full px-4 py-3 text-sm font-mono border border-slate-200 rounded-r-xl focus:outline-none focus:border-[#E11D48] focus:ring-4 focus:ring-rose-500/10 transition-all ${
                    autoSlug ? 'bg-slate-100/80 text-slate-500 cursor-not-allowed' : 'bg-white text-slate-900'
                  }`}
                />
              </div>
              {errors.slug && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.slug.message}
                </p>
              )}
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-heading">
                  Store Price (INR ₹) <span className="text-[#E11D48]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price')}
                    placeholder="0.00"
                    className="w-full pl-9 pr-4 py-3 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D48] focus:bg-white focus:ring-4 focus:ring-rose-500/10 font-mono font-medium transition-all"
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-heading">
                  Hardware Category <span className="text-[#E11D48]">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register('category')}
                    className="w-full px-4 py-3 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D48] focus:bg-white focus:ring-4 focus:ring-rose-500/10 cursor-pointer font-sans transition-all appearance-none"
                  >
                    {CATEGORIES_LIST.filter((c) => c !== 'All Categories').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                {errors.category && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Technical Specifications / Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-heading">
                  Technical Specifications & Overview <span className="text-[#E11D48]">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Supports detailed breakdown</span>
              </div>
              <textarea
                rows={7}
                {...register('description')}
                placeholder="Include key technical specifications:&#10;• Processor / Chipset Architecture&#10;• Memory, Cache & VRAM Bus Speed&#10;• IO Ports, Display & Dimensions&#10;• Official Manufacturer Warranty coverage"
                className="w-full p-4 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D48] focus:bg-white focus:ring-4 focus:ring-rose-500/10 leading-relaxed font-sans transition-all"
              />
              {errors.description && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.description.message}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Image, Stock, Featured Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Image Upload Box */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#E11D48]" />
                Product Imagery
              </h3>
            </div>

            {previewUrl ? (
              <div className="relative group aspect-square bg-slate-900/5 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={previewUrl}
                  alt="Product preview"
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 hover:border-[#E11D48] rounded-2xl p-6 text-center transition-colors bg-slate-50/50">
                <div className="w-12 h-12 bg-rose-50 text-[#E11D48] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-800 mb-1 font-heading">
                  Upload Product Visual
                </p>
                <p className="text-[11px] text-slate-400 mb-4 font-sans">
                  Direct upload to Supabase Storage (PNG, JPG, WEBP)
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#E11D48] text-white text-xs font-bold cursor-pointer transition-colors shadow-sm">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Select File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={isUploadingImage}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Direct Image URL input fallback */}
            <div className="pt-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-heading">
                Or Direct Remote URL
              </label>
              <input
                type="text"
                {...register('image_url')}
                placeholder="https://images.unsplash.com/..."
                onChange={(e) => {
                  setValue('image_url', e.target.value);
                  setPreviewUrl(e.target.value || null);
                }}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D48] focus:bg-white transition-all font-mono"
              />
            </div>
          </motion.div>

          {/* Stock & Featured Flags */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4"
          >
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Inventory & Placement
              </h3>
            </div>

            {/* Stock status radio cards */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-heading">
                Warehouse Stock Status <span className="text-[#E11D48]">*</span>
              </label>
              <div className="space-y-2">
                {[
                  { id: 'in_stock', label: 'In Stock', desc: 'Available for immediate walk-in / dispatch', color: 'emerald' },
                  { id: 'limited_stock', label: 'Limited Stock', desc: 'Low quantity warning badge displayed', color: 'amber' },
                  { id: 'out_of_stock', label: 'Out of Stock', desc: 'Accept back-order queries only', color: 'rose' },
                ].map((opt) => {
                  const isChecked = watchedStockStatus === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'border-[#E11D48] bg-rose-50/40 shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        value={opt.id}
                        {...register('stock_status')}
                        className="mt-0.5 text-[#E11D48] focus:ring-[#E11D48]"
                      />
                      <div className="flex-1">
                        <div className="text-xs font-bold text-slate-900 font-heading">{opt.label}</div>
                        <div className="text-[11px] text-slate-400 font-sans">{opt.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Featured Checkbox */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-r from-rose-500/5 to-transparent border border-rose-100 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="mt-0.5 w-4 h-4 rounded text-[#E11D48] focus:ring-[#E11D48]"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-heading flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                    Featured Spotlight Product
                  </span>
                  <span className="text-[11px] text-slate-500 font-sans block mt-0.5">
                    Surfaces this item in the primary homepage showcase
                  </span>
                </div>
              </label>
            </div>
          </motion.div>

          {/* Form Actions */}
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading || isUploadingImage}
              className="w-full font-heading"
            >
              {mode === 'create' ? 'Publish to Product Catalog' : 'Save Product Updates'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
