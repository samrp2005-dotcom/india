/**
 * Financial Formatting Utilities for Lending Pulse
 * Strictly formatted for Indian numbering systems (Crores and Lakhs)
 */

export function formatINR(val: number | null | undefined, unit: 'auto' | 'cr' | 'lakh' | 'raw' = 'auto'): string {
  if (val === null || val === undefined || isNaN(val)) return '—';

  if (unit === 'cr') {
    return `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`;
  }

  if (unit === 'lakh') {
    return `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L`;
  }

  if (unit === 'raw') {
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  }

  // Auto mode:
  // Note: Collections POS is already in Crores.
  // Large raw rupee amounts (>= 1,00,00,000) show as Cr.
  if (Math.abs(val) >= 10000000) {
    const inCr = val / 10000000;
    return `₹${inCr.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`;
  } else if (Math.abs(val) >= 100000) {
    const inLakh = val / 100000;
    return `₹${inLakh.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L`;
  } else if (Math.abs(val) >= 1000) {
    return `₹${(val / 1000).toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} K`;
  } else {
    return `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
}

/**
 * Format Collections POS (stored as Crores)
 */
export function formatPosCrs(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return '—';
  if (val >= 1) {
    return `₹${val.toFixed(2)} Cr`;
  } else if (val >= 0.01) {
    // Under 1 Cr, show both Cr and Lakh equivalent for clarity
    const lakhs = val * 100;
    return `₹${lakhs.toFixed(1)} L (${val.toFixed(3)} Cr)`;
  } else {
    const lakhs = val * 100;
    return `₹${lakhs.toFixed(2)} L`;
  }
}

export function formatPercent(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return '—';
  return `${val.toFixed(1)}%`;
}

export function formatCount(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return '0';
  return Math.round(val).toLocaleString('en-IN');
}

/**
 * Color scales for Map choropleth
 */
export function getChoroplethColor(
  value: number,
  layer: 'exposure' | 'pressure' | 'sales' | 'allocation',
  minVal: number = 0,
  maxVal: number = 100
): string {
  if (value === undefined || value === null || isNaN(value) || value <= 0) {
    return 'rgba(23, 42, 62, 0.5)'; // Dark unmapped surface
  }

  // Normalize ratio 0.0 to 1.0
  const range = maxVal - minVal || 1;
  const ratio = Math.min(Math.max((value - minVal) / range, 0.05), 1);

  if (layer === 'exposure') {
    // Pure Blue scale for Collections Exposure
    if (ratio < 0.2) return 'rgba(219, 234, 254, 0.85)';
    if (ratio < 0.4) return 'rgba(147, 197, 253, 0.9)';
    if (ratio < 0.6) return 'rgba(96, 165, 250, 0.95)';
    if (ratio < 0.8) return 'rgba(37, 99, 235, 0.95)';
    return '#1D4ED8'; // Peak exposure Royal Blue
  }

  if (layer === 'pressure') {
    // Pure Orange scale for Delinquency Pressure
    if (ratio < 0.2) return 'rgba(255, 237, 213, 0.85)';
    if (ratio < 0.4) return 'rgba(254, 215, 170, 0.9)';
    if (ratio < 0.6) return 'rgba(251, 146, 60, 0.95)';
    if (ratio < 0.8) return 'rgba(234, 88, 12, 0.95)';
    return '#C2410C'; // High Delinquency Burnt Orange
  }

  if (layer === 'sales') {
    // Cobalt Blue scale for Lending Disbursements
    if (ratio < 0.2) return 'rgba(191, 219, 254, 0.85)';
    if (ratio < 0.4) return 'rgba(147, 197, 253, 0.9)';
    if (ratio < 0.6) return 'rgba(59, 130, 246, 0.95)';
    if (ratio < 0.8) return 'rgba(37, 99, 235, 0.95)';
    return '#1E40AF';
  }

  // Allocation layer (Amber-Orange scale)
  if (ratio < 0.25) return 'rgba(254, 243, 199, 0.85)';
  if (ratio < 0.5) return 'rgba(253, 230, 138, 0.9)';
  if (ratio < 0.75) return 'rgba(245, 158, 11, 0.95)';
  return '#EA580C';
}
