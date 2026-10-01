import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost' | 'whatsapp' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-heading font-semibold rounded-2xl tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none overflow-hidden';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-9 rounded-xl',
    md: 'text-sm px-5 py-2.5 gap-2 h-11',
    lg: 'text-base px-7 py-3.5 gap-2.5 h-13',
  };

  const variantClasses = {
    primary:
      'bg-[#E11D48] text-white hover:bg-[#BE123C] focus:ring-[#E11D48] shadow-sm hover:shadow-lg hover:shadow-rose-500/25 border border-rose-600/30',
    secondary:
      'bg-white text-slate-900 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-300 shadow-2xs hover:shadow-sm',
    dark:
      'bg-[#090D16] text-white hover:bg-[#161F36] focus:ring-slate-700 shadow-md border border-white/10',
    outline:
      'border border-slate-300 text-slate-800 hover:border-[#E11D48] hover:text-[#E11D48] hover:bg-rose-50/50 focus:ring-[#E11D48]',
    ghost:
      'text-slate-700 hover:bg-slate-100 hover:text-slate-950 focus:ring-slate-200',
    whatsapp:
      'bg-[#25D366] text-white hover:bg-[#1EBE5D] focus:ring-[#25D366] shadow-sm hover:shadow-xl hover:shadow-emerald-500/25 border border-emerald-400/30',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm border border-red-700/30',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};
