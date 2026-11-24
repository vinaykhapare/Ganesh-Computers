import React from 'react';
import { CATEGORIES_LIST } from '../../constants/categories';
import {
  Laptop,
  RotateCcw,
  Mouse,
  Printer,
  Camera,
  Wrench,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  className = '',
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Computer & Laptops':
        return <Laptop className="w-3.5 h-3.5" />;
      case 'Second Computers & Laptops':
        return <RotateCcw className="w-3.5 h-3.5" />;
      case 'Computer Peripherals':
        return <Mouse className="w-3.5 h-3.5" />;
      case 'Cartridge & Tonner Refilling':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'Printer, Scanner, UPS, Invertors & Batteries':
        return <Printer className="w-3.5 h-3.5" />;
      case 'CCTV Cameras':
        return <Camera className="w-3.5 h-3.5" />;
      case 'Repairs & Services':
        return <Wrench className="w-3.5 h-3.5" />;
      default:
        return <LayoutGrid className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className={`overflow-x-auto pb-1 scrollbar-none ${className}`}>
      <div className="flex items-center gap-1.5 min-w-max p-1 bg-slate-100 rounded-lg border border-slate-200">
        {CATEGORIES_LIST.map((category) => {
          const isSelected =
            selectedCategory === category || (!selectedCategory && category === 'All Categories');
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer select-none ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <span className="opacity-80">{getCategoryIcon(category)}</span>
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
