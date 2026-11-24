import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { productService } from '../../services/productService';
import { Product, StockStatus } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { Skeleton } from '../../components/ui/skeleton';
import { Dialog } from '../../components/ui/dialog';
import { CATEGORIES_LIST } from '../../constants/categories';
import {
  PlusCircle,
  Search,
  Sparkles,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Package,
  AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminProductsListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [stockFilter, setStockFilter] = useState<StockStatus | 'all'>('all');
  const [page, setPage] = useState(1);

  // Deletion modal state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    products,
    total,
    totalPages,
    isLoading,
    refetch,
    updateFilters,
  } = useProducts({
    category: categoryFilter,
    stock_status: stockFilter,
    search: searchTerm,
    page,
    pageSize: 10,
    sortBy: 'newest',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
    updateFilters({ search: e.target.value, page: 1 });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
    setPage(1);
    updateFilters({ category: e.target.value, page: 1 });
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as StockStatus | 'all';
    setStockFilter(val);
    setPage(1);
    updateFilters({ stock_status: val, page: 1 });
  };

  const handleToggleFeatured = async (product: Product) => {
    try {
      await productService.updateProduct(product.id, {
        featured: !product.featured,
      });
      toast.success(
        product.featured
          ? `Removed "${product.name}" from homepage showcase.`
          : `Featured "${product.name}" on homepage showcase.`
      );
      refetch();
    } catch {
      toast.error('Failed to update featured flag');
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await productService.deleteProduct(productToDelete.id);
      toast.success(`Product "${productToDelete.name}" successfully deleted.`);
      setProductToDelete(null);
      refetch();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStockBadge = (status: StockStatus) => {
    switch (status) {
      case 'in_stock':
        return <Badge variant="success">In Stock</Badge>;
      case 'limited_stock':
        return <Badge variant="warning">Limited Stock</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">Available</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-heading text-slate-900 tracking-tight">
            Hardware Catalog Inventory
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Manage your hardware products, prices, stock statuses, and showcase visibility.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-1.5 text-xs font-semibold"
            title="Refresh Catalog"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </Button>

          <Link to="/admin/products/new">
            <Button
              variant="default"
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold gap-1.5 text-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Product</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-3 items-center">
        {/* Search Input */}
        <div className="lg:col-span-6 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by product name, slug, or specs..."
            className="pl-9 h-10 text-xs sm:text-sm"
          />
        </div>

        {/* Category Dropdown */}
        <div className="lg:col-span-3">
          <Select value={categoryFilter} onChange={handleCategoryChange}>
            {CATEGORIES_LIST.map((c: string) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        {/* Stock Filter */}
        <div className="lg:col-span-3">
          <Select value={stockFilter} onChange={handleStockChange}>
            <option value="all">All Availability</option>
            <option value="in_stock">In Stock Only</option>
            <option value="limited_stock">Limited Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </Select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-md" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold font-heading text-slate-800 text-sm mb-1">No products found</h3>
            <p className="text-xs text-slate-400 font-sans">
              Try adjusting your search query or department filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Product Details</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Price (INR)</th>
                  <th className="px-4 py-3">Stock Status</th>
                  <th className="px-4 py-3 text-center">Featured</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Image & Title */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center p-1">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <Package className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div className="max-w-xs sm:max-w-sm">
                          <Link
                            to={`/admin/products/edit/${item.id}`}
                            className="font-heading font-semibold text-slate-900 hover:text-rose-600 transition-colors text-xs sm:text-sm line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <div className="text-[11px] text-slate-400 font-mono truncate">
                            /{item.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3.5 font-bold text-slate-900 font-heading text-xs sm:text-sm">
                      {formatPrice(item.price)}
                    </td>

                    {/* Stock status */}
                    <td className="px-4 py-3.5">
                      {getStockBadge(item.stock_status)}
                    </td>

                    {/* Featured toggle */}
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => handleToggleFeatured(item)}
                        className={`p-1.5 rounded-md border transition-all cursor-pointer ${
                          item.featured
                            ? 'bg-rose-50 border-rose-200 text-rose-600'
                            : 'bg-slate-50 border-slate-200 text-slate-300 hover:text-slate-600'
                        }`}
                        title={item.featured ? 'Featured on homepage' : 'Click to feature on homepage'}
                      >
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/products/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/products/edit/${item.id}`}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setProductToDelete(item)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sans">
            <div>
              Showing page <strong className="text-slate-900">{page}</strong> of{' '}
              <strong className="text-slate-900">{totalPages}</strong> ({total} total products)
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-8 text-xs gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="h-8 text-xs gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal using Dialog */}
      <Dialog
        open={Boolean(productToDelete)}
        onOpenChange={(open) => !open && setProductToDelete(null)}
        title="Confirm Hardware Deletion"
        description="Are you sure you want to remove this item from the showroom database? This cannot be undone."
      >
        {productToDelete && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 mb-0.5">{productToDelete.name}</div>
              <div className="text-slate-500 font-mono">Slug: /{productToDelete.slug}</div>
              <div className="text-slate-600 mt-1">Price: {formatPrice(productToDelete.price)}</div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setProductToDelete(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="gap-1.5 font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Deleting...' : 'Delete Permanently'}</span>
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
