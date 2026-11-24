import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, ImageOff } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { generateProductInquiryUrl } from '../../utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const whatsappUrl = generateProductInquiryUrl(product);

  const getStockBadge = () => {
    switch (product.stock_status) {
      case 'in_stock':
        return <Badge variant="success">In Stock</Badge>;
      case 'limited_stock':
        return <Badge variant="warning">Limited Stock</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">Available</Badge>;
    }
  };

  return (
    <div className="group rounded-xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col h-full overflow-hidden">
      {/* 1. Hardware Media Canvas */}
      <div className="relative aspect-[4/3] w-full bg-slate-50/70 border-b border-slate-100 flex items-center justify-center p-4 overflow-hidden">
        {/* Badges on Media */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1.5 items-center">
          <Badge variant="outline" className="bg-white/95 text-[11px] font-medium text-slate-700">
            {product.category}
          </Badge>
          {product.featured && (
            <Badge variant="brand" className="text-[10px]">
              Featured
            </Badge>
          )}
        </div>

        <div className="absolute top-2.5 right-2.5 z-10">
          {getStockBadge()}
        </div>

        <Link
          to={`/products/${product.slug}`}
          className="w-full h-full flex items-center justify-center"
        >
          {imageError || !product.image_url ? (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <ImageOff className="w-8 h-8 opacity-40 mb-1" />
              <span className="text-[11px] font-medium text-slate-400">Hardware Image</span>
            </div>
          ) : (
            <img
              src={product.image_url}
              alt={product.name}
              loading="lazy"
              onError={() => setImageError(true)}
              className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
            />
          )}
        </Link>
      </div>

      {/* 2. Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link
            to={`/products/${product.slug}`}
            className="font-heading font-semibold text-slate-900 group-hover:text-slate-700 transition-colors text-sm line-clamp-2 leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>

          {product.description && (
            <p className="mt-1.5 text-xs text-slate-500 font-sans line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* 3. Price & Action Block */}
        <div className="pt-2 border-t border-slate-100 mt-auto">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                Showroom Price
              </span>
              <span className="text-lg font-bold font-heading text-slate-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link to={`/products/${product.slug}`} className="w-full">
              <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                Details
              </Button>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="whatsapp" size="sm" className="w-full text-xs font-semibold gap-1.5 px-2">
                <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>Inquire</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
