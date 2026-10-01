import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product, ProductFilterParams, PaginatedProductsResponse, DashboardStats } from '../types';
import { INITIAL_MOCK_PRODUCTS } from '../lib/mockData';

const LOCAL_STORAGE_KEY = 'ganesh_catalog_products';

// Helper to get local mock data store
function getLocalProducts(): Product[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_PRODUCTS));
      return INITIAL_MOCK_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_PRODUCTS;
  }
}

function saveLocalProducts(products: Product[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export const productService = {
  /**
   * Fetches paginated & filtered products
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

    if (isSupabaseConfigured && supabase) {
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

        if (search.trim()) {
          const s = search.trim();
          query = query.or(`name.ilike.%${s}%,description.ilike.%${s}%,category.ilike.%${s}%`);
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

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);

        const { data, count, error } = await query;
        if (error) throw error;

        const total = count || 0;
        return {
          products: (data as Product[]) || [],
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize) || 1,
        };
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local dataset:', err);
      }
    }

    // Local / Mock Provider Mode
    let items = getLocalProducts();

    if (featuredOnly) {
      items = items.filter((p) => p.featured);
    }

    if (category && category !== 'All Categories') {
      items = items.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (stock_status && stock_status !== 'all') {
      items = items.filter((p) => p.stock_status === stock_status);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    items = [...items].sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    const total = items.length;
    const from = (page - 1) * pageSize;
    const paginated = items.slice(from, from + pageSize);

    return {
      products: paginated,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  },

  /**
   * Fetches a single product by its URL-friendly slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        if (data) return data as Product;
      } catch (err) {
        console.warn('Supabase fetch by slug failed, checking local dataset:', err);
      }
    }

    const items = getLocalProducts();
    const product = items.find((p) => p.slug === slug);
    return product || null;
  },

  /**
   * Fetches a single product by its UUID
   */
  async getProductById(id: string): Promise<Product | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        if (data) return data as Product;
      } catch (err) {
        console.warn('Supabase fetch by id failed, checking local dataset:', err);
      }
    }

    const items = getLocalProducts();
    const product = items.find((p) => p.id === id);
    return product || null;
  },

  /**
   * Creates a new product (Admin Only)
   */
  async createProduct(
    productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Product> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();

        if (error) throw error;
        return data as Product;
      } catch (err) {
        console.warn('Supabase insert failed, saving to local store:', err);
      }
    }

    // Local mode creation
    const newProduct: Product = {
      ...productData,
      id: crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const items = getLocalProducts();
    items.unshift(newProduct);
    saveLocalProducts(items);
    return newProduct;
  },

  /**
   * Updates an existing product (Admin Only)
   */
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data as Product;
      } catch (err) {
        console.warn('Supabase update failed, updating local store:', err);
      }
    }

    // Local mode update
    const items = getLocalProducts();
    const index = items.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    const updatedProduct: Product = {
      ...items[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    items[index] = updatedProduct;
    saveLocalProducts(items);
    return updatedProduct;
  },

  /**
   * Deletes a product by ID (Admin Only)
   */
  async deleteProduct(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase delete failed, deleting from local store:', err);
      }
    }

    // Local mode delete
    const items = getLocalProducts();
    const filtered = items.filter((p) => p.id !== id);
    saveLocalProducts(filtered);
    return true;
  },

  /**
   * Aggregates stats for the Admin Dashboard
   */
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await this.getProducts({ pageSize: 1000 });
    const all = response.products;

    const categoriesSet = new Set(all.map((p) => p.category));
    const featuredCount = all.filter((p) => p.featured).length;
    const outOfStockCount = all.filter((p) => p.stock_status === 'out_of_stock').length;
    const recentProducts = all.slice(0, 5);

    return {
      totalProducts: all.length,
      featuredCount,
      categoriesCount: categoriesSet.size,
      outOfStockCount,
      recentProducts,
    };
  },
};
