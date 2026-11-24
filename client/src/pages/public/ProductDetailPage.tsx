import React, { useState, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/public/ProductCard';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../../components/ui/breadcrumb';
import { formatPrice } from '../../utils/formatters';
import {
  generateProductInquiryUrl,
  STORE_DISPLAY_PHONE,
  STORE_OWNER,
  STORE_ADDRESS,
  STORE_HOURS,
} from '../../utils/whatsapp';
import {
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Share2,
  ImageOff,
  Phone,
  MapPin,
  Clock,
  Home,
  Package,
} from 'lucide-react';
import toast from 'react-hot-toast';

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
      navigator
        .share({
          title: product?.name || 'Ganesh Computers Product',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50">
        <div className="w-12 h-12 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center mb-4">
          <Package className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold font-heading text-slate-900 mb-2">Hardware Item Not Found</h2>
        <p className="text-slate-500 mb-6 max-w-sm font-sans text-xs sm:text-sm">
          The requested hardware item could not be found or may have been sold out.
        </p>
        <Link to="/products">
          <Button variant="default" className="gap-2 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalog</span>
          </Button>
        </Link>
      </div>
    );
  }

  const whatsappInquiryUrl = generateProductInquiryUrl(product);
  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const getStockBadge = () => {
    switch (product.stock_status) {
      case 'in_stock':
        return <Badge variant="success">In Stock at Showroom</Badge>;
      case 'limited_stock':
        return <Badge variant="warning">Limited Stock Available</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Currently Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">Available</Badge>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* 1. Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="inline-flex items-center gap-1 hover:text-slate-900">
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to="/products" className="hover:text-slate-900">
                  Products
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  className="hover:text-slate-900"
                >
                  {product.category}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* 2. Main Product Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Product Image Showcase */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full rounded-lg border border-slate-200 bg-slate-50/70 p-6 flex items-center justify-center overflow-hidden">
                {imageError || !product.image_url ? (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <ImageOff className="w-12 h-12 opacity-40 mb-2" />
                    <span className="text-xs font-medium text-slate-400">No hardware media available</span>
                  </div>
                ) : (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    onError={() => setImageError(true)}
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>

              {/* Showroom Verification Highlights */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Tested Hardware</span>
                  </div>
                  <p className="text-slate-500">In-house hardware bench tested before handover</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-0.5">
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>Showroom Pickup</span>
                  </div>
                  <p className="text-slate-500">Ready for collection at Subhash Road, Gadhinglaj</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-0.5">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>Direct Dealer Help</span>
                  </div>
                  <p className="text-slate-500">Supported by Mr. G.T. Patil ({STORE_DISPLAY_PHONE})</p>
                </div>
              </div>
            </div>

            {/* Right: Technical Spec & Action Block */}
            <div className="lg:col-span-5 space-y-5">
              {/* Category & Stock Badges */}
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="font-semibold text-xs">
                  {product.category}
                </Badge>
                {getStockBadge()}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-snug tracking-tight">
                  {product.name}
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-1">Ref / SKU: {product.slug}</p>
              </div>

              {/* Price Display */}
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-0.5">
                  Showroom Price (INR)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-heading text-slate-900 tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-slate-500 font-sans">Inclusive of all local dealer taxes</span>
                </div>
              </div>

              {/* Description preview */}
              {product.description && (
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans whitespace-pre-line border-t border-slate-100 pt-3">
                  {product.description}
                </div>
              )}

              {/* Actions: Primary WhatsApp Inquiry + Call */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex"
                >
                  <Button variant="whatsapp" size="lg" className="w-full font-bold gap-2">
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Inquire Availability on WhatsApp</span>
                  </Button>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${STORE_DISPLAY_PHONE.replace(/\s+/g, '')}`}
                    className="w-full inline-flex"
                  >
                    <Button variant="outline" size="sm" className="w-full font-semibold gap-1.5">
                      <Phone className="w-4 h-4" />
                      <span>Call Showroom</span>
                    </Button>
                  </a>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="w-full font-semibold gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Item</span>
                  </Button>
                </div>
              </div>

              {/* Store Consultation Info */}
              <div className="rounded-lg border border-slate-200 p-3.5 bg-slate-50 text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-900">Need specific custom specs or trade-in?</div>
                <p className="text-slate-500 text-[11px]">
                  We assemble custom rigs and test pre-owned laptops in person. Visit our Subhash Road showroom for physical inspection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Detailed Product Tabs */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
          <Tabs defaultValue="specs">
            <TabsList>
              <TabsTrigger value="specs">Hardware Specifications</TabsTrigger>
              <TabsTrigger value="warranty">In-Store Warranty & Testing</TabsTrigger>
              <TabsTrigger value="store">Showroom Location & Timings</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="pt-6">
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-heading text-sm font-bold text-slate-900">
                  Full Technical Overview
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed whitespace-pre-line">
                  {product.description || 'No detailed specifications provided for this hardware unit.'}
                </p>

                <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                    <span className="font-semibold text-slate-800">{product.category}</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Availability</span>
                    <span className="font-semibold text-slate-800">{product.stock_status.replace('_', ' ')}</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Showroom Price</span>
                    <span className="font-semibold text-slate-800">{formatPrice(product.price)}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="warranty" className="pt-6">
              <div className="space-y-3 max-w-2xl text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                <h3 className="font-heading text-sm font-bold text-slate-900">
                  Warranty & Quality Guarantee Policy
                </h3>
                <p>
                  At <strong>Ganesh Computers</strong>, every unit is checked by qualified technicians before it leaves the store:
                </p>
                <ul className="space-y-2 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Brand New Products:</strong> Covered by full official manufacturer brand warranty (Dell, HP, Lenovo, ASUS, etc.).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Certified Pre-Owned:</strong> Tested across 48 parameters (motherboard voltage, SSD health, screen lines, keyboard keys, battery backup). Comes with testing warranty by Mr. G.T. Patil.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Service & Repairs:</strong> 100% transparent diagnostics with fair repair estimates before proceeding with chip-level work.</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="store" className="pt-6">
              <div className="space-y-3 max-w-2xl text-xs sm:text-sm text-slate-600 font-sans">
                <h3 className="font-heading text-sm font-bold text-slate-900">
                  Showroom Address & Visiting Information
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                    <span><strong>Address:</strong> {STORE_ADDRESS}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-700 shrink-0" />
                    <span><strong>Store Hours:</strong> {STORE_HOURS}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-700 shrink-0" />
                    <span><strong>Proprietor Contact:</strong> Mr. G.T. Patil ({STORE_DISPLAY_PHONE})</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 4. Related Products in Same Category */}
        {filteredRelated.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Related in {product.category}
              </h3>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900"
              >
                View all in category →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredRelated.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
