import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Eye, ImageOff, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { StockBadge } from '../common/Badge';
import { generateProductInquiryUrl } from '../../utils/whatsapp';
import { InteractiveSpotlight } from '../common/InteractiveSpotlight';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const whatsappUrl = generateProductInquiryUrl(product);

  const fallbackImage = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';

  return (
    <InteractiveSpotlight
      spotlightColor="rgba(225, 29, 72, 0.07)"
      className="group rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-slate-300 transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full"
    >
      {/* Studio Hardware Canvas Area */}
      <div className="relative bg-gradient-to-b from-slate-50 via-slate-100/60 to-white aspect-[4/3] w-full flex items-center justify-center p-6 overflow-hidden border-b border-slate-100">
        {/* Category & Featured Badges */}
        <div className="absolute top-3.5 left-3.5 z-20 flex flex-col gap-1.5 items-start">
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200/80 shadow-2xs">
            {product.category}
          </span>
          {product.featured && (
            <span className="inline-flex items-center gap-1 text-[9px] font-heading font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#E11D48] text-white shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              Featured
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3.5 right-3.5 z-20">
          <StockBadge status={product.stock_status} />
        </div>

        {/* Product Media */}
        <Link
          to={`/products/${product.slug}`}
          className="w-full h-full flex items-center justify-center relative z-10"
        >
          {imageError || !product.image_url ? (
            <div className="flex flex-col items-center justify-center text-slate-400 bg-white/80 rounded-2xl w-full h-full border border-slate-200 border-dashed">
              <ImageOff className="w-7 h-7 mb-1.5 opacity-40" />
              <span className="text-[10px] font-bold tracking-wider uppercase opacity-60">No Media</span>
            </div>
          ) : (
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={product.image_url || fallbackImage}
              alt={product.name}
              loading="lazy"
              onError={() => setImageError(true)}
              className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:contrast-105"
            />
          )}
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white relative z-20">
        <div>
          <Link
            to={`/products/${product.slug}`}
            className="block text-base font-bold text-slate-900 group-hover:text-[#E11D48] transition-colors line-clamp-2 mb-2 font-heading tracking-tight leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>

          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed font-sans">
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                Store Price
              </span>
              <span className="text-2xl font-black text-slate-900 font-display tracking-tight leading-none">
                {formatPrice(product.price)}
              </span>
            </div>

            <Link
              to={`/products/${product.slug}`}
              className="text-xs font-heading font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 group/link"
            >
              <span>Specs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              to={`/products/${product.slug}`}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-heading font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all active:scale-95"
            >
              <Eye className="w-3.5 h-3.5 text-slate-600" />
              <span>Details</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-heading font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm hover:shadow-md hover:shadow-emerald-500/20 transition-all active:scale-95"
              title="Inquire via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Inquire</span>
            </a>
          </div>
        </div>
      </div>
    </InteractiveSpotlight>
  );
};