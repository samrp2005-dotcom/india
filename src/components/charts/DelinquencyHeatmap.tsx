import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { formatPosCrs, formatPercent } from '../../lib/formatters';
import { Flame } from 'lucide-react';

const BUCKET_COLUMNS = [
  { id: '1.B1', label: '1.B1 (1–30 DPD)', risk: 'low' },
  { id: '2.B2', label: '2.B2 (31–60 DPD)', risk: 'medium' },
  { id: '3.B3', label: '3.B3 (61–90 DPD)', risk: 'high' },
  { id: '4.NPA', label: '4.NPA (90+ DPD)', risk: 'critical' }
];

export const DelinquencyHeatmap: React.FC = () => {
  const { getActiveStateAggregates, selectedState } = useAppStore();
  const stateAggs = getActiveStateAggregates();

  // Top states by exposure or focused state
  const statesToShow = selectedState
    ? [stateAggs[selectedState]].filter(Boolean)
    : Object.values(stateAggs).sort((a, b) => b.posCrs - a.posCrs).slice(0, 8);

  const getCellColor = (bucketId: string, share: number) => {
    if (share <= 0) return 'bg-surface-elevated/40 text-text-muted';

    if (bucketId === '1.B1') {
      if (share > 75) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-300/60 font-bold';
      return 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400';
    }

    if (bucketId === '2.B2') {
      if (share > 20) return 'bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300 font-bold border border-orange-300/60';
      return 'bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400';
    }

    if (bucketId === '3.B3') {
      if (share > 15) return 'bg-orange-200 text-orange-900 dark:bg-orange-900/50 dark:text-orange-200 font-bold border border-orange-400/60';
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    }

    // NPA (90+ DPD)
    if (share > 25) return 'bg-orange-600 text-white font-bold border border-orange-700 shadow-sm';
    if (share > 10) return 'bg-orange-500 text-white font-semibold';
    return 'bg-orange-200 text-orange-900 font-medium';
  };

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-border/70 mb-3">
        <div className="flex items-center space-x-2">
          <Flame className="w-4 h-4 text-coral" />
          <h4 className="text-xs font-bold text-text-bright uppercase tracking-wider font-mono">
            Delinquency Distribution Heatmap
          </h4>
        </div>
        <span className="text-[10px] font-mono text-text-muted">
          Absolute (₹ Cr) & Segment Share (%)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border/70 text-[11px] font-mono text-text-muted">
              <th className="py-2 px-3 font-semibold text-text-secondary">Geography</th>
              <th className="py-2 px-3 text-right">Total POS</th>
              {BUCKET_COLUMNS.map((col) => (
                <th key={col.id} className="py-2 px-3 text-center">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 font-mono text-xs">
            {statesToShow.map((st) => {
              const total = st.posCrs;
              return (
                <tr key={st.state} className="hover:bg-surface-elevated/40 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-text-bright">
                    {st.state}
                  </td>
                  <td className="py-2.5 px-3 text-right text-text-primary font-bold">
                    {formatPosCrs(total)}
                  </td>
                  {BUCKET_COLUMNS.map((col) => {
                    const bData = st.bucketBreakdown?.[col.id];
                    const pos = bData ? bData.posCrs : 0;
                    const share = bData ? bData.share : 0;
                    const cellStyle = getCellColor(col.id, share);

                    return (
                      <td key={col.id} className="py-2 px-2 text-center">
                        <div className={`py-1.5 px-2 rounded-lg ${cellStyle} transition-all`}>
                          <span className="block font-bold">
                            {pos > 0 ? formatPosCrs(pos) : '—'}
                          </span>
                          <span className="block text-[9px] opacity-80">
                            {pos > 0 ? formatPercent(share) : '0%'}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
