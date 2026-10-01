import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeroBanner } from '../../components/public/HeroBanner';
import { ProductCard } from '../../components/public/ProductCard';
import { WhyChooseUs } from '../../components/public/WhyChooseUs';
import { CardSkeleton } from '../../components/common/Spinner';
import { useProducts } from '../../hooks/useProducts';
import { generateGeneralInquiryUrl, STORE_DISPLAY_PHONE, STORE_ADDRESS } from '../../utils/whatsapp';
import {
  ArrowRight,
  ArrowUpRight,
  Laptop,
  RotateCcw,
  Mouse,
  Printer,
  Camera,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  PackageCheck,
  MessageCircle,
  MapPin,
  Clock,
  Cpu,
} from 'lucide-react';
import { InteractiveSpotlight } from '../../components/common/InteractiveSpotlight';
import { MagneticButton } from '../../components/common/MagneticButton';
import { containerStagger, itemFadeUp } from '../../lib/motion';

const departmentCards = [
  {
    name: 'Computer & Laptops',
    label: 'Brand New Laptops & Custom Rigs',
    desc: 'High-performance gaming laptops, Creator OLED machines, and custom assembled desktop towers.',
    icon: Laptop,
    featured: true,
    accent: 'bg-rose-50 text-rose-600',
    tag: 'Popular',
  },
  {
    name: 'Second Computers & Laptops',
    label: 'Certified Pre-Owned Systems',
    desc: '48-point bench tested laptops with SSD upgrades, original chargers, and store warranties.',
    icon: RotateCcw,
    featured: true,
    accent: 'bg-amber-50 text-amber-600',
    tag: 'Best Value',
  },
  {
    name: 'Computer Peripherals',
    label: 'Peripherals & Components',
    desc: 'Mechanical keyboards, 240Hz monitors, wireless mice, DDR5 RAM, and Gen4 NVMe SSDs.',
    icon: Mouse,
    accent: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'Printer, Scanner, UPS, Invertors & Batteries',
    label: 'Printers, Inverters & Power Backup',
    desc: 'Laser office printers, APC/Luminous inverters, and heavy-duty battery setups.',
    icon: Printer,
    accent: 'bg-emerald-50 text-emerald-600',
  },
  {
    name: 'CCTV Cameras',
    label: 'CCTV Security & Surveillance',
    desc: 'HD night-vision cameras, DVR recording kits, and remote mobile viewing setup.',
    icon: Camera,
    accent: 'bg-slate-100 text-slate-800',
  },
];

const trustStats = [
  {
    icon: ShieldCheck,
    title: '10+ Years Trust',
    desc: 'Serving Gadhinglaj & Kolhapur district since 2010.',
  },
  {
    icon: Cpu,
    title: 'In-House Diagnostics',
    desc: 'Chip-level motherboard repair & toner refilling bench.',
  },
  {
    icon: TrendingUp,
    title: 'Direct Dealer Pricing',
    desc: 'Transparent pricing with direct support by Mr. G.T. Patil.',
  },
];

export const HomePage: React.FC = () => {
  const { products: featuredProducts, isLoading } = useProducts({
    featuredOnly: true,
    pageSize: 8,
  });

  return (
    <div className="bg-[#F8FAFC] selection:bg-rose-500/25 min-h-screen">
      {/* 1. Hero Showcase Section */}
      <HeroBanner />

      {/* 2. Precision Trust Strip (Overlapping the hero boundary) */}
<section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 mb-20">
  {/* Base Floating Shell */}
  <div className="relative rounded-3xl bg-white p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.06]">
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2">
      {trustStats.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="group relative flex items-center gap-4 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:bg-slate-50/90"
          >
            {/* Subtle Active Inset Border on Hover */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-slate-200/60 transition-colors pointer-events-none" />

            {/* Icon Container with Custom Depth */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50/80 text-[#E11D48] transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:bg-[#E11D48] group-hover:text-white group-hover:shadow-md group-hover:shadow-rose-500/20">
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-105" />
            </div>

            {/* Content Block */}
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-sm font-bold tracking-tight text-slate-800 transition-colors group-hover:text-slate-950 sm:text-[15px]">
                {item.title}
              </h3>
              <p className="mt-0.5 font-sans text-xs leading-normal text-slate-500/90 line-clamp-2">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* 3. Featured Hardware Showcase Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-600 text-[11px] font-heading font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              <span>In-Store Highlights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight leading-tight">
              Featured Systems & Equipment
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-sans leading-relaxed">
              Hand-picked workstations, Laptops and PC's, and components available for instant pickup.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#090D16] text-white text-xs font-heading font-bold hover:bg-[#161F36] shadow-sm transition-all"
          >
            <span>View Complete Inventory</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product Grid or Clean Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs max-w-xl mx-auto">
            <span className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <PackageCheck className="w-7 h-7" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
              Fresh In-Store Stock Arriving Daily
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-sans mb-6 leading-relaxed">
              We are cataloging our latest stock of laptops, custom desktop PCs, CCTV cameras, and components. Contact Mr. G.T. Patil directly on WhatsApp for immediate live availability and price quotes.
            </p>
<MagneticButton strength={0.2}>
  <a
    href={generateGeneralInquiryUrl('Inquiring about in-store stock from Homepage')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Inquire on WhatsApp at 9373873513"
    className="group relative inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-5 sm:px-6 py-3 sm:py-3.5 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30 transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
  >
    {/* Authentic SVG WhatsApp Icon with Tactile Micro-Tilt */}
    <svg
      className="h-4 w-4 shrink-0 fill-current transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.177-1.238-6.163-3.486-8.412" />
    </svg>

    {/* Structured Typography with Monospace Badge for Phone Number */}
    <span className="font-heading text-xs sm:text-sm font-semibold tracking-tight">
      Inquire on WhatsApp
    </span>

    {/* Discrete Phone Badge for Scannability */}
    <span className="rounded-lg bg-black/15 px-2 py-0.5 font-mono text-[11px] font-medium text-white/90 backdrop-blur-xs transition-colors group-hover:bg-black/20 group-hover:text-white">
      9373873513
    </span>
  </a>
</MagneticButton>
          </div>
        )}
      </section>

      {/* 4. Asymmetric Hardware Department Bento Grid */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight leading-tight">
              Explore by Hardware Department
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-sans leading-relaxed">
              Browse by taxonomy to see live specifications, availability status, and direct WhatsApp inquiry options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {departmentCards.map((dept, index) => {
              const Icon = dept.icon;
              const isLarge = dept.featured && index === 0;

              return (
                <Link
                  key={dept.name}
                  to={`/products?category=${encodeURIComponent(dept.name)}`}
                  className={`group relative p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isLarge
                      ? 'md:col-span-2 lg:col-span-2 bg-[#090D16] text-white border-white/10 hover:border-white/20 shadow-xl'
                      : 'bg-[#F8FAFC] text-slate-900 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-lg'
                  }`}
                >
                  {isLarge && (
                    <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
                  )}

                  <div className="relative z-10 flex items-start justify-between mb-8">
                    <span
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                        isLarge ? 'bg-white/10 text-rose-400' : dept.accent
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </span>

                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isLarge
                          ? 'bg-white/10 text-white group-hover:bg-[#E11D48]'
                          : 'bg-white text-slate-700 shadow-2xs group-hover:bg-[#E11D48] group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="relative z-10">
                    {dept.tag && (
                      <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider text-rose-500 mb-1 block">
                        {dept.tag}
                      </span>
                    )}
                    <h3
                      className={`font-bold font-heading tracking-tight mb-2 ${
                        isLarge ? 'text-2xl text-white' : 'text-lg text-slate-900'
                      }`}
                    >
                      {dept.label}
                    </h3>
                    <p
                      className={`text-xs font-sans leading-relaxed ${
                        isLarge ? 'text-slate-400 max-w-lg' : 'text-slate-500'
                      }`}
                    >
                      {dept.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Core Services & Technical Lab Section */}
      <WhyChooseUs />
    </div>
  );
};