import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  Activity,
  Layers,
  Search,
  ShieldCheck,
  RotateCcw,
  Compass,
  FileSpreadsheet,
  Info
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedState,
    selectedDistrict,
    resetToNational,
    normalizationMode,
    setNormalizationMode,
    searchQuery,
    setSearchQuery,
    setIsDataQualityOpen,
    getActiveStateAggregates
  } = useAppStore();

  const stateAggs = getActiveStateAggregates();
  const stateNames = Object.keys(stateAggs).sort();

  return (
    <header className="w-full bg-surface/95 border-b border-border/70 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5 shadow-glass">
      <div className="max-w-[1800px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-dark/30 to-teal/20 border border-teal/40 shadow-glow">
            <Compass className="w-5 h-5 text-teal animate-pulse-subtle" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal shadow-glow"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-wider text-text-bright text-lg leading-tight uppercase font-mono">
                Lending<span className="text-teal">Pulse</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal/10 border border-teal/30 text-teal font-medium tracking-wide">
                v3.0 ATLAS
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-blue/10 border border-accent-blue/30 text-accent-blue font-medium tracking-wide hidden sm:inline-block">
                KALEIDOSCOPE
              </span>
            </div>
            <p className="text-xs text-text-secondary tracking-normal font-sans">
              Discover growth. Diagnose pressure. Identify opportunities.
            </p>
          </div>
        </div>

        {/* Navigation Experiences */}
        <nav className="flex items-center bg-surface-card p-1 rounded-xl border border-border">
          <button
            onClick={() => setActiveTab('india-pulse')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'india-pulse'
                ? 'bg-teal text-background font-semibold shadow-glow'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>India Pulse</span>
          </button>

          <button
            onClick={() => setActiveTab('hotspot-explorer')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'hotspot-explorer'
                ? 'bg-teal text-background font-semibold shadow-glow'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Hotspot Explorer</span>
            {selectedState && (
              <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] bg-background/20 font-mono">
                {selectedState}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('decision-lab')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'decision-lab'
                ? 'bg-teal text-background font-semibold shadow-glow'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Decision Lab</span>
          </button>
        </nav>

        {/* Controls: Search, Geography Mode, Data Quality */}
        <div className="flex items-center space-x-2.5">
          {/* Geographic Search Dropdown */}
          <div className="relative">
            <div className="flex items-center bg-surface-card border border-border rounded-lg px-2.5 py-1.5 focus-within:border-teal transition-colors">
              <Search className="w-3.5 h-3.5 text-text-muted mr-1.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search state..."
                className="bg-transparent text-xs text-text-primary placeholder:text-text-muted focus:outline-none w-28 sm:w-36 font-sans"
              />
            </div>
            {searchQuery.trim().length > 0 && (
              <div className="absolute top-full mt-1.5 left-0 w-48 glass-dropdown rounded-lg py-1 z-50 max-h-48 overflow-y-auto">
                {stateNames
                  .filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        useAppStore.getState().setSelectedState(s);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-text-secondary hover:text-teal hover:bg-surface-elevated flex items-center justify-between"
                    >
                      <span>{s}</span>
                      <span className="text-[10px] font-mono text-text-muted">
                        ₹{stateAggs[s]?.posCrs.toFixed(2)} Cr
                      </span>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Delhi NCR Normalization Toggle */}
          <div className="flex items-center bg-surface-card border border-border rounded-lg p-0.5 text-[11px]">
            <button
              onClick={() => setNormalizationMode('normalized')}
              title="Official Census state boundaries (Delhi NCR districts mapped to UP, Haryana, Delhi)"
              className={`px-2 py-1 rounded transition-colors ${
                normalizationMode === 'normalized'
                  ? 'bg-surface-elevated text-teal font-medium border border-teal/30'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              Census Norm
            </button>
            <button
              onClick={() => setNormalizationMode('reported')}
              title="Operational cluster view (retains Delhi NCR as unified operational entity)"
              className={`px-2 py-1 rounded transition-colors ${
                normalizationMode === 'reported'
                  ? 'bg-surface-elevated text-accent-blue font-medium border border-accent-blue/30'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              NCR Cluster
            </button>
          </div>

          {/* Reset View */}
          {(selectedState || selectedDistrict) && (
            <button
              onClick={resetToNational}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-surface-elevated hover:bg-border text-xs text-text-secondary hover:text-text-bright transition-all border border-border"
              title="Reset map camera and selection to national overview"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}

          {/* Data Quality & Audit Modal Button */}
          <button
            onClick={() => setIsDataQualityOpen(true)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-teal/10 hover:bg-teal/20 border border-teal/40 text-teal text-xs font-medium transition-all"
            title="Inspect Data Quality Audit & Mathematical Reconciliation"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Audit Reconciled</span>
          </button>
        </div>
      </div>
    </header>
  );
};
