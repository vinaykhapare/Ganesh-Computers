import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { DashboardStats } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import {
  Package,
  Sparkles,
  Layers,
  AlertCircle,
  PlusCircle,
  ExternalLink,
  Edit,
  Eye,
  Cpu,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await productService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Catalog Products',
      value: stats?.totalProducts || 0,
      icon: <Package className="w-5 h-5 text-blue-600" />,
      sub: 'Items stored in Supabase',
    },
    {
      label: 'Featured Products',
      value: stats?.featuredCount || 0,
      icon: <Sparkles className="w-5 h-5 text-rose-600" />,
      sub: 'Shown on store highlights',
    },
    {
      label: 'Active Departments',
      value: stats?.categoriesCount || 0,
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      sub: 'Hardware categories active',
    },
    {
      label: 'Out of Stock Items',
      value: stats?.outOfStockCount || 0,
      icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
      sub: 'Needs replenishment',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Retail Banner */}
      <div className="bg-slate-900 rounded-xl p-6 sm:p-7 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-300 text-xs font-semibold mb-2 border border-slate-700">
            <Cpu className="w-3.5 h-3.5" />
            <span>Store Operations Hub</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Ganesh Computers Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1 max-w-xl">
            Live catalog management for showroom inventory, pricing, specifications, and customer inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link to="/admin/products/new">
            <Button variant="default" size="sm" className="bg-white text-slate-900 hover:bg-slate-100 font-bold gap-2">
              <PlusCircle className="w-4 h-4" />
              <span>Add Hardware Item</span>
            </Button>
          </Link>
          <Link to="/admin/products">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white font-semibold">
              Manage Inventory
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 font-sans">{card.label}</span>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">{card.icon}</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-heading text-slate-900">{card.value}</div>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Catalog Items Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">
              Recently Cataloged Products
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest items synchronized from your Supabase database.
            </p>
          </div>
          <Link to="/admin/products">
            <Button variant="outline" size="sm" className="text-xs font-semibold">
              View All ({stats?.totalProducts || 0})
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {stats?.recentProducts && stats.recentProducts.length > 0 ? (
            stats.recentProducts.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
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
                  <div className="min-w-0">
                    <Link
                      to={`/admin/products/edit/${item.id}`}
                      className="text-xs sm:text-sm font-bold font-heading text-slate-900 hover:text-rose-600 transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-400 font-mono">/{item.slug}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-600 font-medium">{item.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm font-bold font-heading text-slate-900">
                    {formatPrice(item.price)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link to={`/products/${item.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to={`/admin/products/edit/${item.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-slate-900">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No products found in the catalog. Click "Add Hardware Item" to publish your first product.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
