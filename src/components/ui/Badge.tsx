import React from 'react';

export type BadgeVariant = 'blue' | 'emerald' | 'amber' | 'purple' | 'red' | 'gray' | 'slate';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  blue: 'bg-[var(--status-planning-bg,var(--color-primary-soft))] text-[var(--status-planning-text,var(--color-primary))] border-[var(--status-planning-border,transparent)]',
  emerald: 'bg-[var(--status-onsite-bg,var(--color-success-soft))] text-[var(--status-onsite-text,var(--color-success-text))] border-[var(--status-onsite-border,transparent)]',
  amber: 'bg-[var(--status-warning-bg,var(--color-warning-soft))] text-[var(--status-warning-text,var(--color-warning-text))] border-[var(--status-warning-border,transparent)]',
  purple: 'bg-[var(--status-handedover-bg,var(--surface-lavender-soft))] text-[var(--status-handedover-text,var(--color-primary))] border-[var(--status-handedover-border,transparent)]',
  red: 'bg-[var(--status-danger-bg,var(--color-danger-soft))] text-[var(--status-danger-text,var(--color-danger-text))] border-[var(--status-danger-border,transparent)]',
  gray: 'bg-theme-muted text-theme-text-secondary border-theme-border',
  slate: 'bg-theme-nested text-theme-text-main border-theme-border font-mono',
};

/**
 * Reusable Atomic Badge Component
 * Styled with v10 status pill design tokens.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  icon,
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px] font-bold' : 'px-2.5 py-1 text-xs font-bold';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${sizeClasses} ${variantStyles[variant]} ${className}`}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
};
