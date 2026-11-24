import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PackageSearch, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center bg-slate-50">
      <div className="max-w-md w-full rounded-xl border border-slate-200 bg-white p-8 sm:p-10 shadow-2xs space-y-5">
        <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
          <PackageSearch className="w-7 h-7" />
        </div>

        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            Error 404
          </span>
          <h1 className="text-2xl font-bold font-heading text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-sans mt-2 leading-relaxed">
            The hardware listing or page you requested cannot be found or may have been moved.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="default" size="sm" className="w-full font-semibold gap-1.5">
              <Home className="w-4 h-4" />
              <span>Return to Storefront</span>
            </Button>
          </Link>
          <Link to="/products" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full font-semibold gap-1.5">
              <span>View Hardware Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
