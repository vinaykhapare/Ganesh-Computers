import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductForm, ProductFormValues } from '../../components/admin/ProductForm';
import { productService } from '../../services/productService';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import toast from 'react-hot-toast';

export const AdminProductCreatePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Publishing product to Supabase...');

    try {
      // Check if slug already exists in Supabase
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
    <div className="space-y-6">
      {/* Navigation header */}
      <div className="flex items-center gap-3">
        <Link to="/admin/products">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <div className="text-[11px] font-semibold text-slate-400 font-mono">
            INVENTORY / NEW ITEM
          </div>
          <h1 className="text-xl font-bold font-heading text-slate-900 tracking-tight">
            Add New Hardware Unit
          </h1>
        </div>
      </div>

      <ProductForm onSubmit={handleCreate} isLoading={isSubmitting} mode="create" />
    </div>
  );
};
