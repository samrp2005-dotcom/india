import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { formatPosCrs, formatPercent, formatCount } from '../../lib/formatters';
import { ArrowUpDown, MapPin, Building2 } from 'lucide-react';

export const DistrictContributionChart: React.FC = () => {
  const {
    selectedState,
    selectedDistrict,
    setSelectedDistrict,
    districtAggregates,
    getActiveStateAggregates
  } = useAppStore();

  const [sortBy, setSortBy] = useState<'pos' | 'share'>('pos');
  const stateAggs = getActiveStateAggregates();

  // If a state is selected, filter districts belonging to that state.
  // If no state is selected, show top national districts.
  const relevantDistricts = (
    selectedState
      ? districtAggregates.filter((d) => d.state === selectedState)
      : districtAggregates.slice(0, 15)
  ).sort((a, b) => (sortBy === 'pos' ? b.posCrs - a.posCrs : b.stateShare - a.stateShare));

  const maxPos = relevantDistricts.length > 0 ? Math.max(...relevantDistricts.map((d) => d.posCrs)) : 1;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Header & Sort Controls */}
      <div className="flex items-center justify-between pb-2.5 border-b border-border/70 mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-teal" />
            <h4 className="text-xs font-bold text-text-bright uppercase tracking-wider font-mono">
              District Contribution Ranking
            </h4>
          </div>
          <p className="text-[11px] text-text-muted">
            {selectedState ? `Active districts in ${selectedState}` : 'Top 15 national districts by exposure'}
          </p>
        </div>

        {/* Sort Switcher */}
        <div className="flex items-center space-x-1 bg-surface-card p-0.5 rounded-lg border border-border text-[10px] font-mono">
          <button
            onClick={() => setSortBy('pos')}
            className={`px-2 py-0.5 rounded transition-colors ${
              sortBy === 'pos' ? 'bg-teal text-white font-bold' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            Absolute (₹ Cr)
          </button>
          <button
            onClick={() => setSortBy('share')}
            className={`px-2 py-0.5 rounded transition-colors ${
              sortBy === 'share' ? 'bg-teal text-white font-bold' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            Share (%)
          </button>
        </div>
      </div>

      {/* District List with Visual Bars */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[320px]">
        {relevantDistricts.length === 0 ? (
          <div className="text-center py-8 text-xs text-text-muted">
            No district-level breakdown recorded for this state.
          </div>
        ) : (
          relevantDistricts.map((d, idx) => {
            const isSelected = selectedDistrict === d.district;
            const barWidth = `${Math.min((d.posCrs / maxPos) * 100, 100)}%`;

            return (
              <div
                key={`${d.state}-${d.district}`}
                onClick={() => setSelectedDistrict(isSelected ? null : d.district)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-surface-elevated border-coral shadow-glow-coral'
                    : 'bg-surface/50 border-border/60 hover:bg-surface-elevated hover:border-border'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="font-mono text-[10px] text-text-muted w-4">
                      {idx + 1}.
                    </span>
                    <span className="font-semibold text-text-primary truncate">
                      {d.district}
                    </span>
                    {!selectedState && (
                      <span className="text-[10px] text-text-muted font-mono truncate">
                        ({d.state})
                      </span>
                    )}
                    {d.cityTier && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-surface border border-border text-text-muted">
                        {d.cityTier}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-text-bright">
                      {formatPosCrs(d.posCrs)}
                    </span>
                    <span className="text-[10px] font-mono text-teal ml-1.5">
                      ({formatPercent(selectedState ? d.stateShare : d.nationalShare)})
                    </span>
                  </div>
                </div>

                {/* Progress bar representing relative size */}
                <div className="w-full h-1.5 bg-surface-card rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isSelected ? 'bg-coral' : 'bg-gradient-to-r from-teal-dark to-teal'
                    }`}
                    style={{ width: barWidth }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] text-text-muted mt-1 font-mono">
                  <span>{formatCount(d.accountsCount)} accounts</span>
                  <span>
                    B1: {formatPosCrs(d.bucketBreakdown?.['1.B1'] || 0)} | NPA: {formatPosCrs(d.bucketBreakdown?.['4.NPA'] || 0)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
