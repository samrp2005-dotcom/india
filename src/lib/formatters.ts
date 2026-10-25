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
    // Teal scale for Collections Exposure
    // from dark teal rgba(16, 68, 77, 0.7) to radiant cyan-teal #54D7C7
    if (ratio < 0.2) return 'rgba(20, 60, 70, 0.75)';
    if (ratio < 0.4) return 'rgba(28, 98, 105, 0.85)';
    if (ratio < 0.6) return 'rgba(40, 145, 140, 0.9)';
    if (ratio < 0.8) return 'rgba(65, 185, 175, 0.95)';
    return '#54D7C7'; // Peak exposure
  }

  if (layer === 'pressure') {
    // Coral / Amber scale for Delinquency Pressure
    // Low pressure = subdued slate, high = glowing coral
    if (ratio < 0.2) return 'rgba(60, 75, 95, 0.7)';
    if (ratio < 0.4) return 'rgba(234, 179, 8, 0.75)'; // Amber
    if (ratio < 0.6) return 'rgba(249, 115, 22, 0.85)'; // Orange
    if (ratio < 0.8) return 'rgba(244, 63, 94, 0.9)';  // Rose-red
    return '#FF8A70'; // High Delinquency Coral
  }

  if (layer === 'sales') {
    // Cobalt / Accent Blue scale for Lending Disbursements
    if (ratio < 0.2) return 'rgba(25, 55, 95, 0.7)';
    if (ratio < 0.4) return 'rgba(37, 99, 235, 0.8)';
    if (ratio < 0.6) return 'rgba(59, 130, 246, 0.85)';
    if (ratio < 0.8) return 'rgba(96, 165, 250, 0.9)';
    return '#63A9F5';
  }

  // Allocation layer (Cyan-purple scale)
  if (ratio < 0.25) return 'rgba(30, 50, 80, 0.7)';
  if (ratio < 0.5) return 'rgba(14, 165, 233, 0.8)';
  if (ratio < 0.75) return 'rgba(99, 102, 241, 0.85)';
  return '#A78BFA';
}
