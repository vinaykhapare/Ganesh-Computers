import React from 'react';
import { PackageSearch, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No products found',
  description = 'Try adjusting your search terms or filter criteria to discover our inventory.',
  actionText = 'Reset Filters',
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-xl border border-dashed border-slate-200 max-w-lg mx-auto my-6 shadow-2xs">
      <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
        {icon || <PackageSearch className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-bold font-heading text-slate-900 mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-5 leading-relaxed">{description}</p>
      {onAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          className="gap-2 font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{actionText}</span>
        </Button>
      )}
    </div>
  );
};
