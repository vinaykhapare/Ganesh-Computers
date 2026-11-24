import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ProductCard } from '../../components/public/ProductCard';
import { CategoryFilter } from '../../components/public/CategoryFilter';
import { EmptyState } from '../../components/common/EmptyState';
import { useProducts } from '../../hooks/useProducts';
import { useDebounce } from '../../hooks/useDebounce';
import { StockStatus } from '../../types';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpDown,
  MessageCircle,
  Home,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { Skeleton } from '../../components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../../components/ui/breadcrumb';
import { generateGeneralInquiryUrl, STORE_DISPLAY_PHONE } from '../../utils/whatsapp';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL params
  const categoryParam = searchParams.get('category') || 'All Categories';
  const initialSearch = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchInput, 300);

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedStock, setSelectedStock] = useState<StockStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'name_asc'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Hook for fetching data directly from Supabase
  const {
    products,
    total,
    totalPages,
    isLoading,
    updateFilters,
  } = useProducts({
    category: categoryParam,
    search: initialSearch,
    stock_status: 'all',
    sortBy: 'newest',
    page: 1,
    pageSize: 12,
  });

  // Sync state when URL params change externally
  useEffect(() => {
    const urlCat = searchParams.get('category') || 'All Categories';
    const urlSearch = searchParams.get('search') || '';
    if (urlCat !== selectedCategory) setSelectedCategory(urlCat);
    if (urlSearch !== searchInput) setSearchInput(urlSearch);
  }, [searchParams]);

  // Trigger search update
  useEffect(() => {
    updateFilters({
      search: debouncedSearch,
      category: selectedCategory,
      stock_status: selectedStock,
      sortBy,
      page: currentPage,
    });

    const params: Record<string, string> = {};
    if (selectedCategory && selectedCategory !== 'All Categories') {
      params.category = selectedCategory;
    }
    if (debouncedSearch) {
      params.search = debouncedSearch;
    }
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, selectedCategory, selectedStock, sortBy, currentPage]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSelectedCategory('All Categories');
    setSelectedStock('all');
    setSortBy('newest');
    setCurrentPage(1);
    setSearchParams({});
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage]);

  const hasActiveFilters =
    searchInput !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedStock !== 'all' ||
    sortBy !== 'newest';

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* 1. Breadcrumbs Strip */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="inline-flex items-center gap-1 hover:text-slate-900">
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Hardware Catalog</BreadcrumbPage>
              </BreadcrumbItem>
              {selectedCategory !== 'All Categories' && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-[#D92344]">{selectedCategory}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* 2. Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
              Hardware & Systems Catalog
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-sans">
              Verified inventory at our showroom on Subhash Road, Gadhinglaj. All units checked and tested.
            </p>
          </div>

          <div className="text-xs text-slate-600 font-medium">
            Showing <strong className="text-slate-900">{total}</strong> products
            {selectedCategory !== 'All Categories' && (
              <span> in <span className="font-semibold text-slate-900">{selectedCategory}</span></span>
            )}
          </div>
        </div>

        {/* 3. Search and Sort Toolbar */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by laptop model, graphics card, CCTV, specs..."
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-900"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Stock Dropdown */}
          <div className="md:col-span-3">
            <Select
              value={selectedStock}
              onChange={(e) => {
                setSelectedStock(e.target.value as StockStatus | 'all');
                setCurrentPage(1);
              }}
            >
              <option value="all">All Availability</option>
              <option value="in_stock">In Stock Only</option>
              <option value="limited_stock">Limited Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </Select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <Select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
            </Select>
          </div>
        </div>

        {/* 4. Category Filter Strip */}
        <div className="mt-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 py-1">
            <span>Filters active</span>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Product Grid & Empty State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <Skeleton className="h-44 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-full rounded-md" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-8">
            <EmptyState
              title="No Products Match Your Criteria"
              description="No inventory items match the selected category or search query. Contact Mr. G.T. Patil directly on WhatsApp for live showroom stock."
              actionText="Clear Filters"
              onAction={handleResetFilters}
            />
            <div className="text-center mt-4">
              <a
                href={generateGeneralInquiryUrl('Inquiring about stock for custom laptop or component')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="sm" className="font-semibold gap-2">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Check Live Stock with Mr. G.T. Patil ({STORE_DISPLAY_PHONE})</span>
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* 6. Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center gap-1 px-2 text-xs font-semibold text-slate-700">
              Page {currentPage} of {totalPages}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
