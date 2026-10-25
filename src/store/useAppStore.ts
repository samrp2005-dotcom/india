import { create } from 'zustand';
import {
  ActiveTab,
  LayerType,
  NormalizationMode,
  StateAggregate,
  DistrictAggregate,
  BranchLocationData,
  TreemapItem,
  SankeyData,
  PrioritizationItem,
  DeterministicInsight,
  PortfolioOverview,
  DataQualityReport
} from '../types';

interface HoveredGeographyInfo {
  name: string;
  type: 'state' | 'district' | 'branch';
  x: number;
  y: number;
  data?: any;
}

interface AppState {
  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Map settings
  selectedLayer: LayerType;
  setSelectedLayer: (layer: LayerType) => void;
  normalizationMode: NormalizationMode;
  setNormalizationMode: (mode: NormalizationMode) => void;
  showBranches: boolean;
  setShowBranches: (show: boolean) => void;
  showBubbles: boolean;
  setShowBubbles: (show: boolean) => void;
  showHeatmap: boolean;
  setShowHeatmap: (show: boolean) => void;

  // Selections
  selectedState: string | null;
  setSelectedState: (state: string | null) => void;
  selectedDistrict: string | null;
  setSelectedDistrict: (district: string | null) => void;
  comparisonState: string | null;
  setComparisonState: (state: string | null) => void;
  hoveredGeography: HoveredGeographyInfo | null;
  setHoveredGeography: (info: HoveredGeographyInfo | null) => void;

  // Global filters
  selectedProductCategory: string;
  setSelectedProductCategory: (category: string) => void;
  selectedBucket: string;
  setSelectedBucket: (bucket: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals / Drawers
  isDataQualityOpen: boolean;
  setIsDataQualityOpen: (open: boolean) => void;

  // Data assets
  overview: PortfolioOverview | null;
  stateAggregatesNormalized: Record<string, StateAggregate>;
  stateAggregatesReported: Record<string, StateAggregate>;
  districtAggregates: DistrictAggregate[];
  branches: BranchLocationData[];
  productTreemap: TreemapItem[];
  sankeyData: SankeyData | null;
  prioritization: PrioritizationItem[];
  deterministicInsights: DeterministicInsight[];
  dqReport: DataQualityReport | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadData: () => Promise<void>;
  resetToNational: () => void;
  resetAllFilters: () => void;
  getActiveStateAggregates: () => Record<string, StateAggregate>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Defaults
  activeTab: 'india-pulse',
  setActiveTab: (tab) => set({ activeTab: tab }),

  selectedLayer: 'exposure',
  setSelectedLayer: (layer) => set({ selectedLayer: layer }),
  normalizationMode: 'normalized',
  setNormalizationMode: (mode) => set({ normalizationMode: mode }),
  showBranches: true,
  setShowBranches: (show) => set({ showBranches: show }),
  showBubbles: false,
  setShowBubbles: (show) => set({ showBubbles: show }),
  showHeatmap: false,
  setShowHeatmap: (show) => set({ showHeatmap: show }),

  selectedState: null,
  setSelectedState: (state) => set({ selectedState: state, selectedDistrict: null }),
  selectedDistrict: null,
  setSelectedDistrict: (district) => set({ selectedDistrict: district }),
  comparisonState: null,
  setComparisonState: (state) => set({ comparisonState: state }),
  hoveredGeography: null,
  setHoveredGeography: (info) => set({ hoveredGeography: info }),

  selectedProductCategory: 'ALL',
  setSelectedProductCategory: (category) => set({ selectedProductCategory: category }),
  selectedBucket: 'ALL',
  setSelectedBucket: (bucket) => set({ selectedBucket: bucket }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  isDataQualityOpen: false,
  setIsDataQualityOpen: (open) => set({ isDataQualityOpen: open }),

  overview: null,
  stateAggregatesNormalized: {},
  stateAggregatesReported: {},
  districtAggregates: [],
  branches: [],
  productTreemap: [],
  sankeyData: null,
  prioritization: [],
  deterministicInsights: [],
  dqReport: null,
  isLoading: true,
  error: null,

  getActiveStateAggregates: () => {
    const mode = get().normalizationMode;
    return mode === 'normalized'
      ? get().stateAggregatesNormalized
      : get().stateAggregatesReported;
  },

  resetToNational: () => {
    set({
      selectedState: null,
      selectedDistrict: null,
      searchQuery: ''
    });
  },

  resetAllFilters: () => {
    set({
      selectedProductCategory: 'ALL',
      selectedBucket: 'ALL',
      searchQuery: '',
      selectedDistrict: null
    });
  },

  loadData: async () => {
    try {
      set({ isLoading: true, error: null });

      const [
        overviewRes,
        normRes,
        repRes,
        distRes,
        branchRes,
        treemapRes,
        sankeyRes,
        prioRes,
        insightRes,
        dqRes
      ] = await Promise.all([
        fetch('/data/portfolio_overview.json').then(r => r.json()),
        fetch('/data/state_aggregates_normalized.json').then(r => r.json()),
        fetch('/data/state_aggregates_reported.json').then(r => r.json()),
        fetch('/data/district_aggregates.json').then(r => r.json()),
        fetch('/data/branch_locations.json').then(r => r.json()),
        fetch('/data/product_treemap.json').then(r => r.json()),
        fetch('/data/sankey_exposure_anatomy.json').then(r => r.json()),
        fetch('/data/decision_prioritization.json').then(r => r.json()),
        fetch('/data/deterministic_insights.json').then(r => r.json()),
        fetch('/data/data_quality_report.json').then(r => r.json())
      ]);

      set({
        overview: overviewRes,
        stateAggregatesNormalized: normRes,
        stateAggregatesReported: repRes,
        districtAggregates: distRes,
        branches: branchRes,
        productTreemap: treemapRes,
        sankeyData: sankeyRes,
        prioritization: prioRes,
        deterministicInsights: insightRes,
        dqReport: dqRes,
        isLoading: false
      });
    } catch (err: any) {
      console.error('Failed to load application data:', err);
      set({
        isLoading: false,
        error: err?.message || 'Failed to load analytical datasets'
      });
    }
  }
}));
