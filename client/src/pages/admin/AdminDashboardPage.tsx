import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../../services/productService';
import { DashboardStats } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { StockBadge } from '../../components/common/Badge';
import { Spinner } from '../../components/common/Spinner';
import { 
  Package, 
  Sparkles, 
  Layers, 
  AlertCircle, 
  PlusCircle, 
  ArrowRight, 
  ExternalLink,
  Edit,
  Eye,
  Cpu
} from 'lucide-react';
import { InteractiveSpotlight } from '../../components/common/InteractiveSpotlight';

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
      <div className="min-h-[50vh] flex items-center justify-center">
        <Spinner size="lg" label="Compiling Dashboard Metrics..." />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Products in Catalog',
      value: stats?.totalProducts || 0,
      icon: <Package className="w-5 h-5 text-blue-500" />,
      bg: 'bg-blue-50/80 border-blue-200/80',
    },
    {
      label: 'Featured Products',
      value: stats?.featuredCount || 0,
      icon: <Sparkles className="w-5 h-5 text-[#E11D48]" />,
      bg: 'bg-rose-50/80 border-rose-200/80',
    },
    {
      label: 'Active Departments',
      value: stats?.categoriesCount || 0,
      icon: <Layers className="w-5 h-5 text-purple-500" />,
      bg: 'bg-purple-50/80 border-purple-200/80',
    },
    {
      label: 'Out of Stock Items',
      value: stats?.outOfStockCount || 0,
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      bg: 'bg-amber-50/80 border-amber-200/80',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#090D16] rounded-3xl p-6 sm:p-8 text-white border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-300 text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Store Operations Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Ganesh Computers Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300/90 font-sans mt-1 max-w-xl">
            Real-time management for store inventory, pricing, high-resolution product photos, and customer WhatsApp inquiries.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-heading font-bold text-xs sm:text-sm shadow-md shadow-rose-600/30 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            to="/products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-xs sm:text-sm transition-colors border border-white/10"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Storefront</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => (
          <InteractiveSpotlight
            key={idx}
            className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider mb-1">
                {card.label}
              </p>
              <p className="text-3xl font-black text-slate-900 font-display">
                {card.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-2xl ${card.bg} border flex items-center justify-center shrink-0`}>
              {card.icon}
            </div>
          </InteractiveSpotlight>
        ))}
      </div>

      {/* Recent Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              Recently Added Inventory
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              The latest items published to your public storefront catalog.
            </p>
          </div>
          <Link
            to="/admin/products"
            className="text-xs font-heading font-bold text-[#E11D48] hover:text-[#BE123C] flex items-center gap-1"
          >
            <span>Manage All Hardware</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Store Price</th>
                <th className="px-6 py-3.5">Availability</th>
                <th className="px-6 py-3.5">Featured</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats?.recentProducts && stats.recentProducts.length > 0 ? (
                stats.recentProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center">
                          {p.image_url ? (
                            <img
                              src={p.image_url}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-heading font-bold text-slate-900 line-clamp-1">{p.name}</p>
                          <p className="text-[11px] text-slate-400">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-sans text-slate-600 font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-display font-black text-slate-900">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-6 py-4">
                      <StockBadge status={p.stock_status} />
                    </td>
                    <td className="px-6 py-4">
                      {p.featured ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-heading font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/products/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/products/edit/${p.id}`}
                          className="p-1.5 text-slate-600 hover:text-[#E11D48] hover:bg-rose-50 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-xs">
                    No products added yet. Click &ldquo;Add New Product&rdquo; above to publish your first inventory item!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
