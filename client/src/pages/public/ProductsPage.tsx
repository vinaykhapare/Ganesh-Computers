import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/public/ProductCard';
import { CategoryFilter } from '../../components/public/CategoryFilter';
import { SearchBar } from '../../components/public/SearchBar';
import { CardSkeleton } from '../../components/common/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { useProducts } from '../../hooks/useProducts';
import { useDebounce } from '../../hooks/useDebounce';
import { StockStatus } from '../../types';
import { Filter, ChevronLeft, ChevronRight, X, ArrowUpDown, Sparkles, MessageCircle } from 'lucide-react';
import { generateGeneralInquiryUrl } from '../../utils/whatsapp';

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

  // Hook for fetching data
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

  // Keep state synced with URL changes
  useEffect(() => {
    const urlCat = searchParams.get('category') || 'All Categories';
    const urlSearch = searchParams.get('search') || '';
    setSelectedCategory(urlCat);
    setSearchInput(urlSearch);
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

  // Scroll to top when changing pagination pages
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage]);

  const hasActiveFilters =
    searchInput !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedStock !== 'all' ||
    sortBy !== 'newest';

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-600 text-[11px] font-heading font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3 h-3" />
          <span>Real-Time In-Store Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight">
          Hardware & Systems Catalog
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-sans mt-2 max-w-2xl">
          Browse verified laptops, custom desktop rigs, CCTV equipment, and parts available at our Subhash Road showroom in Gadhinglaj.
        </p>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs mb-6 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
        {/* Search Input Bar */}
        <div className="lg:col-span-8">
          <SearchBar
            value={searchInput}
            onChange={(val) => {
              setSearchInput(val);
              setCurrentPage(1);
            }}
            placeholder="Search by laptop model, graphics card, specs, CCTV..."
          />
        </div>

        {/* Sort & Stock Filters */}
        <div className="lg:col-span-4 flex items-center gap-3">
          {/* Stock Dropdown */}
          <div className="relative flex-1">
            <select
              value={selectedStock}
              onChange={(e) => {
                setSelectedStock(e.target.value as StockStatus | 'all');
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-3.5 py-3 text-xs sm:text-sm text-slate-700 font-heading font-semibold focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all cursor-pointer appearance-none pr-8"
            >
              <option value="all">All Availability</option>
              <option value="in_stock">In Stock Only</option>
              <option value="limited_stock">Limited Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-3.5 py-3 text-xs sm:text-sm text-slate-700 font-heading font-semibold focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all cursor-pointer appearance-none pr-8"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="mb-6">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Results Header & Active Filter Tags */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-3">
        <div className="text-xs sm:text-sm text-slate-600 font-sans font-medium">
          Showing <span className="font-bold font-heading text-slate-900">{total}</span> hardware items
          {selectedCategory !== 'All Categories' && (
            <span> in <span className="text-[#E11D48] font-bold font-heading">{selectedCategory}</span></span>
          )}
          {searchInput && (
            <span> matching "<span className="text-slate-900 font-bold">{searchInput}</span>"</span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-heading font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1.5 p-1.5 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs max-w-lg mx-auto">
          <EmptyState
            title="Catalog Update in Progress"
            description="No items match your active filters. If you are looking for a specific laptop, CCTV setup, or custom PC part, message us directly for live availability."
            actionText="Clear Filters"
            onAction={handleResetFilters}
          />
          <div className="mt-6 pt-6 border-t border-slate-100">
            <a
              href={generateGeneralInquiryUrl('Inquiry for custom product request from catalog')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-heading font-bold shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Ask Mr. G.T. Patil on WhatsApp</span>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-14 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isCurrent = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-11 h-11 rounded-2xl text-xs font-heading font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#E11D48] text-white shadow-md shadow-rose-500/20'
                    : 'bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
