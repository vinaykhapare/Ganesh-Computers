import React, { useState, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProduct } from '../../hooks/useProduct';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/public/ProductCard';
import { StockBadge } from '../../components/common/Badge';
import { Spinner } from '../../components/common/Spinner';
import { formatPrice } from '../../utils/formatters';
import { generateProductInquiryUrl, STORE_DISPLAY_PHONE, STORE_OWNER, STORE_ADDRESS } from '../../utils/whatsapp';
import { 
  MessageCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  Share2, 
  Sparkles,
  ImageOff,
  ChevronRight,
  Info,
  Phone,
  MapPin,
  Cpu,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { MagneticButton } from '../../components/common/MagneticButton';
import { InteractiveSpotlight } from '../../components/common/InteractiveSpotlight';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [imageError, setImageError] = useState(false);

  const { product, isLoading, error } = useProduct(slug);

  // Fetch related products in the same category
  const { products: relatedProducts } = useProducts({
    category: product?.category,
    pageSize: 4,
  });

  useLayoutEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [slug, isLoading]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Ganesh Computers Product',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50/50">
        <Spinner size="lg" label="Loading hardware specifications..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50/50">
        <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 text-slate-400">
          <Info className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2 font-display">Hardware Item Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md font-sans text-sm">
          The requested hardware item could not be found or may have been sold. Browse our catalog for in-stock alternatives.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-sm transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const whatsappInquiryUrl = generateProductInquiryUrl(product);
  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] pb-24">
      <div className="pt-8 sm:pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center flex-wrap gap-2 text-xs text-slate-500 font-sans font-medium">
            <li>
              <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
            <li>
              <Link to="/products" className="hover:text-rose-600 transition-colors">Catalog</Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
            <li>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="hover:text-rose-600 transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
            <li className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">{product.name}</li>
          </ol>
        </nav>

        {/* Master Product Showcase Box */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/90 shadow-sm overflow-hidden mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Product Media Canvas */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 sm:p-14 border-b lg:border-b-0 lg:border-r border-slate-100 relative bg-gradient-to-b from-slate-50/70 via-slate-100/40 to-white">
              <div className="relative w-full aspect-square max-h-[480px] flex items-center justify-center group z-10">
                {product.featured && (
                  <div className="absolute top-0 left-0 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#E11D48] text-white text-[10px] font-heading font-extrabold uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  </div>
                )}

                <div className="absolute top-0 right-0 z-20">
                  <StockBadge status={product.stock_status} />
                </div>

                {imageError || !product.image_url ? (
                  <div className="flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl w-full h-full border border-slate-200 border-dashed">
                    <ImageOff className="w-10 h-10 mb-2 opacity-40" />
                    <span className="text-xs font-heading font-bold uppercase tracking-wider opacity-60">No Media</span>
                  </div>
                ) : (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    src={product.image_url}
                    alt={product.name}
                    onError={() => setImageError(true)}
                    className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-md"
                  />
                )}
              </div>

              <div className="w-full flex items-center justify-between mt-8 text-[11px] font-heading font-bold text-slate-400 px-2 uppercase tracking-wider">
                <span>SKU: {product.slug.slice(0, 10)}</span>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Product</span>
                </button>
              </div>
            </div>

            {/* Right: Specifications & Pricing Pane */}
            <div className="lg:col-span-6 flex flex-col p-8 sm:p-14 justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-heading font-bold uppercase tracking-wider mb-4">
                  {product.category}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display mb-6 leading-tight tracking-tight">
                  {product.name}
                </h1>

                {/* Price Terminal Box */}
                <div className="bg-[#090D16] text-white rounded-2xl p-6 mb-8 border border-white/10 shadow-lg">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-sans font-bold text-slate-400 block uppercase tracking-wider mb-1">
                        Listed Store Price
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight leading-none">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-heading font-bold bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      In-Store Pickup Available
                    </span>
                  </div>
                </div>

                {/* Description & Technical Specifications */}
                <div className="mb-8">
                  <h3 className="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Technical Overview & Details
                  </h3>
                  <div className="text-sm text-slate-600 font-sans leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    {product.description || 'Full technical specifications and serial diagnostics available in-store.'}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-sans font-medium text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Official Shop Warranty</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-sans font-medium text-slate-700">
                    <Cpu className="w-4 h-4 text-[#E11D48] shrink-0" />
                    <span>Tested by Mr. G.T. Patil</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: WhatsApp Direct Purchase Inquiry */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <MagneticButton strength={0.15} className="w-full">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Inquire on WhatsApp for This Product</span>
                  </a>
                </MagneticButton>

                <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1 font-sans">
                  <span>Questions about compatibility?</span>
                  <a
                    href={`tel:${STORE_DISPLAY_PHONE}`}
                    className="font-heading font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    Call {STORE_DISPLAY_PHONE}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Category Hardware Grid */}
        {filteredRelated.length > 0 && (
          <section className="pt-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 font-display tracking-tight">
                  Similar Hardware in {product.category}
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-1">
                  Other options available in our Gadhinglaj showroom inventory.
                </p>
              </div>

              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-heading font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <span>View All {product.category}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredRelated.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};