import React from 'react';

interface AvatarProps {
  initials: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'blue' | 'orange' | 'purple' | 'emerald' | 'amber' | 'slate';
  className?: string;
}

const colorMap = {
  blue: 'bg-[var(--avatar-blue-bg,#dbeafe)] text-[var(--avatar-blue-fg,#1e40af)]',
  orange: 'bg-[var(--avatar-orange-bg,#ffedd5)] text-[var(--avatar-orange-fg,#9a3412)]',
  purple: 'bg-[var(--avatar-purple-bg,#ede9fe)] text-[var(--avatar-purple-fg,#5b21b6)]',
  emerald: 'bg-[var(--avatar-green-bg,#d1fae5)] text-[var(--avatar-green-fg,#065f46)]',
  amber: 'bg-[var(--avatar-yellow-bg,#fef3c7)] text-[var(--avatar-yellow-fg,#92400e)]',
  slate: 'bg-theme-muted text-theme-text-main',
};

const sizeMap = {
  xs: 'w-6 h-6 text-[10px] font-bold',
  sm: 'w-8 h-8 text-xs font-bold',
  md: 'w-10 h-10 text-sm font-bold',
  lg: 'w-12 h-12 text-base font-extrabold',
  xl: 'w-16 h-16 text-xl font-black',
};

/**
 * Reusable Atomic Avatar Component with initials
 * Styled with v10 Indian context avatar tokens.
 */
export const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = 'md',
  variant = 'blue',
  className = '',
}) => {
  return (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 shadow-xs ${colorMap[variant]} ${sizeMap[size]} ${className}`}
    >
      {initials}
    </div>
  );
};
