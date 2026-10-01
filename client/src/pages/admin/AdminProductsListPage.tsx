import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { productService } from '../../services/productService';
import { Product, StockStatus } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { StockBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Spinner } from '../../components/common/Spinner';
import { Modal } from '../../components/common/Modal';
import { CATEGORIES_LIST } from '../../lib/mockData';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Sparkles, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle,
  RefreshCw,
  Package
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
          ? `Removed "${product.name}" from featured showcase.`
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

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-display">
            Hardware Catalog Inventory
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Manage your hardware products, prices, stock statuses and visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Refresh Catalog"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link to="/admin/products/new">
            <Button
              variant="primary"
              size="md"
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Add New Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, slug or specs..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-sans bg-slate-50 border border-slate-200/90 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-heading font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#E11D48] cursor-pointer"
          >
            {CATEGORIES_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Filter */}
        <div>
          <select
            value={stockFilter}
            onChange={handleStockChange}
            className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-heading font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#E11D48] cursor-pointer"
          >
            <option value="all">All Availability</option>
            <option value="in_stock">In Stock</option>
            <option value="limited_stock">Limited Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Spinner size="lg" label="Loading product inventory..." />
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold font-heading text-slate-800 text-base mb-1">No products found</h3>
            <p className="text-xs text-slate-400 mb-4 font-sans">
              Try adjusting your search or department filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                <tr>
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-4 py-4">Department</th>
                  <th className="px-4 py-4">Store Price</th>
                  <th className="px-4 py-4">Stock Status</th>
                  <th className="px-4 py-4 text-center">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Image & Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center p-1">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div className="max-w-xs sm:max-w-sm">
                          <Link
                            to={`/admin/products/edit/${item.id}`}
                            className="font-heading font-bold text-slate-900 hover:text-[#E11D48] transition-colors line-clamp-1"
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
                    <td className="px-4 py-4">
                      <span className="text-xs font-heading font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 font-black text-slate-900 font-display">
                      {formatPrice(item.price)}
                    </td>

                    {/* Stock status */}
                    <td className="px-4 py-4">
                      <StockBadge status={item.stock_status} />
                    </td>

                    {/* Featured toggle */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(item)}
                        className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                          item.featured
                            ? 'bg-rose-50 border-rose-200 text-[#E11D48]'
                            : 'bg-slate-50 border-slate-200 text-slate-300 hover:text-slate-600'
                        }`}
                        title={item.featured ? 'Featured on home' : 'Click to mark featured'}
                      >
                        <Sparkles className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/products/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/products/edit/${item.id}`}
                          className="p-2 text-slate-600 hover:text-[#E11D48] hover:bg-rose-50 rounded-xl transition-colors"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setProductToDelete(item)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
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
              Showing page <span className="font-heading font-bold text-slate-900">{page}</span> of{' '}
              <span className="font-heading font-bold text-slate-900">{totalPages}</span> ({total} items)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        title="Confirm Product Removal"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-sans">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-heading font-bold">Are you sure you want to delete this product?</p>
              <p className="text-xs text-red-600 mt-1">
                This will remove <strong>&ldquo;{productToDelete?.name}&rdquo;</strong> permanently from the catalog. Customers will no longer be able to inquire about it.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button
              variant="secondary"
              onClick={() => setProductToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              isLoading={isDeleting}
            >
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
