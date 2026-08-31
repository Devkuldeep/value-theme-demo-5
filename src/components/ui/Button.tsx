import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

const variantMap: Record<ButtonVariant, string> = {
  primary: 'bg-theme-primary text-white hover:bg-theme-primary-hover shadow-xs',
  secondary: 'bg-theme-muted text-theme-text-main hover:bg-theme-nested-hover border border-theme-border',
  outline: 'bg-transparent text-theme-text-main hover:bg-theme-muted border border-theme-border',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-xs',
  ghost: 'bg-transparent text-theme-text-secondary hover:bg-theme-muted',
};

const sizeMap = {
  sm: 'px-2.5 py-1.5 text-xs font-semibold rounded-lg',
  md: 'px-4 py-2 text-xs font-bold rounded-xl',
  lg: 'px-5 py-2.5 text-sm font-bold rounded-xl',
};

/**
 * Reusable Atomic Button Component
 * Uses v10 component tokens for buttons.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  fullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantMap[variant]} ${sizeMap[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};
