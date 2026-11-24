import React from 'react';
import {
  Printer,
  Camera,
  Wrench,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Laptop,
} from 'lucide-react';
import { STORE_OWNER, STORE_ADDRESS, STORE_DISPLAY_PHONE, generateGeneralInquiryUrl } from '../../utils/whatsapp';
import { Button } from '../ui/button';

const serviceList = [
  {
    icon: Laptop,
    title: 'Brand New Laptops & Custom Desktop PCs',
    desc: 'Authorized sales of Dell, HP, Lenovo & custom gaming/creator towers assembled with genuine parts, thermal paste application, and OS setup.',
    bullets: ['Brand Manufacturer Warranty', 'Custom Gaming PC Assembly', 'Competitive Dealer Pricing'],
  },
  {
    icon: RotateCcw,
    title: 'Certified Pre-Owned Systems',
    desc: 'Bench-tested laptops with SSD upgrades, fresh battery testing, original chargers, and in-store testing warranty by Mr. G.T. Patil.',
    bullets: ['48-Point Diagnostic Check', 'Original Chargers Included', '3 Months In-Store Testing Warranty'],
  },
  {
    icon: Printer,
    title: 'Precision Toner & Cartridge Refill Bench',
    desc: 'Professional micro-fine toner powder refilling for HP, Canon, Brother & Epson laser printers. Dark, smudge-free black output with drum inspection.',
    bullets: ['High-Yield Micro-Fine Powder', 'Same-Day In-Store Pickup', 'OPC Drum & Wiper Blade Clean'],
  },
  {
    icon: Camera,
    title: 'CCTV Security & Surveillance Systems',
    desc: 'Complete commercial, shop, and home CCTV surveillance packages. Full HD night-vision cameras, DVR setup, cabling, and mobile app streaming.',
    bullets: ['HD Color Night Vision', 'Mobile Live Streaming Setup', 'On-Site Installation in Gadhinglaj'],
  },
  {
    icon: Wrench,
    title: 'Chip-Level Motherboard Lab',
    desc: 'Dedicated technical bench for no-power motherboards, short circuit tracing, broken laptop hinges, display screen replacements, and power IC diagnostics.',
    bullets: ['Micro-BGA Soldering Bench', 'Broken Hinge Reconstruction', 'Transparent Repair Estimates'],
  },
  {
    icon: ShieldCheck,
    title: 'Direct Dealer Pricing & Genuine Support',
    desc: 'Over 10 years serving Gadhinglaj and Kolhapur district. Personal technical consultation and after-sales support directly by Mr. G.T. Patil.',
    bullets: ['10+ Years Store Legacy', 'Zero Middlemen Pricing', 'Dedicated After-Sales Service'],
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D92344] mb-2 font-heading">
            Store Legacy & Technical Services
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
            Complete Hardware Sales & In-House Service Lab
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Serving Gadhinglaj and Kolhapur district since 2010. Led personally by{' '}
            <strong className="text-slate-900 font-semibold">{STORE_OWNER}</strong> on Subhash Road, we combine direct brand sales with hands-on chip repair, camera installations, and printer maintenance.
          </p>
        </div>

        {/* 6 Grid Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-4 shrink-0">
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {service.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* In-Store Visit Strip */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-heading text-slate-900">
              Visit Our Showroom on Subhash Road
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Have a faulty laptop, empty toner cartridge, or need a CCTV camera quote? Walk in directly or message Mr. G.T. Patil on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={generateGeneralInquiryUrl('Store visit inquiry')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" className="font-semibold">
                WhatsApp: {STORE_DISPLAY_PHONE}
              </Button>
            </a>
            <a href={`tel:${STORE_DISPLAY_PHONE.replace(/\s+/g, '')}`}>
              <Button variant="outline" className="font-semibold">
                Call Showroom
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
