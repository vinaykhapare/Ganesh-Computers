import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product, ProductFilterParams, PaginatedProductsResponse, DashboardStats } from '../types';

// Purge any stale mock products stored in client's localStorage
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem('ganesh_catalog_products');
  }
} catch {
  // Ignore localStorage access restrictions
}

export const productService = {
  /**
   * Fetches paginated & filtered products directly from Supabase.
   * Never falls back to dummy, mock, or hardcoded products.
   */
  async getProducts(params: ProductFilterParams = {}): Promise<PaginatedProductsResponse> {
    const {
      search = '',
      category = 'All Categories',
      stock_status = 'all',
      sortBy = 'newest',
      featuredOnly = false,
      page = 1,
      pageSize = 12,
    } = params;

    if (!isSupabaseConfigured || !supabase) {
      console.warn('[productService] Supabase is not configured. Please set Supabase environment variables.');
      return {
        products: [],
        total: 0,
        page,
        pageSize,
        totalPages: 1,
      };
    }

    try {
      let query = supabase.from('products').select('*', { count: 'exact' });

      if (featuredOnly) {
        query = query.eq('featured', true);
      }

      if (category && category !== 'All Categories') {
        query = query.eq('category', category);
      }

      if (stock_status && stock_status !== 'all') {
        query = query.eq('stock_status', stock_status);
      }

      // Sanitize search to prevent PostgREST syntax errors with special characters
      if (search.trim()) {
        const sanitized = search.trim().replace(/[,%()]/g, ' ').trim();
        if (sanitized) {
          query = query.or(`name.ilike.%${sanitized}%,description.ilike.%${sanitized}%,category.ilike.%${sanitized}%`);
        }
      }

      // Sorting
      switch (sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'name_asc':
          query = query.order('name', { ascending: true });
          break;
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const from = Math.max(0, (page - 1) * pageSize);
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;
      if (error) {
        console.error('[productService] Supabase query error:', error);
        throw error;
      }

      const total = count || 0;
      return {
        products: (data as Product[]) || [],
        total,
        page,
        pageSize,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      };
    } catch (err) {
      console.error('[productService] Failed to fetch products from Supabase:', err);
      return {
        products: [],
        total: 0,
        page,
        pageSize,
        totalPages: 1,
      };
    }
  },

  /**
   * Fetches a single product by its URL-friendly slug directly from Supabase.
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    if (!isSupabaseConfigured || !supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error(`[productService] Error fetching product by slug "${slug}":`, error);
        return null;
      }

      return (data as Product) || null;
    } catch (err) {
      console.error(`[productService] Exception fetching product by slug "${slug}":`, err);
      return null;
    }
  },

  /**
   * Fetches a single product by its UUID directly from Supabase.
   */
  async getProductById(id: string): Promise<Product | null> {
    if (!isSupabaseConfigured || !supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error(`[productService] Error fetching product by id "${id}":`, error);
        return null;
      }

      return (data as Product) || null;
    } catch (err) {
      console.error(`[productService] Exception fetching product by id "${id}":`, err);
      return null;
    }
  },

  /**
   * Creates a new product directly in Supabase (Admin Only).
   */
  async createProduct(
    productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Product> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Cannot create product.');
    }

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || 'Failed to insert product into database.');
    }

    return data as Product;
  },

  /**
   * Updates an existing product directly in Supabase (Admin Only).
   */
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Cannot update product.');
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || 'Failed to update product in database.');
    }

    return data as Product;
  },

  /**
   * Deletes a product by ID directly from Supabase (Admin Only).
   */
  async deleteProduct(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Cannot delete product.');
    }

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      throw new Error(error.message || 'Failed to delete product from database.');
    }

    return true;
  },

  /**
   * Aggregates stats for the Admin Dashboard directly from Supabase.
   */
  async getDashboardStats(): Promise<DashboardStats> {
    if (!isSupabaseConfigured || !supabase) {
      return {
        totalProducts: 0,
        featuredCount: 0,
        categoriesCount: 0,
        outOfStockCount: 0,
        recentProducts: [],
      };
    }

    try {
      const [allProductsRes, featuredRes, outOfStockRes, recentRes] = await Promise.all([
        supabase.from('products').select('category', { count: 'exact' }),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('featured', true),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('stock_status', 'out_of_stock'),
        supabase.from('products').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      const totalProducts = allProductsRes.count || 0;
      const categoriesSet = new Set((allProductsRes.data || []).map((p) => p.category));
      const featuredCount = featuredRes.count || 0;
      const outOfStockCount = outOfStockRes.count || 0;
      const recentProducts = (recentRes.data as Product[]) || [];

      return {
        totalProducts,
        featuredCount,
        categoriesCount: categoriesSet.size,
        outOfStockCount,
        recentProducts,
      };
    } catch (err) {
      console.error('[productService] Error loading dashboard stats:', err);
      return {
        totalProducts: 0,
        featuredCount: 0,
        categoriesCount: 0,
        outOfStockCount: 0,
        recentProducts: [],
      };
    }
  },
};
