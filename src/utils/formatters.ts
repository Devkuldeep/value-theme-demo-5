/**
 * Utility functions for Indian Enterprise Construction CRM
 * Formats currency in Indian Rupees (INR) with Crores (Cr) and Lakhs (L) notation.
 */

/**
 * Formats a numeric amount in INR with Crores / Lakhs or standard comma formatting.
 * Example: 50000000 -> "₹5.00 Cr", 8500000 -> "₹85.00 L", 45000 -> "₹45,000"
 */
export function formatINR(amount: number, compact: boolean = true): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }

  if (compact) {
    if (amount >= 10000000) {
      const cr = amount / 10000000;
      return `₹${cr.toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      const lakh = amount / 100000;
      return `₹${lakh.toFixed(2)} L`;
    }
  }

  // Standard Indian Number Format (e.g., 1,00,000)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a decimal number representing INR in Crores
 * Example: 25.5 -> "₹25.50 Cr"
 */
export function formatCr(crAmount: number): string {
  return `₹${crAmount.toFixed(2)} Cr`;
}

/**
 * Formats a ratio or percentage number as string
 * Example: 85.4 -> "85.4%"
 */
export function formatPercentage(val: number): string {
  if (val === undefined || val === null || isNaN(val)) return '0%';
  return `${val.toFixed(1)}%`;
}

/**
 * Formats standard numbers with commas
 */
export function formatNumber(val: number): string {
  if (val === undefined || val === null || isNaN(val)) return '0';
  return new Intl.NumberFormat('en-IN').format(val);
}

/**
 * Standard RERA Registration Number Formatter
 */
export function formatReraNo(reraNo?: string): string {
  if (!reraNo) return 'RERA Pending';
  return reraNo;
}

/**
 * Format date string to Indian Standard Date (DD MMM YYYY)
 */
export function formatDateIndian(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
