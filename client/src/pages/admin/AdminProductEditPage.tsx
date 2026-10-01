import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductForm, ProductFormValues } from '../../components/admin/ProductForm';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { Spinner } from '../../components/common/Spinner';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadItem() {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await productService.getProductById(id);
        if (!data) {
          toast.error('Product not found in catalog');
          navigate('/admin/products');
          return;
        }
        setProduct(data);
      } catch (err) {
        console.error('Failed to load product:', err);
        toast.error('Error fetching product details');
      } finally {
        setIsLoading(false);
      }
    }
    loadItem();
  }, [id, navigate]);

  const handleUpdate = async (values: ProductFormValues) => {
    if (!id) return;
    setIsSubmitting(true);
    const toastId = toast.loading('Saving changes to product...');

    try {
      await productService.updateProduct(id, {
        name: values.name,
        slug: values.slug,
        category: values.category,
        price: values.price,
        stock_status: values.stock_status,
        featured: values.featured,
        image_url: values.image_url || null,
        description: values.description,
      });

      toast.success('Product updated successfully!', { id: toastId });
      navigate('/admin/products');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update product';
      toast.error(msg, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Spinner size="lg" label="Loading product for editing..." />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              <span className="text-[#E11D48]">EDIT</span>
              <span>/</span>
              <span className="truncate max-w-[200px]">{product.slug}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
              Edit Product
            </h1>
          </div>
        </div>

        <Link
          to={`/products/${product.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#E11D48] hover:border-[#E11D48]/30 transition-all shadow-2xs font-heading"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Store Page</span>
        </Link>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
        isLoading={isSubmitting}
        mode="edit"
      />
    </motion.div>
  );
};
