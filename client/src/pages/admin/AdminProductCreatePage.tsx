import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductForm, ProductFormValues } from '../../components/admin/ProductForm';
import { productService } from '../../services/productService';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminProductCreatePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Publishing product to catalog...');

    try {
      // Check if slug already exists
      const existing = await productService.getProductBySlug(values.slug);
      if (existing) {
        toast.error(`A product with slug "${values.slug}" already exists. Please choose a unique slug.`, {
          id: toastId,
        });
        setIsSubmitting(false);
        return;
      }

      await productService.createProduct({
        name: values.name,
        slug: values.slug,
        category: values.category,
        price: values.price,
        stock_status: values.stock_status,
        featured: values.featured,
        image_url: values.image_url || null,
        description: values.description,
      });

      toast.success('Product successfully added to inventory!', { id: toastId });
      navigate('/admin/products');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create product';
      toast.error(msg, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Navigation header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/products"
          className="p-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors shadow-2xs group"
          title="Return to inventory"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 font-mono mb-1">
            <span>INVENTORY</span>
            <span>/</span>
            <span className="text-[#E11D48]">NEW ITEM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight flex items-center gap-2.5">
            Add New Hardware Unit
          </h1>
        </div>
      </div>

      <ProductForm onSubmit={handleCreate} isLoading={isSubmitting} mode="create" />
    </motion.div>
  );
};
