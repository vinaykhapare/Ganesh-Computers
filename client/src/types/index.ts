export type StockStatus = 'in_stock' | 'limited_stock' | 'out_of_stock';

export type ProductCategory = 
  | 'Laptops'
  | 'Desktops & Workstations'
  | 'Components'
  | 'Monitors'
  | 'Peripherals'
  | 'Storage'
  | 'Networking'
  | 'Accessories'
  | string;

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category: ProductCategory;
  image_url: string | null;
  stock_status: StockStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFilterParams {
  search?: string;
  category?: string;
  stock_status?: StockStatus | 'all';
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'name_asc';
  featuredOnly?: boolean;
  page?: number;
  pageSize?: number;
}

export interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DashboardStats {
  totalProducts: number;
  featuredCount: number;
  categoriesCount: number;
  outOfStockCount: number;
  recentProducts: Product[];
}

export interface CategoryInfo {
  name: string;
  count: number;
  iconName?: string;
  description?: string;
}
