import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Laptop,
  Camera,
  Printer,
  Wrench,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  STORE_OWNER,
  STORE_DISPLAY_PHONE,
  STORE_ADDRESS,
  generateGeneralInquiryUrl,
} from '../../utils/whatsapp';

const hardwarePillars = [
  'New & Assembled Desktops',
  'Certified 2nd Hand Laptops',
  'CCTV Security Systems',
  'Chip-Level Repair Lab',
  'Laser Toner Refilling',
];

export const HeroBanner: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <section className="bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Authentic Retail Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Showroom Location Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/90 px-3.5 py-1 text-xs text-slate-300 border border-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="font-medium text-white">{STORE_ADDRESS}</span>
              <span className="text-slate-400">• Proprietor: {STORE_OWNER}</span>
            </div>

            {/* Confident, Natural Heading (No AI Gradient Blurs) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold font-heading text-white tracking-tight leading-[1.12]">
              Professional Computer Store, Laptops & CCTV Surveillance in Gadhinglaj.
            </h1>

            {/* Subhead with clear, readable typography */}
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl">
              Brand-new Dell, HP & Lenovo systems, custom desktop rigs, thoroughly tested pre-owned laptops with warranty, high-density toner refills, and on-site CCTV installations.
            </p>

            {/* Prominent Retail Search Box */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="flex items-center rounded-lg bg-white p-1 shadow-md border border-slate-200">
                <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search laptops, specs, graphic cards, CCTV kits, toners..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-sans"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 h-9 shrink-0"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Popular Hardware Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
              <span className="font-medium text-slate-300">Quick Browse:</span>
              {hardwarePillars.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => navigate(`/products?search=${encodeURIComponent(tag)}`)}
                  className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer border border-slate-700/80"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link to="/products">
                <Button variant="default" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold gap-2">
                  <span>Browse Store Inventory</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <a
                href={generateGeneralInquiryUrl('Direct inquiry from homepage hero')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg" className="font-bold gap-2">
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.177-1.238-6.163-3.486-8.412" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Structured Hardware Department Showcase Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-5 sm:p-6 shadow-xl backdrop-blur-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-bold text-white">In-Store Diagnostics & Sales</span>
                </div>
                <Badge variant="success" className="text-[10px]">
                  Open Showroom
                </Badge>
              </div>

              <div className="divide-y divide-slate-700/60 py-2">
                <div className="py-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-heading">Laptops & Workstations</h3>
                    <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                      New Dell, HP, Lenovo & certified second-hand machines with in-store testing.
                    </p>
                  </div>
                </div>

                <div className="py-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-heading">CCTV Cameras & DVR Kits</h3>
                    <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                      Commercial & residential surveillance with live mobile app viewing setup.
                    </p>
                  </div>
                </div>

                <div className="py-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-heading">Laser Toner Refill Bench</h3>
                    <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                      Fast 88A, 12A & Canon refills with zero smudge and OPC drum inspection.
                    </p>
                  </div>
                </div>

                <div className="py-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-heading">Chip-Level Motherboard Repair</h3>
                    <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                      No power, display failure, hinge repair, and component restoration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>10+ Years Trust in Kolhapur</span>
                </span>
                <span className="font-semibold text-white">Call: {STORE_DISPLAY_PHONE}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
