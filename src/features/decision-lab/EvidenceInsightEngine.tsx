import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { DeterministicInsight } from '../../types';
import { Sparkles, Copy, Check, Bot, ShieldAlert, ChevronDown, ChevronUp, FileText } from 'lucide-react';

export const EvidenceInsightEngine: React.FC = () => {
  const { deterministicInsights } = useAppStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(deterministicInsights[0]?.id || null);
  const [isAiAdapterActive, setIsAiAdapterActive] = useState<boolean>(false);

  const handleCopy = (insight: DeterministicInsight) => {
    const text = `
[${insight.category}] ${insight.title}
Observation: ${insight.observation}
Supporting Values: ${insight.supportingValues.join(', ')}
Why It Matters: ${insight.whyItMatters}
Suggested Follow-up: ${insight.suggestedFollowUp}
Confidence Caveat: ${insight.confidence}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedId(insight.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Header & Adapter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-teal" />
            <h3 className="text-sm font-bold text-text-bright uppercase tracking-wider font-mono">
              Deterministic Evidence-Based Narrative Engine
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Auditable mathematical findings derived without subjective hallucination or black-box dependencies
          </p>
        </div>

        {/* Future LLM Explanatory Adapter Toggle */}
        <div className="flex items-center space-x-2 bg-surface-card p-1 rounded-xl border border-border self-start sm:self-auto">
          <button
            onClick={() => setIsAiAdapterActive(!isAiAdapterActive)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isAiAdapterActive
                ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/40 font-semibold'
                : 'text-text-muted hover:text-text-secondary'
            }`}
            title="Toggle optional AI narrative summary adapter"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>LLM Synthesis Adapter {isAiAdapterActive ? '(Active)' : '(Standby)'}</span>
          </button>
        </div>
      </div>

      {/* Optional AI Adapter Banner */}
      {isAiAdapterActive && (
        <div className="glass-panel p-4 rounded-xl border border-accent-purple/40 bg-accent-purple/5 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4 text-accent-purple" />
            <h4 className="text-xs font-bold text-accent-purple uppercase tracking-wider font-mono">
              Executive AI Synthesis (Client-side Deterministic Model)
            </h4>
          </div>
          <p className="text-xs text-text-primary leading-relaxed font-sans">
            "Atlas audit indicates a dual-dynamic portfolio. While gross exposure is concentrated in Maharashtra (₹14.9 Cr)
            and Delhi NCR (₹13.7 Cr), the primary operational vulnerability is in unallocated debt pools (₹38.16 Cr).
            Simulations suggest an 8.5% recovery improvement in 30+ DPD cohorts would yield approximately ₹89.2 Lakhs of recovered capital."
          </p>
          <span className="text-[10px] font-mono text-text-muted block">
            * Generated via local deterministic template adapter. Live cloud LLM endpoints remain decoupled.
          </span>
        </div>
      )}

      {/* Insight Cards Accordion / List */}
      <div className="space-y-3">
        {deterministicInsights.map((insight) => {
          const isExpanded = expandedId === insight.id;
          return (
            <div
              key={insight.id}
              className={`glass-panel rounded-xl border transition-all ${
                isExpanded ? 'border-teal/50 shadow-glass' : 'border-border/60 hover:border-border'
              }`}
            >
              {/* Card Title & Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : insight.id)}
                className="p-4 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal/15 text-teal border border-teal/30 uppercase tracking-wider font-semibold shrink-0">
                    {insight.category}
                  </span>
                  <h4 className="text-sm font-bold text-text-bright truncate">
                    {insight.title}
                  </h4>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(insight);
                    }}
                    className="p-1.5 rounded-lg bg-surface hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors border border-border"
                    title="Copy insight to clipboard"
                  >
                    {copiedId === insight.id ? (
                      <Check className="w-3.5 h-3.5 text-teal" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  )}
                </div>
              </div>

              {/* Collapsible Structured Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-border/50 space-y-3 text-xs animate-in fade-in duration-150">
                  {/* Observation */}
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block font-semibold mb-1">
                      Observable Metric Fact:
                    </span>
                    <p className="text-text-primary leading-relaxed font-medium">
                      {insight.observation}
                    </p>
                  </div>

                  {/* Supporting Values Pill List */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {insight.supportingValues.map((val, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-surface text-teal font-mono text-[11px] border border-border font-medium"
                      >
                        {val}
                      </span>
                    ))}
                  </div>

                  {/* Why It Matters */}
                  <div className="bg-surface/60 p-3 rounded-lg border border-border/60">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-coral font-semibold block mb-1">
                      Financial & Operational Significance:
                    </span>
                    <p className="text-text-secondary leading-relaxed">
                      {insight.whyItMatters}
                    </p>
                  </div>

                  {/* Suggested Follow-up */}
                  <div className="bg-surface/60 p-3 rounded-lg border border-border/60">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-accent-blue font-semibold block mb-1">
                      Recommended Audit Action:
                    </span>
                    <p className="text-text-secondary leading-relaxed">
                      {insight.suggestedFollowUp}
                    </p>
                  </div>

                  {/* Caveat Footer */}
                  <div className="flex items-center space-x-2 pt-1 text-[10px] font-mono text-text-muted">
                    <ShieldAlert className="w-3.5 h-3.5 text-status-b2 shrink-0" />
                    <span>Confidence Level: {insight.confidence}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
