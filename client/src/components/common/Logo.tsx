import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  theme = 'light',
  showSubtitle = true,
}) => {
  const isDark = theme === 'dark';

  const imgHeight = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  }[size];

  return (
    <Link to="/" className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="flex items-center justify-center rounded-lg bg-white p-1 border border-slate-200/80 shadow-2xs shrink-0">
        <img
          src={logoImg}
          alt="Ganesh Computers"
          className={`${imgHeight} w-auto object-contain rounded-md`}
        />
      </div>

      {showSubtitle && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-heading text-base font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Ganesh Computers
            </span>
          </div>
          <span
            className={`text-[11px] font-sans font-medium tracking-tight ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Hardware & CCTV Solutions • Gadhinglaj
          </span>
        </div>
      )}
    </Link>
  );
};

export const LogoSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  return (
    <img
      src={logoImg}
      alt="Ganesh Computers"
      style={{ height: size, width: 'auto' }}
      className={`object-contain rounded-md ${className}`}
    />
  );
};
