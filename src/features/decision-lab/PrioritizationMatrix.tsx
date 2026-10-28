import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { PrioritizationItem } from '../../types';
import { formatPosCrs, formatINR, formatPercent, formatCount } from '../../lib/formatters';
import { ShieldCheck, Sliders, Info, AlertTriangle, ArrowRight } from 'lucide-react';

export const PrioritizationMatrix: React.FC = () => {
  const { prioritization, setSelectedState, setActiveTab } = useAppStore();

  // Configurable transparent weights (Default: 35% POS, 30% Delinq, 20% Unallocated, 15% Sales)
  const [wPos, setWPos] = useState<number>(35);
  const [wDelinq, setWDelinq] = useState<number>(30);
  const [wUnalloc, setWUnalloc] = useState<number>(20);
  const [wSales, setWSales] = useState<number>(15);
  const [showFormula, setShowFormula] = useState<boolean>(false);

  const totalWeight = wPos + wDelinq + wUnalloc + wSales || 1;

  // Re-calculate scores dynamically based on user adjusted weights
  const maxPos = Math.max(...prioritization.map((p) => p.posCrs), 1);
  const maxSales = Math.max(...prioritization.map((p) => p.salesDisbAmount), 1);

  const scoredItems: PrioritizationItem[] = prioritization.map((item) => {
    const posNorm = (item.posCrs / maxPos) * 100;
    const delinqNorm = item.delinquentShare;
    const unallocNorm = item.unallocatedShare;
    const salesNorm = (item.salesDisbAmount / maxSales) * 100;

    const dynamicScore = Number(
      (
        (wPos / totalWeight) * posNorm +
        (wDelinq / totalWeight) * delinqNorm +
        (wUnalloc / totalWeight) * unallocNorm +
        (wSales / totalWeight) * salesNorm
      ).toFixed(1)
    );

    let tier: PrioritizationItem['priorityTier'] = 'Stable Monitor';
    if (dynamicScore >= 60) tier = 'Critical Focus';
    else if (dynamicScore >= 40) tier = 'Elevated Pressure';
    else if (dynamicScore >= 20) tier = 'Moderate Attention';

    return {
      ...item,
      compositePriorityScore: dynamicScore,
      priorityTier: tier
    };
  }).sort((a, b) => b.compositePriorityScore - a.compositePriorityScore);

  const getTierBadge = (tier: PrioritizationItem['priorityTier']) => {
    switch (tier) {
      case 'Critical Focus':
        return 'bg-coral/20 text-coral border border-coral/40 shadow-glow-coral';
      case 'Elevated Pressure':
        return 'bg-status-b2/20 text-status-b2 border border-status-b2/40';
      case 'Moderate Attention':
        return 'bg-teal/20 text-teal border border-teal/40';
      default:
        return 'bg-surface text-text-muted border border-border';
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Header & Formula Explanation Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/70">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-teal" />
            <h3 className="text-sm font-bold text-text-bright uppercase tracking-wider font-mono">
              Deterministic Opportunity & Risk Prioritization
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Multi-factor composite scoring model based strictly on observable balance sheet and origination metrics
          </p>
        </div>

        <button
          onClick={() => setShowFormula(!showFormula)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-text-secondary hover:text-teal transition-colors self-start sm:self-auto"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showFormula ? 'Hide Weight Controls' : 'Adjust Weight Parameters'}</span>
        </button>
      </div>

      {/* Weight Customizer Drawer (Collapsible) */}
      {showFormula && (
        <div className="glass-panel p-4 rounded-xl border border-teal/30 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-teal font-semibold">
              Scoring Formula: Score = (w₁·POS + w₂·Delinq + w₃·Unallocated + w₄·Sales) / Σw
            </span>
            <span className="text-[11px] text-text-muted">
              * Fully deterministic; no black-box assumptions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">POS Scale:</span>
                <span className="font-mono text-teal font-bold">{wPos}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={wPos}
                onChange={(e) => setWPos(Number(e.target.value))}
                className="w-full accent-teal h-1.5 bg-surface rounded"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">Delinquency (30+):</span>
                <span className="font-mono text-coral font-bold">{wDelinq}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={wDelinq}
                onChange={(e) => setWDelinq(Number(e.target.value))}
                className="w-full accent-coral h-1.5 bg-surface rounded"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">Unallocated Share:</span>
                <span className="font-mono text-accent-cyan font-bold">{wUnalloc}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={wUnalloc}
                onChange={(e) => setWUnalloc(Number(e.target.value))}
                className="w-full accent-accent-cyan h-1.5 bg-surface rounded"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">Sales Velocity:</span>
                <span className="font-mono text-accent-blue font-bold">{wSales}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={wSales}
                onChange={(e) => setWSales(Number(e.target.value))}
                className="w-full accent-accent-blue h-1.5 bg-surface rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Prioritization Table */}
      <div className="overflow-x-auto rounded-xl border border-border/80 bg-surface/50">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border text-[11px] font-mono text-text-muted bg-surface/80">
              <th className="py-2.5 px-3">Rank / Region</th>
              <th className="py-2.5 px-3">Priority Tier</th>
              <th className="py-2.5 px-3 text-right">Composite Score</th>
              <th className="py-2.5 px-3 text-right">Collections POS</th>
              <th className="py-2.5 px-3 text-right">30+ DPD %</th>
              <th className="py-2.5 px-3 text-right">Unallocated %</th>
              <th className="py-2.5 px-3 text-right">Sales Disb</th>
              <th className="py-2.5 px-3">Primary Driver</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 font-mono text-xs">
            {scoredItems.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-surface-elevated/50 transition-colors group"
              >
                <td className="py-2.5 px-3 font-semibold text-text-bright">
                  <span className="text-text-muted mr-2">{index + 1}.</span>
                  {item.name}
                </td>

                <td className="py-2.5 px-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${getTierBadge(
                      item.priorityTier
                    )}`}
                  >
                    {item.priorityTier}
                  </span>
                </td>

                <td className="py-2.5 px-3 text-right font-bold text-teal text-sm">
                  {item.compositePriorityScore}
                </td>

                <td className="py-2.5 px-3 text-right text-text-primary">
                  {formatPosCrs(item.posCrs)}
                </td>

                <td className="py-2.5 px-3 text-right text-coral">
                  {formatPercent(item.delinquentShare)}
                </td>

                <td className="py-2.5 px-3 text-right text-text-secondary">
                  {formatPercent(item.unallocatedShare)}
                </td>

                <td className="py-2.5 px-3 text-right text-accent-blue">
                  {item.salesDisbAmount > 0 ? formatINR(item.salesDisbAmount) : '—'}
                </td>

                <td className="py-2.5 px-3 font-sans text-text-secondary truncate max-w-[180px]">
                  {item.primaryDriver}
                </td>

                <td className="py-2.5 px-3 text-center">
                  <button
                    onClick={() => {
                      setSelectedState(item.name);
                      setActiveTab('hotspot-explorer');
                    }}
                    className="p-1 rounded bg-surface hover:bg-teal hover:text-white text-teal transition-colors"
                    title={`Inspect ${item.name} in Hotspot Explorer`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
