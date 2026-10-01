import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES_LIST } from '../../lib/mockData';
import { 
  Laptop, 
  RotateCcw, 
  Mouse, 
  Printer, 
  Camera, 
  Wrench, 
  LayoutGrid,
  Sparkles
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
    <div className={`overflow-x-auto pb-2 scrollbar-none ${className}`}>
      <div className="flex items-center gap-2 min-w-max p-1 bg-slate-100/80 rounded-2xl border border-slate-200/80">
        {CATEGORIES_LIST.map((category) => {
          const isSelected = selectedCategory === category || (!selectedCategory && category === 'All Categories');
          return (
            <motion.button
              whileTap={{ scale: 0.97 }}
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-heading font-bold transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#E11D48] text-white shadow-sm shadow-rose-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <span>{getCategoryIcon(category)}</span>
              <span>{category}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
