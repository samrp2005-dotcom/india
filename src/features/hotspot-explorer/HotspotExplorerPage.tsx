import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ExposureTreemap } from '../../components/charts/ExposureTreemap';
import { DistrictContributionChart } from '../../components/charts/DistrictContributionChart';
import { ExposureSankey } from '../../components/charts/ExposureSankey';
import { DelinquencyHeatmap } from '../../components/charts/DelinquencyHeatmap';
import { StateComparisonView } from '../../components/charts/StateComparisonView';
import { formatPosCrs, formatINR, formatPercent, formatCount } from '../../lib/formatters';
import { Compass, RotateCcw, Building2, Layers } from 'lucide-react';

export const HotspotExplorerPage: React.FC = () => {
  const {
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    getActiveStateAggregates
  } = useAppStore();

  const stateAggs = getActiveStateAggregates();
  const stateNames = Object.keys(stateAggs).sort();
  const currentData = selectedState ? stateAggs[selectedState] : null;

  return (
    <div className="w-full flex flex-col space-y-5 animate-in fade-in duration-300">
      {/* Top Banner: Regional Context & State Picker */}
      <div className="glass-panel-elevated p-4 rounded-2xl border border-border/80 shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-teal/15 text-teal border border-teal/30 shadow-glow">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal font-semibold">
                Hotspot Analysis Workspace
              </span>
              {selectedDistrict && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-coral/15 text-coral border border-coral/30">
                  District: {selectedDistrict}
                </span>
              )}
            </div>
            <h2 className="text-xl font-extrabold text-text-bright tracking-tight">
              {selectedState ? `${selectedState} Regional Deep Dive` : 'National Portfolio Anatomy'}
            </h2>
            <p className="text-xs text-text-secondary">
              What factors explain the observed volume concentration and delinquency pressure?
            </p>
          </div>
        </div>

        {/* State Selector & Reset */}
        <div className="flex items-center space-x-2.5">
          <select
            value={selectedState || ''}
            onChange={(e) => setSelectedState(e.target.value || null)}
            className="bg-surface border border-border text-xs text-text-primary rounded-xl px-3 py-2 focus:outline-none focus:border-teal font-sans min-w-[170px]"
          >
            <option value="">National Overview</option>
            {stateNames.map((s) => (
              <option key={s} value={s}>
                {s} (₹{stateAggs[s]?.posCrs.toFixed(2)} Cr)
              </option>
            ))}
          </select>

          {selectedState && (
            <button
              onClick={() => {
                setSelectedState(null);
                setSelectedDistrict(null);
              }}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-surface hover:bg-surface-elevated text-xs text-text-secondary hover:text-text-primary transition-all border border-border"
              title="Reset focus to all India"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal" />
              <span>National View</span>
            </button>
          )}
        </div>
      </div>

      {/* Row 1: Visualization C (Product Mix Treemap) & Visualization A (District Contribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 glass-panel p-4 rounded-2xl border border-border/80 shadow-glass">
          <ExposureTreemap />
        </div>
        <div className="lg:col-span-5 glass-panel p-4 rounded-2xl border border-border/80 shadow-glass">
          <DistrictContributionChart />
        </div>
      </div>

      {/* Row 2: Visualization B (Exposure Anatomy Sankey) */}
      <div className="glass-panel p-5 rounded-2xl border border-border/80 shadow-glass">
        <ExposureSankey />
      </div>

      {/* Row 3: Visualization D (Delinquency Heatmap) & Visualization E (Dual-State Comparison) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 glass-panel p-4 rounded-2xl border border-border/80 shadow-glass">
          <DelinquencyHeatmap />
        </div>
        <div className="lg:col-span-6 glass-panel p-4 rounded-2xl border border-border/80 shadow-glass">
          <StateComparisonView />
        </div>
      </div>
    </div>
  );
};
