import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { formatPosCrs, formatINR, formatPercent, formatCount } from '../../lib/formatters';

export const MapTooltip: React.FC = () => {
  const { hoveredGeography, selectedLayer } = useAppStore();

  if (!hoveredGeography) return null;

  const { name, type, x, y, data } = hoveredGeography;

  // Prevent tooltip from clipping outside viewport
  const leftPos = Math.min(Math.max(x + 15, 20), window.innerWidth - 300);
  const topPos = Math.min(Math.max(y - 20, 20), window.innerHeight - 280);

  return (
    <div
      className="fixed pointer-events-none z-50 glass-panel-elevated p-3.5 rounded-xl border border-teal/40 shadow-glass w-72 animate-in fade-in duration-150"
      style={{ left: `${leftPos}px`, top: `${topPos}px` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border/80">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-teal">
            {type === 'branch' ? 'Sales Branch' : type === 'district' ? 'District Slice' : 'State Aggregate'}
          </span>
          <h4 className="text-sm font-bold text-text-bright truncate leading-tight">
            {name}
          </h4>
        </div>
        {data?.portfolioShare !== undefined && (
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal/15 text-teal border border-teal/30">
            {formatPercent(data.portfolioShare)}
          </span>
        )}
      </div>

      {/* Content based on Hover Type */}
      {type === 'branch' ? (
        <div className="pt-2.5 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-text-muted">State / City:</span>
            <span className="font-medium text-text-primary">{data.state} ({data.district})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Disbursed Amount:</span>
            <span className="font-mono font-semibold text-teal">
              {formatINR(data.disbAmount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Disbursed Loans:</span>
            <span className="font-mono text-text-primary">{formatCount(data.disbCount)} loans</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Contracted Yield:</span>
            <span className="font-mono text-accent-blue">{data.disbYield > 0 ? `${data.disbYield}%` : 'Standard'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Demand Logins:</span>
            <span className="font-mono text-text-secondary">{formatINR(data.loginAmount)}</span>
          </div>
        </div>
      ) : data ? (
        <div className="pt-2.5 space-y-1.5 text-xs">
          {/* Layer Specific Hero Value */}
          <div className="flex justify-between items-center py-1 px-2 rounded bg-surface/80 border border-border/50">
            <span className="text-[11px] text-text-secondary font-medium">
              {selectedLayer === 'exposure'
                ? 'Collections POS:'
                : selectedLayer === 'pressure'
                ? 'Delinquency (30+ DPD):'
                : selectedLayer === 'sales'
                ? 'Disbursed Volume:'
                : 'Unallocated Ratio:'}
            </span>
            <span className="font-mono font-bold text-sm text-teal">
              {selectedLayer === 'exposure'
                ? formatPosCrs(data.posCrs)
                : selectedLayer === 'pressure'
                ? formatPercent(data.delinquentShare)
                : selectedLayer === 'sales'
                ? formatINR(data.salesDisbAmount)
                : formatPercent(data.posCrs > 0 ? ((data.allocationBreakdown?.unallocated || 0) / data.posCrs) * 100 : 0)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-text-muted">Active Accounts:</span>
            <span className="font-mono text-text-primary">{formatCount(data.accountsCount)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-text-muted">Delinquency Mix:</span>
            <span className="font-mono text-coral font-medium">
              B1: {formatPercent(data.b1Share || 0)} | 30+: {formatPercent(data.delinquentShare || 0)}
            </span>
          </div>

          {data.salesDisbAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-text-muted">Sales Disbursements:</span>
              <span className="font-mono text-accent-blue">
                {formatINR(data.salesDisbAmount)} ({data.branchesCount || 0} branches)
              </span>
            </div>
          )}

          {data.coverageNotice && (
            <div className="pt-1.5 border-t border-border/50 text-[10px] text-accent-cyan font-mono leading-tight">
              * {data.coverageNotice}
            </div>
          )}
        </div>
      ) : (
        <div className="pt-2 text-xs text-text-muted">
          No active collections or sales records in sample dataset.
        </div>
      )}
    </div>
  );
};
