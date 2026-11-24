import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductForm, ProductFormValues } from '../../components/admin/ProductForm';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { Skeleton } from '../../components/ui/skeleton';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
    const toastId = toast.loading('Saving changes to Supabase...');

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
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/admin/products">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <div className="text-[11px] font-semibold text-slate-400 font-mono">
            INVENTORY / EDIT ITEM
          </div>
          <h1 className="text-xl font-bold font-heading text-slate-900 tracking-tight">
            Edit: {product.name}
          </h1>
        </div>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
        isLoading={isSubmitting}
        mode="edit"
      />
    </div>
  );
};
