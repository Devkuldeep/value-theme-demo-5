import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

/**
 * Reusable Atomic Input Field Component
 * Uses centralized theme tokens for background, border, text, and focus states.
 */
export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="block text-xs font-bold text-theme-text-main">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-theme-text-tertiary pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full py-2 text-xs font-medium bg-theme-input text-theme-text-main rounded-xl border border-theme-border focus:outline-none focus:border-theme-primary focus:ring-2 focus:ring-theme-primary-soft transition-all ${
            icon ? 'pl-9 pr-3' : 'px-3'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] font-semibold text-red-500">{error}</p>}
    </div>
  );
};
