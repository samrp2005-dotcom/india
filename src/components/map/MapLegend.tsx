import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const MapLegend: React.FC = () => {
  const { selectedLayer, selectedState, theme } = useAppStore();

  const getLegendDetails = () => {
    if (theme === 'light') {
      switch (selectedLayer) {
        case 'exposure':
          return {
            title: 'Collections POS (₹ Cr)',
            stops: [
              { color: 'rgb(219, 234, 254)', label: '< ₹0.5 Cr' },
              { color: 'rgb(147, 197, 253)', label: '₹0.5 – 1 Cr' },
              { color: 'rgb(96, 165, 250)', label: '₹1 – 3 Cr' },
              { color: 'rgb(37, 99, 235)', label: '₹3 – 5 Cr' },
              { color: '#1D4ED8', label: '> ₹5 Cr' }
            ]
          };
        case 'pressure':
          return {
            title: 'Delinquent Exposure Ratio (B2, B3 & NPA)',
            stops: [
              { color: 'rgb(255, 237, 213)', label: '< 5%' },
              { color: 'rgb(254, 215, 170)', label: '5 – 15%' },
              { color: 'rgb(251, 146, 60)', label: '15 – 30%' },
              { color: 'rgb(234, 88, 12)', label: '30 – 50%' },
              { color: '#C2410C', label: '> 50%' }
            ]
          };
        case 'sales':
          return {
            title: 'Sales Disbursements (₹ Lakhs)',
            stops: [
              { color: 'rgb(191, 219, 254)', label: '< ₹2 L' },
              { color: 'rgb(147, 197, 253)', label: '₹2 – 5 L' },
              { color: 'rgb(59, 130, 246)', label: '₹5 – 10 L' },
              { color: 'rgb(37, 99, 235)', label: '₹10 – 15 L' },
              { color: '#1E40AF', label: '> ₹15 L' }
            ]
          };
        case 'allocation':
          return {
            title: 'Unallocated Portfolio Share',
            stops: [
              { color: 'rgb(254, 243, 199)', label: '< 25%' },
              { color: 'rgb(253, 230, 138)', label: '25 – 50%' },
              { color: 'rgb(245, 158, 11)', label: '50 – 75%' },
              { color: '#EA580C', label: '> 75%' }
            ]
          };
      }
    }

    switch (selectedLayer) {
      case 'exposure':
        return {
          title: 'Collections POS (₹ Cr)',
          stops: [
            { color: 'rgba(30, 58, 138, 0.75)', label: '< ₹0.5 Cr' },
            { color: 'rgba(29, 78, 216, 0.85)', label: '₹0.5 – 1 Cr' },
            { color: 'rgba(37, 99, 235, 0.9)', label: '₹1 – 3 Cr' },
            { color: 'rgba(96, 165, 250, 0.95)', label: '₹3 – 5 Cr' },
            { color: '#60A5FA', label: '> ₹5 Cr' }
          ]
        };
      case 'pressure':
        return {
          title: 'Delinquent Exposure Ratio (B2, B3 & NPA)',
          stops: [
            { color: 'rgba(124, 45, 18, 0.7)', label: '< 5%' },
            { color: 'rgba(194, 65, 12, 0.8)', label: '5 – 15%' },
            { color: 'rgba(234, 88, 12, 0.85)', label: '15 – 30%' },
            { color: 'rgba(249, 115, 22, 0.9)', label: '30 – 50%' },
            { color: '#FB923C', label: '> 50%' }
          ]
        };
      case 'sales':
        return {
          title: 'Sales Disbursements (₹ Lakhs)',
          stops: [
            { color: 'rgba(30, 64, 175, 0.7)', label: '< ₹2 L' },
            { color: 'rgba(37, 99, 235, 0.8)', label: '₹2 – 5 L' },
            { color: 'rgba(59, 130, 246, 0.85)', label: '₹5 – 10 L' },
            { color: 'rgba(96, 165, 250, 0.9)', label: '₹10 – 15 L' },
            { color: '#93C5FD', label: '> ₹15 L' }
          ]
        };
      case 'allocation':
        return {
          title: 'Unallocated Portfolio Share',
          stops: [
            { color: 'rgba(120, 53, 15, 0.7)', label: '< 25%' },
            { color: 'rgba(180, 83, 9, 0.8)', label: '25 – 50%' },
            { color: 'rgba(217, 119, 6, 0.85)', label: '50 – 75%' },
            { color: '#FB923C', label: '> 75%' }
          ]
        };
    }
  };

  const details = getLegendDetails();

  return (
    <div className="absolute bottom-5 left-5 z-20 glass-panel rounded-xl p-3 border border-border shadow-glass max-w-[260px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-text-primary tracking-wide">
          {details.title}
        </span>
      </div>

      {/* Color ramp bar */}
      <div className="flex items-center h-2.5 rounded overflow-hidden border border-border/80 mb-2">
        {details.stops.map((s, idx) => (
          <div
            key={idx}
            className="flex-1 h-full"
            style={{ backgroundColor: s.color }}
          />
        ))}
      </div>

      {/* Min / Max stops */}
      <div className="flex items-center justify-between text-[10px] font-mono text-text-muted mb-2">
        <span>{details.stops[0].label}</span>
        <span>{details.stops[details.stops.length - 1].label}</span>
      </div>

      {/* Legend Indicators */}
      <div className="pt-2 border-t border-border/60 flex flex-col space-y-1.5 text-[10px] text-text-secondary">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal shadow-glow inline-block"></span>
          <span>Verified Sales Branch Hubs</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded bg-surface-elevated border border-border inline-block"></span>
          <span>No Ingested Records</span>
        </div>
        {!selectedState && (
          <div className="text-teal/90 font-mono text-[9px] pt-1">
            * Click state to drill into district polygons
          </div>
        )}
      </div>
    </div>
  );
};
