import React from 'react';
import { StockStatus } from '../../types';
import { getStockStatusConfig } from '../../utils/formatters';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'featured';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5 rounded-lg' : 'text-xs px-2.5 py-1 rounded-xl';

  const variantClasses = {
    primary: 'bg-rose-50 text-rose-700 border border-rose-200/80',
    secondary: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    dark: 'bg-[#090D16] text-white border border-white/10',
    outline: 'border border-slate-300 text-slate-600',
    featured: 'bg-[#E11D48] text-white font-heading font-extrabold uppercase tracking-wider shadow-2xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-heading font-semibold ${sizeClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const StockBadge: React.FC<{ status: StockStatus; className?: string }> = ({
  status,
  className = '',
}) => {
  const config = getStockStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-heading font-bold uppercase tracking-wider rounded-lg border backdrop-blur-md shadow-2xs ${config.badgeClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      <span>{config.label}</span>
    </span>
  );
};
