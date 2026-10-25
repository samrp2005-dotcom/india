import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { LayerType } from '../../types';
import { Coins, AlertTriangle, TrendingUp, GitFork, MapPin, CircleDot, Flame } from 'lucide-react';

interface LayerOption {
  id: LayerType;
  label: string;
  tag: string;
  metric: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const LAYERS: LayerOption[] = [
  {
    id: 'exposure',
    label: 'Collections Exposure',
    tag: 'Layer A',
    metric: 'POS (₹ Cr) & Share',
    icon: Coins,
    accentColor: 'text-teal'
  },
  {
    id: 'pressure',
    label: 'Collections Pressure',
    tag: 'Layer B',
    metric: 'Delinquency & NPA Mix',
    icon: AlertTriangle,
    accentColor: 'text-coral'
  },
  {
    id: 'sales',
    label: 'Lending Activity',
    tag: 'Layer C',
    metric: 'Disbursed Volume & Yield',
    icon: TrendingUp,
    accentColor: 'text-accent-blue'
  },
  {
    id: 'allocation',
    label: 'Allocation Distribution',
    tag: 'Layer D',
    metric: 'Disposition & Workflows',
    icon: GitFork,
    accentColor: 'text-accent-cyan'
  }
];

export const MapLayerSelector: React.FC = () => {
  const {
    selectedLayer,
    setSelectedLayer,
    showBranches,
    setShowBranches,
    showBubbles,
    setShowBubbles,
    showHeatmap,
    setShowHeatmap
  } = useAppStore();

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2 bg-surface-card/90 border border-border/80 rounded-xl backdrop-blur-md">
      {/* 4 Main Layers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 flex-1">
        {LAYERS.map((l) => {
          const Icon = l.icon;
          const isActive = selectedLayer === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setSelectedLayer(l.id)}
              className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-surface-elevated border border-teal/40 shadow-glow text-text-bright'
                  : 'bg-surface/50 border border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
              }`}
            >
              <div
                className={`p-1.5 rounded-md ${
                  isActive ? 'bg-teal/20 text-teal' : 'bg-surface text-text-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal font-semibold">
                    {l.tag}
                  </span>
                  <span className="text-xs font-semibold truncate text-text-primary">
                    {l.label}
                  </span>
                </div>
                <p className="text-[10px] text-text-muted truncate font-mono">
                  {l.metric}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* deck.gl Analytical Overlays */}
      <div className="flex items-center space-x-1.5 bg-surface/70 px-2 py-1.5 rounded-lg border border-border/50 self-end sm:self-center">
        <span className="text-[10px] uppercase font-mono text-text-muted mr-1">
          deck.gl:
        </span>
        <button
          onClick={() => setShowBranches(!showBranches)}
          className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
            showBranches
              ? 'bg-teal/20 text-teal border border-teal/40'
              : 'text-text-muted hover:text-text-secondary'
          }`}
          title="Toggle verified sales branch locations"
        >
          <MapPin className="w-3 h-3" />
          <span>Branches</span>
        </button>
        <button
          onClick={() => setShowBubbles(!showBubbles)}
          className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
            showBubbles
              ? 'bg-teal/20 text-teal border border-teal/40'
              : 'text-text-muted hover:text-text-secondary'
          }`}
          title="Toggle proportional exposure bubbles"
        >
          <CircleDot className="w-3 h-3" />
          <span>Bubbles</span>
        </button>
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
            showHeatmap
              ? 'bg-coral/20 text-coral border border-coral/40'
              : 'text-text-muted hover:text-text-secondary'
          }`}
          title="Toggle delinquency density intensity"
        >
          <Flame className="w-3 h-3" />
          <span>Density</span>
        </button>
      </div>
    </div>
  );
};
