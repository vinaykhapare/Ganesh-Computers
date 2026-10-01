import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFilterParams, PaginatedProductsResponse } from '../types';
import { productService } from '../services/productService';

export function useProducts(initialFilters: ProductFilterParams = {}) {
  const [data, setData] = useState<PaginatedProductsResponse>({
    products: [],
    total: 0,
    page: initialFilters.page || 1,
    pageSize: initialFilters.pageSize || 12,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilterParams>(initialFilters);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await productService.getProducts(filters);
      setData(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load products';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilters = (newFilters: Partial<ProductFilterParams>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 on filter changes if page is not explicitly passed
      page: newFilters.page !== undefined ? newFilters.page : 1,
    }));
  };

  return {
    products: data.products,
    total: data.total,
    page: data.page,
    pageSize: data.pageSize,
    totalPages: data.totalPages,
    isLoading,
    error,
    filters,
    updateFilters,
    refetch: fetchProducts,
  };
}
