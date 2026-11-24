import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Phone,
  MapPin,
  Clock,
  Menu,
  Laptop,
  RotateCcw,
  Mouse,
  Printer,
  Camera,
  Wrench,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../ui/button';
import { Sheet } from '../ui/sheet';
import {
  STORE_DISPLAY_PHONE,
  STORE_ADDRESS,
  STORE_HOURS,
  generateGeneralInquiryUrl,
} from '../../utils/whatsapp';

const navCategories = [
  { name: 'All Products', path: '/products' },
  { name: 'Laptops & Computers', path: '/products?category=Computer+%26+Laptops', icon: Laptop },
  { name: 'Certified Pre-Owned', path: '/products?category=Second+Computers+%26+Laptops', icon: RotateCcw },
  { name: 'Peripherals', path: '/products?category=Computer+Peripherals', icon: Mouse },
  { name: 'CCTV Cameras', path: '/products?category=CCTV+Cameras', icon: Camera },
  { name: 'Printers & Batteries', path: '/products?category=Printer%2C+Scanner%2C+UPS%2C+Invertors+%26+Batteries', icon: Printer },
  { name: 'Cartridge Refill', path: '/products?category=Cartridge+%26+Tonner+Refilling' },
  { name: 'Repairs & Services', path: '/products?category=Repairs+%26+Services', icon: Wrench },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActiveCategory = (path: string) => {
    if (path === '/products') return location.pathname === '/products' && !location.search;
    return `${location.pathname}${location.search}` === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* 1. Top Informational Banner (Established Retail Strip) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left info items */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>{STORE_ADDRESS}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400 border-l border-slate-700 pl-4">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{STORE_HOURS}</span>
            </span>
          </div>

          {/* Right contact items */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${STORE_DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Helpline: <strong className="text-white">{STORE_DISPLAY_PHONE}</strong></span>
            </a>
            <span className="hidden sm:inline-block w-px h-3 bg-slate-700" />
            <Link
              to="/admin/login"
              className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Store Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Central Retail Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl relative"
          >
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search laptops, RTX gaming PCs, CCTV cameras, toner refills..."
                className="w-full h-10 pl-10 pr-24 rounded-lg border border-slate-300 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 h-8 rounded-md bg-slate-900 hover:bg-slate-800 text-xs px-3 font-semibold"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href={generateGeneralInquiryUrl('Direct inquiry from store header')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button variant="whatsapp" size="sm" className="gap-2 font-semibold">
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.177-1.238-6.163-3.486-8.412" />
                </svg>
                <span>WhatsApp Inquiry</span>
              </Button>
            </a>

            <Link to="/products" className="inline-flex">
              <Button variant="outline" size="sm" className="font-semibold">
                View Catalog
              </Button>
            </Link>

            {/* Mobile Hamburger Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-3 md:hidden relative"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search laptops, CCTV, parts..."
            className="w-full h-10 pl-9 pr-20 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-900"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 rounded-md bg-slate-900 text-xs px-2.5 font-semibold"
          >
            Search
          </Button>
        </form>
      </div>

      {/* 3. Hardware Category Navigation Strip */}
      <nav aria-label="Department Navigation" className="hidden md:block bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1.5 text-xs font-medium text-slate-600">
            {navCategories.map((item) => {
              const active = isActiveCategory(item.path);
              return (
                <li key={item.name} className="shrink-0">
                  <Link
                    to={item.path}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                      active
                        ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                        : 'hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  >
                    {item.icon && <item.icon className="w-3.5 h-3.5 opacity-80" />}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer (shadcn Sheet) */}
      <Sheet
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        title="Store Navigation"
        side="left"
      >
        <div className="flex flex-col gap-6 py-2">
          {/* Direct WhatsApp Callout */}
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200/80">
            <div className="text-xs font-bold text-emerald-900 mb-1">
              Need Instant Help or Stock Check?
            </div>
            <p className="text-xs text-emerald-700 mb-3">
              Chat directly with Mr. G.T. Patil for live quotes and laptop availability.
            </p>
            <a
              href={generateGeneralInquiryUrl('Mobile menu inquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex"
            >
              <Button variant="whatsapp" size="sm" className="w-full font-semibold">
                Chat on WhatsApp (9373873513)
              </Button>
            </a>
          </div>

          {/* Department Links List */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
              Hardware Departments
            </div>
            <ul className="space-y-1">
              {navCategories.map((item) => {
                const active = isActiveCategory(item.path);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {item.icon && <item.icon className="w-4 h-4 text-slate-500" />}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Store Info in Mobile Drawer */}
          <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-2.5">
            <div className="font-semibold text-slate-900">Showroom Address</div>
            <p className="leading-relaxed text-slate-500">
              {STORE_ADDRESS}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${STORE_DISPLAY_PHONE.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium"
              >
                <Phone className="w-4 h-4 text-slate-400" />
                <span>Call: {STORE_DISPLAY_PHONE}</span>
              </a>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-medium pt-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </Sheet>
    </header>
  );
};
