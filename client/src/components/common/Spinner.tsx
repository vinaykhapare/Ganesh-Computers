import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '', label }) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${sizeMap[size]} border-rose-200 border-t-[#E11D48] rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {label && <p className="text-sm font-medium text-slate-500 animate-pulse">{label}</p>}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 overflow-hidden animate-pulse flex flex-col justify-between">
      <div>
        <div className="w-full h-48 bg-slate-200 rounded-xl mb-4" />
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 bg-slate-200 rounded-full" />
          <div className="h-5 w-20 bg-slate-200 rounded-full" />
        </div>
        <div className="h-5 bg-slate-200 rounded w-4/5 mb-2" />
        <div className="h-4 bg-slate-100 rounded w-full mb-1" />
        <div className="h-4 bg-slate-100 rounded w-2/3 mb-4" />
      </div>
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="h-6 w-24 bg-slate-200 rounded" />
        <div className="h-9 w-28 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
};
