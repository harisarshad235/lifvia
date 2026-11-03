import React from 'react';

export const LifviaLogo: React.FC<{ className?: string; showWordmark?: boolean; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  showWordmark = true,
  size = 'md',
}) => {
  const dims = { sm: 32, md: 40, lg: 48 }[size];
  const textClass = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg width={dims} height={dims} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <rect width="96" height="96" rx="22" fill="#D6F26B" />
        <g transform="translate(26.4 26.4) scale(.6)">
          <rect x="14.75" y="8" width="13" height="48" rx="6.5" fill="#111113" />
          <rect x="35.75" y="28" width="13" height="28" rx="6.5" fill="#111113" />
          <circle cx="42.25" cy="16" r="7" fill="#FFFFFF" />
        </g>
      </svg>
      {showWordmark && (
        <span className={`font-bold tracking-tight text-white ${textClass}`}>
          Lifvia
        </span>
      )}
    </div>
  );
};
export default LifviaLogo;
