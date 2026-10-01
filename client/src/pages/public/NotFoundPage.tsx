import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, PackageSearch, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { MagneticButton } from '../../components/common/MagneticButton';
import { InteractiveSpotlight } from '../../components/common/InteractiveSpotlight';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background ambient radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <InteractiveSpotlight className="max-w-md w-full relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-100/80 text-[#E11D48] flex items-center justify-center mx-auto mb-6 shadow-sm"
        >
          <PackageSearch className="w-10 h-10" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-mono font-semibold uppercase tracking-wider mb-3">
            Error 404
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-display tracking-tight mb-2">
            Page Not Located
          </h1>
          <p className="text-sm text-slate-500 font-sans mb-8 leading-relaxed">
            The hardware listing or page you requested cannot be found or may have been updated in our live catalog.
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/" className="w-full sm:w-auto">
            <MagneticButton strength={0.2} className="w-full">
              <Button variant="primary" className="w-full sm:w-auto font-heading" leftIcon={<Home className="w-4 h-4" />}>
                Return Home
              </Button>
            </MagneticButton>
          </Link>
          <Link to="/products" className="w-full sm:w-auto">
            <MagneticButton strength={0.2} className="w-full">
              <Button variant="secondary" className="w-full sm:w-auto font-heading" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Catalog Index
              </Button>
            </MagneticButton>
          </Link>
        </motion.div>
      </InteractiveSpotlight>
    </div>
  );
};
