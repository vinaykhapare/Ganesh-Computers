import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Laptop,
  Camera,
  Printer,
  RotateCcw,
  ShieldCheck,
  Wrench,
  Lock,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../ui/button';
import {
  STORE_OWNER,
  STORE_ADDRESS,
  STORE_DISPLAY_PHONE,
  STORE_EMAIL,
  STORE_HOURS,
  generateGeneralInquiryUrl,
} from '../../utils/whatsapp';

const coreServices = [
  { icon: Laptop, title: 'Laptops & Custom Rigs', desc: 'Brand new laptops & tuned desktop assemblies' },
  { icon: RotateCcw, title: 'Certified Pre-Owned', desc: '48-point bench tested with store testing warranty' },
  { icon: Printer, title: 'Toner Cartridge Refilling', desc: 'Fast, high-density refilling for HP & Canon' },
  { icon: Camera, title: 'CCTV Security Systems', desc: 'HD night-vision cameras & mobile view setup' },
  { icon: Wrench, title: 'Chip-Level Repairs', desc: 'Motherboard soldering & component diagnostic bench' },
  { icon: ShieldCheck, title: 'Direct Dealer Pricing', desc: 'Genuine products backed by local dealer support' },
];

const categoryLinks = [
  { to: '/products?category=Computer+%26+Laptops', label: 'Computer & Laptops' },
  { to: '/products?category=Second+Computers+%26+Laptops', label: 'Certified Second Laptops' },
  { to: '/products?category=Computer+Peripherals', label: 'Peripherals & Components' },
  { to: '/products?category=CCTV+Cameras', label: 'CCTV Camera Surveillance' },
  {
    to: '/products?category=Printer%2C+Scanner%2C+UPS%2C+Invertors+%26+Batteries',
    label: 'Printers, Inverters & Batteries',
  },
  { to: '/products?category=Cartridge+%26+Tonner+Refilling', label: 'Toner Cartridge Refill' },
  { to: '/products?category=Repairs+%26+Services', label: 'Hardware Diagnostic Bench' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* 1. Value Proposition Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {coreServices.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-2">
                <div className="w-9 h-9 rounded-lg bg-slate-800 text-rose-400 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-white">{title}</h4>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Store Bio */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="md" theme="dark" />
            <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-sm">
              Established in 2010 by <strong>{STORE_OWNER}</strong>, Ganesh Computers is Gadhinglaj’s primary retail and service showroom for brand new systems, certified second-hand laptops, CCTV camera security setups, and precision chip-level motherboard diagnostics.
            </p>
            <div className="pt-2">
              <a
                href={generateGeneralInquiryUrl('Direct inquiry from footer')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="sm" className="font-semibold gap-2">
                  <span>Chat on WhatsApp: {STORE_DISPLAY_PHONE}</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Column 2: Hardware Departments */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-white mb-4">
              Hardware Departments
            </h3>
            <ul className="space-y-2 text-xs">
              {categoryLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Showroom & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-white mb-4">
              Store Showroom & Contact
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                <span>{STORE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-300 shrink-0" />
                <a href={`tel:${STORE_DISPLAY_PHONE.replace(/\s+/g, '')}`} className="hover:text-white">
                  {STORE_DISPLAY_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-300 shrink-0" />
                <a href={`mailto:${STORE_EMAIL}`} className="hover:text-white">
                  {STORE_EMAIL}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                <span>{STORE_HOURS}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="pt-8 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Ganesh Computers & Accessories. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Proprietor: {STORE_OWNER}</span>
            <span className="w-px h-3 bg-slate-800" />
            <Link
              to="/admin/login"
              className="text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Management</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
