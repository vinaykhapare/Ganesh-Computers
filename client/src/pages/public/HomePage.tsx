import React from 'react';
import { Link } from 'react-router-dom';
import { HeroBanner } from '../../components/public/HeroBanner';
import { ProductCard } from '../../components/public/ProductCard';
import { WhyChooseUs } from '../../components/public/WhyChooseUs';
import { Skeleton } from '../../components/ui/skeleton';
import { Button } from '../../components/ui/button';
import { useProducts } from '../../hooks/useProducts';
import { generateGeneralInquiryUrl, STORE_DISPLAY_PHONE } from '../../utils/whatsapp';
import {
  ArrowRight,
  Laptop,
  RotateCcw,
  Mouse,
  Printer,
  Camera,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Package,
  Wrench,
} from 'lucide-react';

const hardwareDepartments = [
  {
    name: 'Computer & Laptops',
    title: 'Brand New Laptops & PCs',
    desc: 'Dell, HP, Lenovo & custom gaming desktop assemblies with brand warranty.',
    icon: Laptop,
    path: '/products?category=Computer+%26+Laptops',
  },
  {
    name: 'Second Computers & Laptops',
    title: 'Certified Pre-Owned Systems',
    desc: '48-point bench tested laptops with SSD upgrades & store testing warranty.',
    icon: RotateCcw,
    path: '/products?category=Second+Computers+%26+Laptops',
  },
  {
    name: 'Computer Peripherals',
    title: 'Peripherals & Components',
    desc: 'Keyboards, wireless mice, DDR4/DDR5 RAM, SSDs, and displays.',
    icon: Mouse,
    path: '/products?category=Computer+Peripherals',
  },
  {
    name: 'CCTV Cameras',
    title: 'CCTV Security & Surveillance',
    desc: 'HD night-vision cameras, DVR kits, and mobile live streaming setup.',
    icon: Camera,
    path: '/products?category=CCTV+Cameras',
  },
  {
    name: 'Printer, Scanner, UPS, Invertors & Batteries',
    title: 'Printers, Inverters & Power Backup',
    desc: 'Laser office printers, APC/Luminous inverters, and battery backups.',
    icon: Printer,
    path: '/products?category=Printer%2C+Scanner%2C+UPS%2C+Invertors+%26+Batteries',
  },
  {
    name: 'Repairs & Services',
    title: 'Motherboard & Repair Bench',
    desc: 'Chip-level soldering, broken hinge repair, and display replacement.',
    icon: Wrench,
    path: '/products?category=Repairs+%26+Services',
  },
];

const trustBar = [
  {
    icon: ShieldCheck,
    title: '10+ Years Trust in Gadhinglaj',
    desc: 'Serving Kolhapur district on Subhash Road since 2010.',
  },
  {
    icon: Cpu,
    title: 'In-House Diagnostics Lab',
    desc: 'Chip-level motherboard repair & precision toner refilling bench.',
  },
  {
    icon: TrendingUp,
    title: 'Direct Dealer Pricing',
    desc: 'Transparent pricing with direct support by Mr. G.T. Patil.',
  },
];

export const HomePage: React.FC = () => {
  // Query all products from Supabase
  const { products, isLoading } = useProducts({
    pageSize: 8,
    sortBy: 'newest',
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Showcase Section */}
      <HeroBanner />

      {/* 2. Precision Trust Strip */}
      <section className="border-b border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {trustBar.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`flex items-start gap-3.5 ${index > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''}`}>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Hardware Departments Grid */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D92344] font-heading block mb-1">
              Store Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
              Hardware Departments
            </h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-slate-900 hover:text-slate-600 inline-flex items-center gap-1">
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hardwareDepartments.map((dept) => {
            const Icon = dept.icon;
            return (
              <Link
                key={dept.name}
                to={dept.path}
                className="group rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-900 mb-1.5 group-hover:text-slate-700 transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {dept.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">
                  <span>Explore Department</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Live Inventory & Featured Showcase */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D92344] font-heading block mb-1">
                Showroom Inventory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
                Live Store Showcase
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                Verified systems and components currently cataloged at our Subhash Road showroom.
              </p>
            </div>

            <Link to="/products">
              <Button variant="outline" size="sm" className="font-semibold gap-1.5">
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Product Grid / Empty State */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                  <Skeleton className="h-44 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-8 w-full rounded-md" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900">
                  Showroom Catalog Updating
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1 leading-relaxed">
                  We are updating live inventory for laptops, CCTV kits, and components. For immediate model availability and price quotes, please contact Mr. G.T. Patil directly.
                </p>
              </div>
              <div>
                <a
                  href={generateGeneralInquiryUrl('Inquiring about showroom inventory availability')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="sm" className="font-semibold">
                    Inquire on WhatsApp ({STORE_DISPLAY_PHONE})
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. In-House Technical Lab & Service Highlights */}
      <WhyChooseUs />
    </div>
  );
};
