export type LayerType = 'exposure' | 'pressure' | 'sales' | 'allocation';

export type ActiveTab = 'india-pulse' | 'hotspot-explorer' | 'decision-lab';

export type NormalizationMode = 'normalized' | 'reported';

export interface StateAggregate {
  state: string;
  posCrs: number;
  portfolioShare: number;
  accountsCount: number;
  writeOffAmt: number;
  aumOnBook: number;
  aumOffBook: number;
  bucketBreakdown: Record<string, { posCrs: number; count: number; share: number }>;
  delinquentShare: number;
  npaShare: number;
  b1Share: number;
  productBreakdown: Record<string, { posCrs: number; accounts: number }>;
  allocationBreakdown: Record<string, number>;
  dispositionBreakdown: Record<string, number>;
  cityTierBreakdown: Record<string, number>;
  districtsCount: number;
  salesDisbAmount: number;
  salesDisbCount: number;
  salesSanctionedAmount: number;
  salesLoginAmount: number;
  salesAvgYield: number;
  branchesCount: number;
  coverageNotice?: string;
}

export interface DistrictAggregate {
  state: string;
  district: string;
  posCrs: number;
  accountsCount: number;
  stateShare: number;
  nationalShare: number;
  bucketBreakdown: Record<string, number>;
  productBreakdown: Record<string, number>;
  allocationBreakdown: Record<string, number>;
  cityTier: string | null;
}

export interface BranchLocationData {
  branch: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  disbAmount: number;
  disbCount: number;
  sanctionedAmount: number;
  loginAmount: number;
  disbYield: number;
  leadSource: string;
  dept: string;
  zone: string;
}

export interface TreemapSubItem {
  name: string;
  value: number;
  share: number;
}

export interface TreemapItem {
  name: string;
  value: number;
  accounts: number;
  share: number;
  children: TreemapSubItem[];
}

export interface SankeyNode {
  name: string;
  category: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export interface PrioritizationItem {
  id: string;
  name: string;
  type: 'state' | 'product' | 'district';
  state?: string;
  posCrs: number;
  delinquentPosCrs: number;
  delinquentShare: number;
  unallocatedPosCrs: number;
  unallocatedShare: number;
  salesDisbAmount: number;
  accountsCount: number;
  compositePriorityScore: number;
  priorityTier: 'Critical Focus' | 'Elevated Pressure' | 'Moderate Attention' | 'Stable Monitor';
  primaryDriver: string;
  recommendedAction: string;
}

export interface DeterministicInsight {
  id: string;
  category: 'Concentration' | 'Pressure' | 'Operational Allocation' | 'Lending Momentum' | 'Cross-Segment Divergence';
  title: string;
  observation: string;
  supportingValues: string[];
  whyItMatters: string;
  suggestedFollowUp: string;
  confidence: 'High (Verified Math)' | 'Medium (Coverage Limited)' | 'Caveat (Cross-Fact Proxy)';
  relatedGeography?: string;
  metricValue?: number;
}

export interface PortfolioOverview {
  totalCollectionsPosCrs: number;
  totalCollectionsAccounts: number;
  totalSalesDisbAmount: number;
  totalSalesDisbCount: number;
  totalSalesSanctionedAmount: number;
  totalSalesLoginAmount: number;
  statesCount: number;
  districtsCount: number;
  branchesCount: number;
  asOfDate: string;
}

export interface DataQualityReport {
  summary: {
    collectionsRowCount: number;
    salesRowCount: number;
    collectionsTotalPosCrs: number;
    collectionsTotalAccounts: number;
    salesTotalDisbAmount: number;
    salesTotalDisbCount: number;
    salesTotalSanctionedAmount: number;
    salesTotalLoginAmount: number;
    collectionsSnapshotPeriod: string;
    salesSnapshotPeriod: string;
    branchMappingMatchRate: number;
    districtNormalizationMatchRate: number;
  };
  collectionsChecks: {
    nullPosCount: number;
    negativePosCount: number;
    statesIdentified: string[];
    delhiNcrDistricts: { district: string; mappedState: string; posCrs: number }[];
    bucketDistribution: Record<string, { count: number; posCrs: number }>;
    dispositionTagDistribution: Record<string, number>;
    allocationTypeDistribution: Record<string, number>;
  };
  salesChecks: {
    branchesTotal: number;
    branchesMapped: number;
    unmappedBranches: string[];
    zeroDisbursementRows: number;
    deptDistribution: Record<string, number>;
    leadSourceDistribution: Record<string, number>;
  };
  criticalModelingNotices: string[];
}
