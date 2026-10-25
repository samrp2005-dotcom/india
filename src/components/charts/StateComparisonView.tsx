import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { formatPosCrs, formatINR, formatPercent, formatCount } from '../../lib/formatters';
import { ArrowLeftRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const StateComparisonView: React.FC = () => {
  const {
    selectedState,
    setSelectedState,
    comparisonState,
    setComparisonState,
    getActiveStateAggregates
  } = useAppStore();

  const stateAggs = getActiveStateAggregates();
  const stateNames = Object.keys(stateAggs).sort();

  const stateA = selectedState ? stateAggs[selectedState] : (stateAggs['Maharashtra'] || Object.values(stateAggs)[0]);
  const stateB = comparisonState
    ? stateAggs[comparisonState]
    : (stateAggs['Telangana'] || Object.values(stateAggs)[1] || stateA);

  if (!stateA || !stateB) return null;

  return (
    <div className="w-full flex flex-col justify-between space-y-4">
      {/* Header & State Pickers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
        <div>
          <div className="flex items-center space-x-2">
            <ArrowLeftRight className="w-4 h-4 text-teal" />
            <h4 className="text-xs font-bold text-text-bright uppercase tracking-wider font-mono">
              Dual Geographic Benchmark Comparator
            </h4>
          </div>
          <p className="text-[11px] text-text-muted">
            Side-by-side metric comparison with explicit fact lineage and snapshot attribution
          </p>
        </div>

        {/* State Selectors */}
        <div className="flex items-center space-x-2">
          <select
            value={stateA.state}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-surface-elevated border border-border text-xs text-text-primary rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-teal font-sans"
          >
            {stateNames.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="text-xs font-mono text-text-muted">vs</span>
          <select
            value={stateB.state}
            onChange={(e) => setComparisonState(e.target.value)}
            className="bg-surface-elevated border border-border text-xs text-text-primary rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-coral font-sans"
          >
            {stateNames.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* State A Card */}
        <div className="glass-panel p-4 rounded-xl border border-teal/40 shadow-glow relative">
          <div className="flex justify-between items-center pb-2 border-b border-border/70 mb-3">
            <h5 className="font-bold text-sm text-teal">{stateA.state}</h5>
            <span className="text-[10px] font-mono text-text-muted">Entity Benchmark A</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">Collections POS:</span>
              <span className="font-mono font-bold text-text-bright">{formatPosCrs(stateA.posCrs)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">Portfolio Share:</span>
              <span className="font-mono text-teal font-medium">{formatPercent(stateA.portfolioShare)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">Active Loan Accounts:</span>
              <span className="font-mono text-text-primary">{formatCount(stateA.accountsCount)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">30+ DPD Delinquency:</span>
              <span className="font-mono text-coral font-bold">{formatPercent(stateA.delinquentShare)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">NPA Ratio:</span>
              <span className="font-mono text-coral font-medium">{formatPercent(stateA.npaShare)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">Sales Disbursements:</span>
              <span className="font-mono text-accent-blue font-bold">{formatINR(stateA.salesDisbAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">Disbursed Loans / Hubs:</span>
              <span className="font-mono text-text-primary">{stateA.salesDisbCount} loans ({stateA.branchesCount} hubs)</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-border/50 text-[10px] text-text-muted font-mono flex items-center justify-between">
            <span>Snapshot: Aug 2026 (Coll)</span>
            <span>Aug–Sep 2026 (Sales)</span>
          </div>
        </div>

        {/* State B Card */}
        <div className="glass-panel p-4 rounded-xl border border-coral/40 shadow-glow-coral relative">
          <div className="flex justify-between items-center pb-2 border-b border-border/70 mb-3">
            <h5 className="font-bold text-sm text-coral">{stateB.state}</h5>
            <span className="text-[10px] font-mono text-text-muted">Entity Benchmark B</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">Collections POS:</span>
              <span className="font-mono font-bold text-text-bright">{formatPosCrs(stateB.posCrs)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">Portfolio Share:</span>
              <span className="font-mono text-coral font-medium">{formatPercent(stateB.portfolioShare)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">Active Loan Accounts:</span>
              <span className="font-mono text-text-primary">{formatCount(stateB.accountsCount)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">30+ DPD Delinquency:</span>
              <span className="font-mono text-coral font-bold">{formatPercent(stateB.delinquentShare)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">NPA Ratio:</span>
              <span className="font-mono text-coral font-medium">{formatPercent(stateB.npaShare)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">Sales Disbursements:</span>
              <span className="font-mono text-accent-blue font-bold">{formatINR(stateB.salesDisbAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/60">
              <span className="text-text-muted">Disbursed Loans / Hubs:</span>
              <span className="font-mono text-text-primary">{stateB.salesDisbCount} loans ({stateB.branchesCount} hubs)</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-border/50 text-[10px] text-text-muted font-mono flex items-center justify-between">
            <span>Snapshot: Aug 2026 (Coll)</span>
            <span>Aug–Sep 2026 (Sales)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
