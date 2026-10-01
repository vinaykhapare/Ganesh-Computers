import React from 'react';
import { motion } from 'framer-motion';
import {
  Printer, Camera, Wrench, MessageCircle,
  MapPin, Phone, RotateCcw, ShieldCheck,
  Cpu, Sparkles, CheckCircle2, ArrowRight
} from 'lucide-react';
import {
  STORE_OWNER,
  STORE_DISPLAY_PHONE,
  STORE_ADDRESS,
  generateGeneralInquiryUrl,
} from '../../utils/whatsapp';
import { InteractiveSpotlight } from '../common/InteractiveSpotlight';
import { MagneticButton } from '../common/MagneticButton';
import { containerStagger, itemFadeUp } from '../../lib/motion';

const services = [
  {
    icon: RotateCcw,
    title: 'Laptops & PCs',
    tag: 'New & Genuine Products',
    accent: 'from-rose-500/10 to-transparent',
    iconColor: 'text-rose-500',
    description:
      'Explore a wide range of brand-new Dell, Lenovo, HP, and other leading-brand laptops and desktop PCs. We provide genuine products, expert guidance, competitive pricing, and reliable after-sales support to help you choose the right device for work, study, or business.',

    highlights: [
      '100% Genuine Products',
      'Latest Models Available',
      'Manufacturer Warranty',
    ],
  },
  {
    icon: Printer,
    title: 'Precision Toner & Cartridge Refill',
    tag: 'Fast In-Store Turnaround',
    accent: 'from-amber-500/10 to-transparent',
    iconColor: 'text-amber-500',
    description:
      'Micro-fine high-yield toner powder refills for HP, Canon, Brother, and Epson laser printers. Dark, crisp, smudge-free black output with complimentary drum cleaning.',
    highlights: ['Micro-Fine Laser Powder', 'Drum & Blade Cleaning', 'Same-Day Pickup'],
  },
  {
    icon: Camera,
    title: 'CCTV Security & Surveillance',
    tag: 'Complete Commercial & Home Kits',
    accent: 'from-blue-500/10 to-transparent',
    iconColor: 'text-blue-500',
    description:
      'Full HD night-vision dome and bullet camera setup across Gadhinglaj. Comprehensive wiring, DVR/NVR configuration, and live streaming directly on your smartphone.',
    highlights: ['Infrared Color Night-Vision', 'Mobile Live Streaming', 'On-Site Installation'],
  },
  {
    icon: Wrench,
    title: 'Chip-Level Motherboard Lab',
    tag: 'Micro-Soldering & Diagnostics',
    accent: 'from-emerald-500/10 to-transparent',
    iconColor: 'text-emerald-500',
    description:
      'In-house repair bench for dead motherboards, short circuits, broken laptop hinges, flickering LCD displays, power IC replacements, and graphic chip restoration.',
    highlights: ['Micro-BGA Soldering Bench', 'Screen & Hinge Replacement', 'Fair Transparent Estimates'],
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#F8FAFC] border-t border-slate-200/80 overflow-hidden">
      {/* Background Engineering Grids */}
      <div className="absolute inset-0 bg-grid-subtle opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Clash Display */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-600 text-[11px] font-heading font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Legacy & Technical Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight leading-[1.08]">
            More than a showroom.{' '}
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              A complete technical lab.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Led personally by <strong className="text-slate-900 font-semibold">{STORE_OWNER}</strong> on Subhash Road, we combine top brand hardware sales with hands-on chip repair, camera installations, and laser printer care.
          </p>
        </div>

        {/* 4 Feature Service Cards with Interactive Spotlight */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={itemFadeUp}>
                <InteractiveSpotlight
                  spotlightColor="rgba(225, 29, 72, 0.08)"
                  className="rounded-3xl bg-white border border-slate-200/90 p-8 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div>
                    {/* Top Row: Icon & Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-300 shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold font-heading text-slate-900 tracking-tight mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-sans leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    {item.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs font-sans font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </InteractiveSpotlight>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Master Dark Contact Command Terminal */}
        <div className="relative mt-20 rounded-[2.5rem] bg-[#090D16] border border-white/10 overflow-hidden shadow-2xl p-8 sm:p-14">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-rose-600/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-300 text-xs font-sans font-semibold mb-4">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{STORE_ADDRESS}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight leading-tight">
                Need customized system advice or a quick repair estimate?
              </h3>

              <p className="mt-4 text-sm sm:text-base text-slate-300/90 font-sans leading-relaxed max-w-2xl">
                Chat directly with proprietor <strong className="text-white font-semibold">{STORE_OWNER}</strong>. We can share photos of current in-store laptops, provide exact component prices, and schedule same-day pickups.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <MagneticButton strength={0.2} className="w-full">
  <a
    href={generateGeneralInquiryUrl('Direct inquiry via services banner')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Connect with Mr. G.T. Patil on WhatsApp"
    className="group relative w-full inline-flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-[#25D366] text-white font-heading font-semibold text-sm tracking-tight shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400/30 transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-emerald-500/30 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 overflow-hidden"
  >
    {/* Subtle Surface Highlight on Hover */}
    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

    {/* Precise Official WhatsApp Brand SVG */}
    <svg
      className="w-4 h-4 fill-current shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.177-1.238-6.163-3.486-8.412" />
    </svg>

    {/* Primary Text */}
    <span className="relative z-10 font-semibold">
      WhatsApp Mr. G.T. Patil
    </span>

    {/* Subtle Live Dot */}
    <span className="relative z-10 flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
    </span>
  </a>
</MagneticButton>
              <MagneticButton strength={0.2} className="w-full">
                <a
                  href={`tel:${STORE_DISPLAY_PHONE}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-heading font-semibold text-sm border border-white/15 transition-all"
                >
                  <Phone className="w-4 h-4 text-rose-400" />
                  <span>Call {STORE_DISPLAY_PHONE}</span>
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};