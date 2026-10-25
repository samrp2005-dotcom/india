import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { formatPosCrs, formatINR, formatPercent, formatCount } from '../../lib/formatters';
import { Coins, AlertTriangle, TrendingUp, Filter, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const MetricSummaryCards: React.FC = () => {
  const { overview, selectedState, getActiveStateAggregates } = useAppStore();
  const stateAggs = getActiveStateAggregates();

  const selectedData = selectedState ? stateAggs[selectedState] : null;

  // Compute dynamically based on selection
  const totalPos = selectedData
    ? selectedData.posCrs
    : overview?.totalCollectionsPosCrs || 50.7742;

  const totalAccounts = selectedData
    ? selectedData.accountsCount
    : overview?.totalCollectionsAccounts || 561;

  const delinquentShare = selectedData
    ? selectedData.delinquentShare
    : 20.77;

  const npaShare = selectedData
    ? selectedData.npaShare
    : 14.26;

  const salesDisb = selectedData
    ? selectedData.salesDisbAmount
    : overview?.totalSalesDisbAmount || 9341622;

  const salesCount = selectedData
    ? selectedData.salesDisbCount
    : overview?.totalSalesDisbCount || 31;

  const sanctionAmt = selectedData
    ? selectedData.salesSanctionedAmount
    : overview?.totalSalesSanctionedAmount || 20910687;

  const loginAmt = selectedData
    ? selectedData.salesLoginAmount
    : overview?.totalSalesLoginAmount || 98925000;

  const branchesCount = selectedData
    ? selectedData.branchesCount
    : overview?.branchesCount || 88;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full">
      {/* KPI 1: Collections Exposure */}
      <div className="relative glass-panel rounded-xl p-4 border border-border/80 shadow-glass overflow-hidden hover:border-teal/50 transition-all group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal/5 rounded-bl-full pointer-events-none group-hover:bg-teal/10 transition-colors"></div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-teal/15 text-teal border border-teal/30">
              <Coins className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-text-secondary tracking-wide uppercase font-mono">
              Collections Exposure
            </span>
          </div>
          {selectedState && (
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-teal/10 text-teal border border-teal/20">
              {selectedData ? formatPercent(selectedData.portfolioShare) : '—'}
            </span>
          )}
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-extrabold text-text-bright tracking-tight font-mono">
            {formatPosCrs(totalPos)}
          </span>
          <span className="text-xs text-text-muted font-sans">
            {selectedState ? `in ${selectedState}` : 'Portfolio Total'}
          </span>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <span className="text-text-muted">Active Accounts:</span>
            <span className="font-mono font-medium text-text-primary">
              {formatCount(totalAccounts)}
            </span>
          </div>
          <span className="text-[10px] font-mono text-teal">
            Aug 2026 Snapshot
          </span>
        </div>
      </div>

      {/* KPI 2: Collections Pressure */}
      <div className="relative glass-panel rounded-xl p-4 border border-border/80 shadow-glass overflow-hidden hover:border-coral/50 transition-all group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-coral/5 rounded-bl-full pointer-events-none group-hover:bg-coral/10 transition-colors"></div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-coral/15 text-coral border border-coral/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-text-secondary tracking-wide uppercase font-mono">
              Delinquency Pressure
            </span>
          </div>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-coral/10 text-coral border border-coral/20">
            30+ DPD & NPA
          </span>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-extrabold text-coral tracking-tight font-mono">
            {formatPercent(delinquentShare)}
          </span>
          <span className="text-xs text-text-muted font-sans">
            of segment POS
          </span>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <span className="text-text-muted">NPA Ratio:</span>
            <span className="font-mono font-medium text-coral">
              {formatPercent(npaShare)}
            </span>
          </div>
          <span className="text-[10px] font-mono text-text-muted">
            B1 Cure Base: {formatPercent(100 - delinquentShare)}
          </span>
        </div>
      </div>

      {/* KPI 3: Sourcing & Disbursements */}
      <div className="relative glass-panel rounded-xl p-4 border border-border/80 shadow-glass overflow-hidden hover:border-accent-blue/50 transition-all group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/5 rounded-bl-full pointer-events-none group-hover:bg-accent-blue/10 transition-colors"></div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-accent-blue/15 text-accent-blue border border-accent-blue/30">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-text-secondary tracking-wide uppercase font-mono">
              Lending Disbursements
            </span>
          </div>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
            {branchesCount} Hubs
          </span>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-extrabold text-text-bright tracking-tight font-mono">
            {formatINR(salesDisb)}
          </span>
          <span className="text-xs text-text-muted font-sans">
            ({formatCount(salesCount)} loans)
          </span>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <span className="text-text-muted">Avg Yield:</span>
            <span className="font-mono font-medium text-teal">
              {selectedData && selectedData.salesAvgYield > 0
                ? `${selectedData.salesAvgYield}%`
                : '13.6% p.a.'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-accent-blue">
            Verified Branch Crosswalk
          </span>
        </div>
      </div>

      {/* KPI 4: Origination Demand Funnel */}
      <div className="relative glass-panel rounded-xl p-4 border border-border/80 shadow-glass overflow-hidden hover:border-accent-cyan/50 transition-all group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/5 rounded-bl-full pointer-events-none group-hover:bg-accent-cyan/10 transition-colors"></div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
              <Filter className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-text-secondary tracking-wide uppercase font-mono">
              Pipeline Conversion
            </span>
          </div>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
            Funnel Throughput
          </span>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-extrabold text-text-bright tracking-tight font-mono">
            {formatINR(sanctionAmt)}
          </span>
          <span className="text-xs text-text-muted font-sans">
            Sanctioned
          </span>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <span className="text-text-muted">Demand Logins:</span>
            <span className="font-mono font-medium text-text-primary">
              {formatINR(loginAmt)}
            </span>
          </div>
          <span className="text-[10px] font-mono text-accent-cyan">
            {loginAmt > 0 ? `${((sanctionAmt / loginAmt) * 100).toFixed(1)}% Approved` : '—'}
          </span>
        </div>
      </div>
    </div>
  );
};
