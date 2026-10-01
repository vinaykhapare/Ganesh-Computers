import { StockStatus } from '../types';

/**
 * Formats a numeric price into standard Indian Rupee (INR) representation
 * Example: 164999 -> ₹1,64,999
 */
export function formatPrice(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats ISO date string into a friendly localized display date
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Provides standardized visual cues, badges, and colors for stock availability
 */
export function getStockStatusConfig(status: StockStatus) {
  switch (status) {
    case 'in_stock':
      return {
        label: 'In Stock',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dotClass: 'bg-emerald-500',
        canInquire: true,
      };
    case 'limited_stock':
      return {
        label: 'Limited Stock',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
        dotClass: 'bg-amber-500 animate-pulse',
        canInquire: true,
      };
    case 'out_of_stock':
      return {
        label: 'Out of Stock',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
        dotClass: 'bg-rose-500',
        canInquire: true, // Customers can still inquire when new stock arrives
      };
    default:
      return {
        label: 'In Stock',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dotClass: 'bg-emerald-500',
        canInquire: true,
      };
  }
}
