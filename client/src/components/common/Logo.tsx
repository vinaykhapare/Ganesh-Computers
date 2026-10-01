import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  theme = 'light',
  showSubtitle = true,
}) => {
  const heightClasses = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-14',
    xl: 'h-18',
  }[size];

  const isDark = theme === 'dark';

  return (
    <Link to="/" className={`inline-flex items-center gap-3.5 group select-none ${className}`}>
      <div
        className={`relative flex items-center justify-center p-1 rounded-2xl bg-white transition-all duration-300 group-hover:scale-105 ${
          isDark
            ? 'ring-1 ring-white/15 shadow-md shadow-black/40'
            : 'ring-1 ring-slate-200/90 shadow-xs'
        }`}
      >
        <img
          src={logoImg}
          alt="Ganesh Computers & Accessories"
          className={`${heightClasses} w-auto object-contain rounded-xl`}
        />
      </div>

      {showSubtitle && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-sm font-black tracking-tight font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Ganesh Computers
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
          </div>
          <span className="text-[11px] font-sans font-medium text-slate-400 tracking-normal">
            Gadhinglaj • Sales & Repairs
          </span>
        </div>
      )}
    </Link>
  );
};

export const LogoSymbol: React.FC<{ size?: number; className?: string }> = ({ 
  size = 40, 
  className = '' 
}) => {
  return (
    <img
      src={logoImg}
      alt="Ganesh Computers"
      style={{ height: size, width: 'auto' }}
      className={`object-contain rounded-lg ${className}`}
    />
  );
};
