import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Search,
  MessageCircle,
  ArrowRight,
  Laptop,
  Camera,
  Printer,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  Wrench,
} from 'lucide-react';
import { STORE_OWNER, generateGeneralInquiryUrl, STORE_DISPLAY_PHONE } from '../../utils/whatsapp';
import { MagneticButton } from '../common/MagneticButton';
import { transitions, itemFadeUp, containerStagger } from '../../lib/motion';

const quickTags = [
  { label: 'Laptops', query: 'Computers & Laptops' },
  { label: 'RTX Gaming PCs', query: 'Computer & Laptops' },
  { label: 'CCTV Surveillance', query: 'CCTV Cameras' },
  { label: 'Laser Toner Refill', query: 'Printer, Scanner, UPS, Invertors & Batteries' },
  { label: 'Motherboard Repairs', query: 'Computer Peripherals' },
];

export const HeroBanner: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mouse tilt tracking for right showcase card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    damping: 20,
    stiffness: 150,
  });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#070A12] text-white pt-10 pb-20 sm:pt-16 sm:pb-28 lg:pb-32">
      {/* Background Engineering Grid & Lighting */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />

      {/* Ambient Crimson Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-28 w-[500px] h-[500px] rounded-full bg-rose-600/30 blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-pink-600/20 blur-[140px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center"
        >
          {/* Left Column: Asymmetric Brand Messaging */}
          <div className="lg:col-span-7">
            {/* Store Location Pill */}
            <motion.div variants={itemFadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs text-slate-300 mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span className="font-heading font-semibold text-white">Subhash Road, Gadhinglaj</span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-slate-400">Proprietor: {STORE_OWNER}</span>
            </motion.div>

            {/* Headline with Clash Display / Cabinet Grotesk */}
            <motion.h1
              variants={itemFadeUp}
              className="text-4xl sm:text-5xl lg:text-[62px] font-black font-display tracking-tight leading-[1.04] text-balance text-white"
            >
              Your Trusted Computer{' '}
              <span className="bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                 & Security Partner.
              </span>
            </motion.h1>

            {/* Body Copy with Satoshi */}
            <motion.p
              variants={itemFadeUp}
              className="mt-6 text-base sm:text-lg text-slate-300/90 leading-relaxed font-sans max-w-2xl"
            >
              Laptops, Gaming PCs, CCTV Systems, Printers, Toner Refilling, and Expert Repairs—everything you need, supported by experienced local technicians in Gadhinglaj.
            </motion.p>

            {/* Command-Style Search Bar */}
            <motion.form
              variants={itemFadeUp}
              onSubmit={handleSearch}
              className="mt-8 max-w-xl"
            >
              <div className="group relative flex items-center bg-[#0E1424] border border-white/15 rounded-2xl p-1.5 shadow-2xl focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/25 transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0 group-focus-within:text-rose-400 transition-colors" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search laptops, components, CCTV, toner refill..."
                  className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none font-sans"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-heading font-bold shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.form>

            {/* Quick Filter Tags */}
            <motion.div variants={itemFadeUp} className="mt-4 flex flex-wrap items-center gap-2 max-w-xl">
              <span className="text-xs text-slate-400 font-sans font-medium mr-1">Trending:</span>
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => navigate(`/products?category=${encodeURIComponent(tag.query)}`)}
                  className="px-3 py-1 rounded-lg text-xs font-sans font-medium text-slate-300 bg-white/[0.04] border border-white/10 hover:border-rose-500/40 hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
                >
                  {tag.label}
                </button>
              ))}
            </motion.div>

            {/* Dual CTAs with Magnetic Buttons */}
            <motion.div variants={itemFadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton strength={0.25}>
                <button
                  type="button"
                  onClick={() => navigate('/products')}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white text-slate-950 font-heading font-bold text-sm hover:bg-slate-100 shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <span>Browse Hardware Catalog</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </MagneticButton>

<MagneticButton strength={0.25}>
  <a
    href={generateGeneralInquiryUrl('Direct inquiry via homepage hero')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat directly with Mr. G.T. Patil on WhatsApp"
    className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#162035] hover:bg-[#1C2A48] active:bg-[#131B2E] text-white font-heading font-semibold text-sm border border-white/15 hover:border-emerald-500/40 shadow-lg shadow-black/20 hover:shadow-emerald-500/15 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 overflow-hidden"
  >
    {/* Subtle Glow Aura on Hover */}
    <span className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none" />

    {/* Official WhatsApp SVG Logo */}
    <svg
      className="w-4 h-4 fill-[#25D366] transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shrink-0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.177-1.238-6.163-3.486-8.412" />
    </svg>

    {/* Label */}
    <span className="relative z-10 tracking-wide text-slate-100 group-hover:text-white transition-colors">
      Chat with Mr. G.T. Patil
    </span>

    {/* Live Status Pulse Dot */}
    <span className="relative z-10 flex h-2 w-2 ml-0.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
  </a>
</MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Layered Hardware Glass Showcase */}
          <motion.div
            variants={itemFadeUp}
            className="lg:col-span-5 relative"
            style={{ perspective: 1000 }}
          >
            <motion.div
              style={{ rotateX, rotateY }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-[#131B30]/90 to-[#0A0F1E]/95 border border-white/[0.12] shadow-2xl backdrop-blur-xl overflow-hidden group transition-shadow duration-500 hover:shadow-rose-950/30"
            >
              {/* Inner Spotlight Light Sheen */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header inside Showcase */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                    <Cpu className="w-5 h-5" />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold font-heading text-white">
                      In-Store Diagnostic Bench
                    </h2>
                    <span className="text-[11px] text-slate-400 font-sans">
                      Verified Stock • Subhash Road
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  Live Bench
                </span>
              </div>

              {/* Service Matrix Rows */}
              <div className="py-5 space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-3">
                    <Laptop className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <span className="block text-xs font-heading font-bold text-white">
                        Laptops & Workstations
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans">
                        New & tested pre-owned with warranty
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-3">
                    <Camera className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <span className="block text-xs font-heading font-bold text-white">
                        CCTV Surveillance Kits
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans">
                        HD night vision + Mobile live streaming
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-3">
                    <Printer className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="block text-xs font-heading font-bold text-white">
                        Toner Refilling & Printers
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans">
                        Same-day laser cartridge refilling
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-3">
                    <Wrench className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <span className="block text-xs font-heading font-bold text-white">
                        Chip-Level Diagnostics
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans">
                        Motherboard, GPU & monitor repair lab
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              </div>

              {/* Floating Spec Badge at Bottom of Card */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-slate-400 font-sans font-medium">Need immediate pricing?</span>
                <a
                  href={`tel:${STORE_DISPLAY_PHONE}`}
                  className="font-heading font-bold text-rose-400 hover:text-rose-300 transition-colors inline-flex items-center gap-1"
                >
                  Call {STORE_DISPLAY_PHONE}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};