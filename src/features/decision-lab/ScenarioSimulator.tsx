import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { formatPosCrs, formatPercent, formatINR } from '../../lib/formatters';
import { Calculator, AlertCircle, ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';

export const ScenarioSimulator: React.FC = () => {
  const { overview, getActiveStateAggregates } = useAppStore();
  const stateAggs = getActiveStateAggregates();
  const stateList = Object.values(stateAggs);

  // Target Pool Selection:
  // 'all-delinquent' | 'all-portfolio' | specific state
  const [selectedPool, setSelectedPool] = useState<string>('all-delinquent');
  const [improvementRate, setImprovementRate] = useState<number>(8.5); // % (0 to 25)

  // Calculate Base Eligible Exposure
  let eligiblePos = 0;
  let poolDescription = '';

  if (selectedPool === 'all-delinquent') {
    // Sum of B2, B3, NPA across active portfolio
    eligiblePos = stateList.reduce(
      (sum, s) => sum + (s.posCrs * s.delinquentShare) / 100,
      0
    );
    poolDescription = 'Active 30+ DPD & NPA cohorts across all geographies';
  } else if (selectedPool === 'all-portfolio') {
    eligiblePos = overview?.totalCollectionsPosCrs || 50.7742;
    poolDescription = 'Total gross portfolio collections principal outstanding';
  } else if (stateAggs[selectedPool]) {
    const s = stateAggs[selectedPool];
    eligiblePos = (s.posCrs * s.delinquentShare) / 100;
    poolDescription = `Delinquent arrears pool isolated strictly to ${selectedPool}`;
  }

  // Illustrative Scenario Arithmetic
  const recoveredAmountCr = eligiblePos * (improvementRate / 100);
  const recoveredRupees = recoveredAmountCr * 10000000;

  // Sensitivity scenarios for table / curve
  const sensitivitySteps = [2.5, 5.0, 7.5, 10.0, 15.0, 20.0];

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/70">
        <div>
          <div className="flex items-center space-x-2">
            <Calculator className="w-4 h-4 text-teal" />
            <h3 className="text-sm font-bold text-text-bright uppercase tracking-wider font-mono">
              Hypothetical Collections Resolution Simulator
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Simulate potential capital release by adjusting resolution uplift across target exposure cohorts
          </p>
        </div>

        {/* Mandatory Transparency Label */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-coral/10 border border-coral/30 text-[11px] text-coral font-medium self-start sm:self-auto">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Illustrative scenario arithmetic (not a default forecast)</span>
        </div>
      </div>

      {/* Simulator Inputs & Hero Metric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Inputs Panel (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-4 rounded-xl border border-border/80 flex flex-col justify-between space-y-4">
          {/* Target Exposure Pool Selector */}
          <div>
            <label className="text-xs font-semibold text-text-primary block mb-1.5">
              Target Exposure Pool
            </label>
            <select
              value={selectedPool}
              onChange={(e) => setSelectedPool(e.target.value)}
              className="w-full bg-surface-elevated border border-border text-xs text-text-primary rounded-lg px-3 py-2 focus:outline-none focus:border-teal font-sans"
            >
              <option value="all-delinquent">National 30+ DPD & NPA Arrears (~₹10.5 Cr)</option>
              <option value="all-portfolio">Entire National Collections POS (₹50.77 Cr)</option>
              <optgroup label="State Specific Arrears">
                {stateList.map((s) => (
                  <option key={s.state} value={s.state}>
                    {s.state} Arrears (₹{((s.posCrs * s.delinquentShare) / 100).toFixed(2)} Cr)
                  </option>
                ))}
              </optgroup>
            </select>
            <span className="text-[10px] text-text-muted mt-1 block font-mono">
              {poolDescription}
            </span>
          </div>

          {/* Configurable Uplift Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-text-primary">
                Hypothetical Resolution Uplift:
              </label>
              <span className="font-mono font-bold text-teal text-base">
                {improvementRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="25.0"
              step="0.5"
              value={improvementRate}
              onChange={(e) => setImprovementRate(Number(e.target.value))}
              className="w-full accent-teal h-2 bg-surface rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-text-muted mt-1">
              <span>0.5% (Conservative)</span>
              <span>12.5% (Balanced)</span>
              <span>25.0% (Aggressive)</span>
            </div>
          </div>

          {/* Underlying Pool Summary */}
          <div className="pt-2 border-t border-border/60 flex justify-between items-center text-xs">
            <span className="text-text-muted">Eligible Principal Baseline:</span>
            <span className="font-mono font-bold text-text-bright">
              {formatPosCrs(eligiblePos)}
            </span>
          </div>
        </div>

        {/* Right Output Hero Card (7 cols) */}
        <div className="lg:col-span-7 glass-panel-elevated p-5 rounded-xl border border-teal/40 shadow-glow flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-teal font-semibold">
              Simulated Outcome
            </span>
            <h4 className="text-sm font-semibold text-text-secondary mt-0.5">
              Hypothetical Recovered Principal
            </h4>
            <div className="flex items-baseline space-x-3 mt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-teal font-mono tracking-tight">
                {formatPosCrs(recoveredAmountCr)}
              </span>
              <span className="text-xs text-text-muted font-mono">
                (~{formatINR(recoveredRupees)})
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              Based on applying a <span className="text-teal font-bold font-mono">{improvementRate}%</span> resolution
              uplift across <span className="font-mono font-semibold text-text-primary">{formatPosCrs(eligiblePos)}</span> of eligible debt.
            </p>
          </div>

          {/* Sensitivity Table Matrix */}
          <div className="mt-4 pt-3 border-t border-border/70">
            <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-2 font-semibold">
              Sensitivity Stress Matrix Across Uplift Assumptions:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {sensitivitySteps.map((step) => {
                const stepVal = eligiblePos * (step / 100);
                const isCurrent = Math.abs(step - improvementRate) < 1.0;
                return (
                  <div
                    key={step}
                    onClick={() => setImprovementRate(step)}
                    className={`p-2 rounded-lg text-center cursor-pointer transition-all border ${
                      isCurrent
                        ? 'bg-teal text-background font-bold border-teal shadow-glow'
                        : 'bg-surface/50 border-border hover:bg-surface-elevated text-text-secondary'
                    }`}
                  >
                    <span className="text-[10px] block opacity-80">{step}% Uplift</span>
                    <span className="text-xs font-mono font-semibold block mt-0.5">
                      {formatPosCrs(stepVal)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
