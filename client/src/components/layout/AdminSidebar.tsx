import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ExternalLink,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';

export const AdminSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Hardware Inventory', path: '/admin/products', icon: Package },
    { label: 'Add New Product', path: '/admin/products/new', icon: PlusCircle },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between border-r border-slate-800 min-h-screen font-sans">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800">
          <Logo size="sm" theme="dark" showSubtitle={false} />
          <div className="mt-1.5 text-[11px] font-heading font-semibold text-slate-400">
            Showroom Admin Portal
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
            Store Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                end={item.path === '/admin/dashboard' || item.path === '/admin/products'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0 text-slate-400" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-4 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
            Storefront
          </div>

          <Link
            to="/products"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Live Store Catalog</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* Admin User Info & Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">Administrator</div>
            <div className="text-[11px] text-slate-400 truncate">
              {user?.email || 'Owner Account'}
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-red-900/40 border border-slate-700/80 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
};
