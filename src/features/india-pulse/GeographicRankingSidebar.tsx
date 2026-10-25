import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { formatPosCrs, formatINR, formatPercent, formatCount } from '../../lib/formatters';
import {
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  ArrowUpDown,
  Compass,
  FileText
} from 'lucide-react';

export const GeographicRankingSidebar: React.FC = () => {
  const {
    selectedLayer,
    selectedState,
    setSelectedState,
    getActiveStateAggregates,
    deterministicInsights,
    setActiveTab
  } = useAppStore();

  const stateAggs = getActiveStateAggregates();
  const [sortBy, setSortBy] = useState<'exposure' | 'pressure' | 'sales'>('exposure');

  const statesList = Object.values(stateAggs).sort((a, b) => {
    if (sortBy === 'exposure') return b.posCrs - a.posCrs;
    if (sortBy === 'pressure') return b.delinquentShare - a.delinquentShare;
    return b.salesDisbAmount - a.salesDisbAmount;
  });

  const selectedData = selectedState ? stateAggs[selectedState] : null;

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Selected State Mini Card (if any selected) */}
      {selectedData && (
        <div className="glass-panel-elevated rounded-xl p-4 border border-teal/40 shadow-glow relative animate-in fade-in duration-200">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal font-semibold">
                Focused Geographic Entity
              </span>
              <h3 className="text-base font-bold text-text-bright leading-tight">
                {selectedData.state}
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('hotspot-explorer')}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-teal text-background text-xs font-bold shadow-glow hover:bg-teal-light transition-all"
            >
              <span>Explore Hotspot</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-border/70 text-xs">
            <div className="bg-surface/60 p-2 rounded-lg border border-border/50">
              <span className="text-[10px] text-text-muted block">Collections POS</span>
              <span className="font-mono font-bold text-teal text-sm">
                {formatPosCrs(selectedData.posCrs)}
              </span>
              <span className="text-[10px] text-text-secondary block font-mono">
                {formatPercent(selectedData.portfolioShare)} of atlas
              </span>
            </div>
            <div className="bg-surface/60 p-2 rounded-lg border border-border/50">
              <span className="text-[10px] text-text-muted block">30+ DPD Pressure</span>
              <span className="font-mono font-bold text-coral text-sm">
                {formatPercent(selectedData.delinquentShare)}
              </span>
              <span className="text-[10px] text-text-secondary block font-mono">
                NPA: {formatPercent(selectedData.npaShare)}
              </span>
            </div>
          </div>

          {selectedData.salesDisbAmount > 0 && (
            <div className="mt-2 text-xs flex justify-between items-center bg-surface/40 px-2.5 py-1.5 rounded-lg border border-border/40">
              <span className="text-text-muted">Sales Disbursements:</span>
              <span className="font-mono font-semibold text-accent-blue">
                {formatINR(selectedData.salesDisbAmount)} ({selectedData.branchesCount} hubs)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Geographic Rankings Container */}
      <div className="glass-panel rounded-xl p-4 border border-border/80 shadow-glass flex-1 flex flex-col min-h-[300px]">
        {/* Header & Sort Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-border/70">
          <div>
            <h4 className="text-xs font-bold text-text-bright uppercase tracking-wider font-mono">
              Geographic Leaderboard
            </h4>
            <p className="text-[11px] text-text-muted">
              {statesList.length} active state entities
            </p>
          </div>

          {/* Sort Switcher */}
          <div className="flex items-center space-x-1 bg-surface-card p-0.5 rounded-lg border border-border text-[10px] font-mono">
            <button
              onClick={() => setSortBy('exposure')}
              className={`px-2 py-0.5 rounded transition-colors ${
                sortBy === 'exposure' ? 'bg-teal text-background font-bold' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              POS
            </button>
            <button
              onClick={() => setSortBy('pressure')}
              className={`px-2 py-0.5 rounded transition-colors ${
                sortBy === 'pressure' ? 'bg-coral text-background font-bold' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              Delinq %
            </button>
            <button
              onClick={() => setSortBy('sales')}
              className={`px-2 py-0.5 rounded transition-colors ${
                sortBy === 'sales' ? 'bg-accent-blue text-background font-bold' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              Sales
            </button>
          </div>
        </div>

        {/* Scrollable State List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pt-2.5 pr-1 max-h-[380px]">
          {statesList.map((st, index) => {
            const isSelected = selectedState === st.state;
            return (
              <div
                key={st.state}
                onClick={() => setSelectedState(st.state)}
                className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-surface-elevated border-teal shadow-glow text-text-bright'
                    : 'bg-surface/40 border-border/40 hover:bg-surface-elevated/70 hover:border-border text-text-secondary'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className="font-mono text-[11px] text-text-muted w-4 text-center">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h5 className="text-xs font-semibold text-text-primary truncate">
                      {st.state}
                    </h5>
                    <span className="text-[10px] text-text-muted font-mono block">
                      {formatCount(st.accountsCount)} accts · {st.districtsCount} dists
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-xs text-text-bright block">
                    {sortBy === 'exposure'
                      ? formatPosCrs(st.posCrs)
                      : sortBy === 'pressure'
                      ? formatPercent(st.delinquentShare)
                      : formatINR(st.salesDisbAmount)}
                  </span>
                  <span className="text-[10px] font-mono text-teal block">
                    {sortBy === 'exposure'
                      ? `${formatPercent(st.portfolioShare)} share`
                      : sortBy === 'pressure'
                      ? `NPA: ${formatPercent(st.npaShare)}`
                      : `${st.branchesCount} branches`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deterministic Executive Insight Teaser */}
      {deterministicInsights.length > 0 && (
        <div className="glass-panel rounded-xl p-3.5 border border-border/80 shadow-glass">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-teal font-semibold">
              Evidence Engine Observation
            </span>
          </div>
          <p className="text-xs text-text-primary font-medium leading-relaxed">
            {deterministicInsights[0].title}
          </p>
          <p className="text-[11px] text-text-secondary mt-1 line-clamp-2">
            {deterministicInsights[0].observation}
          </p>
        </div>
      )}
    </div>
  );
};
