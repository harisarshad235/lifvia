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
      <svg width={dims} height={dims} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <rect width="48" height="48" rx="12" fill="#090D16" stroke="#1E293B" strokeWidth="1.5" />
        <path d="M11 27C15 20 19 20 24 27C29 34 33 34 37 27" stroke="#06B6D4" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M11 21C15 14 19 14 24 21C29 28 33 28 37 21" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
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
