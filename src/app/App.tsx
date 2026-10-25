import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Header } from '../components/layout/Header';
import { IndiaPulsePage } from '../features/india-pulse/IndiaPulsePage';
import { HotspotExplorerPage } from '../features/hotspot-explorer/HotspotExplorerPage';
import { DecisionLabPage } from '../features/decision-lab/DecisionLabPage';
import { DataQualityModal } from '../components/layout/DataQualityModal';
import { Compass, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const { activeTab, isLoading, error, loadData } = useAppStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-teal/40 shadow-glow animate-pulse">
          <Compass className="w-8 h-8 text-teal animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold font-mono text-text-bright uppercase tracking-wider">
            Lending<span className="text-teal">Pulse</span>
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Loading India Lending Intelligence Atlas & Preprocessed Datasets...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="glass-panel p-6 rounded-2xl border border-coral/40 max-w-md space-y-3">
          <h3 className="text-base font-bold text-coral">Failed to Initialize Atlas</h3>
          <p className="text-xs text-text-secondary">{error}</p>
          <button
            onClick={() => loadData()}
            className="px-4 py-2 rounded-lg bg-teal text-background text-xs font-bold shadow-glow"
          >
            Retry Data Ingestion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col selection:bg-teal selection:text-background">
      {/* Top Header */}
      <Header />

      {/* Main Experience View */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto p-3 sm:p-5">
        {activeTab === 'india-pulse' && <IndiaPulsePage />}
        {activeTab === 'hotspot-explorer' && <HotspotExplorerPage />}
        {activeTab === 'decision-lab' && <DecisionLabPage />}
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface/80 border-t border-border/70 py-3.5 px-4 mt-8">
        <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-text-muted">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-teal">LENDING PULSE</span>
            <span>·</span>
            <span>Kaleidoscope 3.0 — Data Voyage</span>
            <span>·</span>
            <span>Institutional Lending Intelligence Atlas</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span className="text-teal flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-teal" />
              <span>100% Math Reconciled</span>
            </span>
            <span>WGS84 Maps & deck.gl</span>
            <span>August 2026 Snapshot</span>
          </div>
        </div>
      </footer>

      {/* Data Quality & Audit Modal */}
      <DataQualityModal />
    </div>
  );
};
