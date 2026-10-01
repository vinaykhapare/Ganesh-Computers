import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Clock, 
  MessageCircle, Lock, ChevronRight, 
  Sparkles, Laptop, Camera, Printer, 
  RotateCcw, ShieldCheck, Wrench
} from 'lucide-react';
import { Logo } from '../common/Logo';
import {
  STORE_OWNER,
  STORE_ADDRESS,
  STORE_DISPLAY_PHONE,
  STORE_EMAIL,
  STORE_HOURS,
  generateGeneralInquiryUrl,
} from '../../utils/whatsapp';

const serviceHighlights = [
  { icon: Laptop, label: 'New & Custom Gaming PCs' },
  { icon: RotateCcw, label: 'Certified Laptops' },
  { icon: Printer, label: 'Fast Toner & Cartridge Refill' },
  { icon: Camera, label: 'CCTV Camera Surveillance' },
  { icon: Wrench, label: 'Chip-Level Motherboard Repair' },
  { icon: ShieldCheck, label: 'Genuine Warranty On All Hardware' },
];

const catalogLinks = [
  { to: '/products?category=Computer+%26+Laptops', label: 'Laptops & Workstations' },
  { to: '/products?category=Second+Computers+%26+Laptops', label: 'Certified Pre-Owned' },
  { to: '/products?category=Computer+Peripherals', label: 'Keyboards, Mice & Displays' },
  { to: '/products?category=CCTV+Cameras', label: 'Security & CCTV Cameras' },
  {
    to: '/products?category=Printer%2C+Scanner%2C+UPS%2C+Invertors+%26+Batteries',
    label: 'Printers, Inverters & Batteries',
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#060911] text-white pt-20 pb-12 border-t border-white/[0.08] overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[250px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Services Ribbon Highlight */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0C1222] border border-white/[0.08] shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-heading font-extrabold uppercase tracking-widest text-rose-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Gadhinglaj IT & Hardware Benchmark
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              One destination for all IT & security needs
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {serviceHighlights.map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-rose-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center mb-2.5">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-heading font-semibold text-slate-200 text-[11px] leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-5">
            <Logo size="md" theme="dark" />
            <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-md">
              Serving Gadhinglaj and Kolhapur district since 2010. Premium brand new systems, laptops, chip-level motherboard diagnostics, and professional CCTV installations on Subhash Road.
            </p>
            {/* <a
              href={generateGeneralInquiryUrl('Footer WhatsApp Consultation')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-heading font-bold shadow-lg shadow-emerald-500/20 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Direct WhatsApp: {STORE_DISPLAY_PHONE}</span>
            </a> */}
          </div>

          {/* Catalog Department Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-[#E11D48]" />
              Departments
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              {catalogLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-rose-500/60 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store & Proprietor Detail Card */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-[#E11D48]" />
              Store Information
            </h4>
            <div className="p-6 rounded-2xl bg-[#0D1426] border border-white/[0.08] space-y-4 text-xs text-slate-300">
              <div className="pb-3 border-b border-white/[0.06]">
                <span className="text-[10px] uppercase tracking-wider font-heading font-bold text-slate-400 block mb-0.5">
                  Proprietor & Tech Lead
                </span>
                <span className="text-base font-black text-white font-display">
                  {STORE_OWNER}
                </span>
              </div>

              <a
                href={`tel:${STORE_DISPLAY_PHONE}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <span className="font-semibold">{STORE_DISPLAY_PHONE}</span>
              </a>

              <a
                href={`mailto:${STORE_EMAIL}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="break-all">{STORE_EMAIL}</span>
              </a>

              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="leading-relaxed pt-1">{STORE_ADDRESS}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
                <span>{STORE_HOURS}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="text-center sm:text-left font-sans">
            © {new Date().getFullYear()}{' '}
            <span className="text-slate-300 font-semibold font-heading">Ganesh Computers & Accessories</span> · Subhash Road, Gadhinglaj.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors"
              title="Authorized Admin Access"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};