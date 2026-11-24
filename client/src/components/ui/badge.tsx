import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium tracking-tight border transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-slate-900 text-white',
        secondary:
          'border-slate-200 bg-slate-100 text-slate-800',
        outline:
          'border-slate-200 bg-white text-slate-700',
        brand:
          'border-rose-200 bg-rose-50 text-rose-700',
        success:
          'border-emerald-200 bg-emerald-50 text-emerald-800 font-semibold',
        warning:
          'border-amber-200 bg-amber-50 text-amber-800 font-semibold',
        destructive:
          'border-red-200 bg-red-50 text-red-700 font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
