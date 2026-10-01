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
    <aside className="w-64 bg-[#070A12] text-white flex flex-col justify-between border-r border-white/10 min-h-screen font-sans">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-white/[0.08]">
          <Logo size="sm" theme="dark" showSubtitle={false} />
          <div className="mt-2 text-[10px] font-heading font-extrabold tracking-widest uppercase text-rose-400">
            Control Center • Gadhinglaj
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-heading font-extrabold uppercase tracking-widest text-slate-400">
            Catalog Management
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
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-heading font-bold transition-all ${
                    isActive
                      ? 'bg-[#E11D48] text-white shadow-md shadow-rose-600/30'
                      : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-6 px-3 py-2 text-[10px] font-heading font-extrabold uppercase tracking-widest text-slate-400">
            Quick Actions
          </div>

          <Link
            to="/products"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-heading font-bold text-slate-400 hover:bg-white/[0.06] hover:text-white transition-all"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-rose-400" />
              <span>Live Public Catalog</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* Admin User Info & Logout */}
      <div className="p-4 border-t border-white/[0.08] bg-[#050810]">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-heading font-bold text-white truncate">Administrator</div>
            <div className="text-[11px] text-slate-400 truncate">
              {user?.email || 'Owner Portal'}
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-heading font-bold text-slate-300 hover:text-white bg-white/[0.06] hover:bg-red-950/40 hover:border-red-800 border border-white/10 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
};
