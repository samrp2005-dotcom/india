import React from 'react';
import { MetricSummaryCards } from './MetricSummaryCards';
import { MapLayerSelector } from '../../components/map/MapLayerSelector';
import { IndiaMap } from '../../components/map/IndiaMap';
import { GeographicRankingSidebar } from './GeographicRankingSidebar';
import { useAppStore } from '../../store/useAppStore';
import { formatPosCrs, formatPercent, formatCount } from '../../lib/formatters';

export const IndiaPulsePage: React.FC = () => {
  const { selectedState, getActiveStateAggregates } = useAppStore();
  const stateAggs = getActiveStateAggregates();
  const selectedData = selectedState ? stateAggs[selectedState] : null;

  return (
    <div className="w-full flex flex-col space-y-4 animate-in fade-in duration-300">
      {/* Top: 4 Defined KPI Modules */}
      <MetricSummaryCards />

      {/* Layer Selector & Quick Deck Controls */}
      <MapLayerSelector />

      {/* Main Geospatial Intelligence Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left: Interactive India Map (~65% Canvas) */}
        <div className="lg:col-span-8 flex flex-col">
          <IndiaMap />
        </div>

        {/* Right: Dynamic Geographic Ranking & Insight Sidebar (~35% Canvas) */}
        <div className="lg:col-span-4 flex flex-col">
          <GeographicRankingSidebar />
        </div>
      </div>

      {/* Coordinated Bottom Analytics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
        {/* Strip 1: Product Concentration */}
        <div className="glass-panel p-3.5 rounded-xl border border-border/70 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <span className="text-xs font-mono font-bold text-text-primary uppercase tracking-wide">
              Product Allocation Mix
            </span>
            <span className="text-[10px] font-mono text-teal">
              {selectedState ? selectedState : 'National'}
            </span>
          </div>
          <div className="py-2.5 space-y-2">
            {selectedData && selectedData.productBreakdown ? (
              Object.entries(selectedData.productBreakdown)
                .slice(0, 3)
                .map(([prod, pData]) => {
                  const share = selectedData.posCrs > 0 ? (pData.posCrs / selectedData.posCrs) * 100 : 0;
                  return (
                    <div key={prod} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-text-secondary">{prod}</span>
                        <span className="font-mono text-teal font-medium">
                          {formatPosCrs(pData.posCrs)} ({formatPercent(share)})
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal rounded-full"
                          style={{ width: `${Math.min(share, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
            ) : (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Home Loans (HL)</span>
                    <span className="font-mono text-teal font-medium">₹18.42 Cr (36.3%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-teal rounded-full" style={{ width: '36.3%' }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">MSME Secured</span>
                    <span className="font-mono text-teal font-medium">₹8.19 Cr (16.1%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-teal rounded-full" style={{ width: '16.1%' }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">SHAKTI Micro-Enterprises</span>
                    <span className="font-mono text-teal font-medium">₹8.15 Cr (16.1%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-teal rounded-full" style={{ width: '16.1%' }} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Strip 2: Aging Bucket Waterfall Profile */}
        <div className="glass-panel p-3.5 rounded-xl border border-border/70 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <span className="text-xs font-mono font-bold text-text-primary uppercase tracking-wide">
              Delinquency Bucket Structure
            </span>
            <span className="text-[10px] font-mono text-coral">
              Aging Distribution
            </span>
          </div>
          <div className="py-2.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">1.B1 (1–30 DPD)</span>
              <span className="font-mono text-accent-blue font-medium">₹40.23 Cr (79.2%)</span>
            </div>
            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
              <div className="h-full bg-accent-blue rounded-full" style={{ width: '79.2%' }} />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">2.B2 & 3.B3 (31–90 DPD)</span>
              <span className="font-mono text-status-b2 font-medium">₹3.30 Cr (6.5%)</span>
            </div>
            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
              <div className="h-full bg-status-b2 rounded-full" style={{ width: '6.5%' }} />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">4.NPA (90+ DPD)</span>
              <span className="font-mono text-coral font-medium">₹7.24 Cr (14.3%)</span>
            </div>
            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
              <div className="h-full bg-coral rounded-full" style={{ width: '14.3%' }} />
            </div>
          </div>
        </div>

        {/* Strip 3: Channel & Operational Allocations */}
        <div className="glass-panel p-3.5 rounded-xl border border-border/70 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <span className="text-xs font-mono font-bold text-text-primary uppercase tracking-wide">
              Servicing & Allocation Workflows
            </span>
            <span className="text-[10px] font-mono text-accent-cyan">
              Operational Status
            </span>
          </div>
          <div className="py-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center bg-surface/50 p-1.5 rounded">
              <span className="text-text-secondary">Unallocated Automated:</span>
              <span className="font-mono text-text-bright font-medium">75 Cohorts (₹38.16 Cr)</span>
            </div>
            <div className="flex justify-between items-center bg-surface/50 p-1.5 rounded">
              <span className="text-text-secondary">Field Remediation Assigned:</span>
              <span className="font-mono text-teal font-medium">15 Cohorts (₹8.72 Cr)</span>
            </div>
            <div className="flex justify-between items-center bg-surface/50 p-1.5 rounded">
              <span className="text-text-secondary">Strategic & Agency Outreach:</span>
              <span className="font-mono text-accent-blue font-medium">9 Cohorts (₹3.89 Cr)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
