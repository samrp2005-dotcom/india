import React from 'react';
import { PrioritizationMatrix } from './PrioritizationMatrix';
import { ScenarioSimulator } from './ScenarioSimulator';
import { EvidenceInsightEngine } from './EvidenceInsightEngine';
import { ShieldCheck, Compass } from 'lucide-react';

export const DecisionLabPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col space-y-6 animate-in fade-in duration-300">
      {/* Top Experience Banner */}
      <div className="glass-panel-elevated p-4 rounded-2xl border border-border/80 shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-teal/15 text-teal border border-teal/30 shadow-glow">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-teal font-semibold">
              Experience 3 · Decision Lab
            </span>
            <h2 className="text-xl font-extrabold text-text-bright tracking-tight">
              Action Prioritization & Scenario Intelligence
            </h2>
            <p className="text-xs text-text-secondary">
              Which segments deserve remedial investigation, and what could different collection improvements achieve?
            </p>
          </div>
        </div>
      </div>

      {/* Part A: Opportunity & Risk Prioritization */}
      <div className="glass-panel p-5 rounded-2xl border border-border/80 shadow-glass">
        <PrioritizationMatrix />
      </div>

      {/* Part B: Scenario Resolution Simulator */}
      <div className="glass-panel p-5 rounded-2xl border border-border/80 shadow-glass">
        <ScenarioSimulator />
      </div>

      {/* Part C: Evidence-Based Deterministic Insight Engine */}
      <div className="glass-panel p-5 rounded-2xl border border-border/80 shadow-glass">
        <EvidenceInsightEngine />
      </div>
    </div>
  );
};
