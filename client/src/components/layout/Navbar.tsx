import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, MessageCircle, Phone,
  MapPin, Clock, ChevronDown, Laptop,
  RotateCcw, Mouse, Printer, Camera, ArrowRight, Sparkles
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { MagneticButton } from '../common/MagneticButton';
import {
  generateGeneralInquiryUrl,
  STORE_DISPLAY_PHONE,
  STORE_ADDRESS,
} from '../../utils/whatsapp';

const primaryNav = [
  { name: 'Home', path: '/' },
  { name: 'Hardware Catalog', path: '/products' },
];

const categoryItems = [
  {
    name: 'New Laptops & PCs',
    category: 'Computer & Laptops',
    desc: 'Gaming rigs, Creator & Business laptops',
    icon: Laptop,
    path: '/products?category=Computer+%26+Laptops',
  },
  {
    name: 'Refurbished & 2nd Hand',
    category: 'Second Computers & Laptops',
    desc: 'Tested & certified laptops with warranty',
    icon: RotateCcw,
    path: '/products?category=Second+Computers+%26+Laptops',
  },
  {
    name: 'Computer Peripherals',
    category: 'Computer Peripherals',
    desc: 'Monitors, mechanical keyboards, gaming mice',
    icon: Mouse,
    path: '/products?category=Computer+Peripherals',
  },
  {
    name: 'Printers, UPS & Inverters',
    category: 'Printer, Scanner, UPS, Invertors & Batteries',
    desc: 'Power backup, laser printers, cartridge refilling',
    icon: Printer,
    path: '/products?category=Printer%2C+Scanner%2C+UPS%2C+Invertors+%26+Batteries',
  },
  {
    name: 'CCTV Surveillance',
    category: 'CCTV Cameras',
    desc: 'HD security cameras & DVR installation',
    icon: Camera,
    path: '/products?category=CCTV+Cameras',
  },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname, location.search]);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname + location.search === path;
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Precision Status Bar */}
      <div className="bg-[#090D16] text-white/80 border-b border-white/[0.08] text-[11px] font-sans py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              In-Store Open Today
            </span>
            <span className="hidden md:inline-block text-white/20">•</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-[#E11D48]" />
              {STORE_ADDRESS}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-3 text-xs text-slate-300">
  {/* Hours */}
  <span className="flex items-center gap-1.5">
    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
    <span>10:30 AM – 7:30 PM</span>
  </span>

  {/* Separator Dot */}
  <span className="w-1 h-1 rounded-full bg-slate-600" aria-hidden="true" />

  {/* Availability Badge */}
  <span className="text-slate-400">
    Open Daily <span className="text-rose-400 font-medium">(Closed Tue)</span>
  </span>
</div>
            <a
              href={`tel:${STORE_DISPLAY_PHONE}`}
              className="inline-flex items-center gap-1.5 font-bold text-white hover:text-rose-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-rose-500" />
              <span>{STORE_DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${scrolled
          ? 'bg-white/92 backdrop-blur-xl border-b border-slate-200/90 shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/70">
            {primaryNav.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-xs font-heading font-bold transition-colors ${active ? 'text-slate-900' : 'text-slate-600 hover:text-slate-950'
                    }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200/80 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}

            {/* Categories Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onMouseEnter={() => setCategoriesOpen(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-heading font-bold transition-colors cursor-pointer ${categoriesOpen ? 'text-rose-600 bg-white shadow-2xs' : 'text-slate-600 hover:text-slate-950'
                  }`}
              >
                <span>Hardware Departments</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoriesOpen ? 'rotate-180 text-rose-600' : ''}`} />
              </button>

              {/* Flyout Menu */}
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    onMouseLeave={() => setCategoriesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-80 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xl z-50"
                  >
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
                      Store Departments
                    </div>
                    <div className="space-y-1">
                      {categoryItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setCategoriesOpen(false)}
                            className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                          >
                            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-[#E11D48] group-hover:text-white transition-colors">
                              <Icon className="w-4 h-4" />
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 group-hover:text-[#E11D48] transition-colors">
                                {item.name}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Action: WhatsApp Magnetic Button & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <MagneticButton strength={0.2}>
              <a
                href={generateGeneralInquiryUrl('Direct inquiry via header')}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-[#090D16] hover:bg-[#0f172a] text-white text-xs font-heading font-semibold shadow-lg shadow-black/40 hover:shadow-emerald-500/10 transition-all duration-300 border border-white/10 hover:border-emerald-500/30 overflow-hidden"
              >
                {/* Subtle Glow Aura behind button on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none" />

                {/* Authentic WhatsApp Icon */}
                <svg
                  className="w-4 h-4 fill-[#25D366] transform group-hover:scale-110 group-hover:rotate-[6deg] transition-transform duration-300 shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.177-1.238-6.163-3.486-8.412" />
                </svg>

                {/* Text */}
                <span className="relative z-10 tracking-wide text-slate-100 group-hover:text-white transition-colors">
                  WhatsApp Quote
                </span>

                {/* Animated Live Status Dot */}
                <span className="relative z-10 flex h-2 w-2 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </a>
            </MagneticButton>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Slide Over with Framer Motion) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <Logo size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Links */}
              <div className="py-6 space-y-2">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 mb-2">
                  Navigation
                </div>
                {primaryNav.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center justify-between p-3 rounded-xl font-heading font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}

                <div className="pt-4 text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 mb-2">
                  Categories
                </div>
                {categoryItems.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      className="flex items-center gap-3 p-3 rounded-xl font-heading font-medium text-slate-800 hover:bg-rose-50/60 hover:text-rose-600 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-rose-500" />
                      <span className="text-sm font-semibold">{cat.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Footer CTAs */}
              <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
                <a
                  href={generateGeneralInquiryUrl('Mobile navigation WhatsApp button')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-heading font-bold text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Inquire on WhatsApp</span>
                </a>
                <a
                  href={`tel:${STORE_DISPLAY_PHONE}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white font-heading font-bold text-sm"
                >
                  <Phone className="w-4 h-4 text-rose-400" />
                  <span>Call {STORE_DISPLAY_PHONE}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};