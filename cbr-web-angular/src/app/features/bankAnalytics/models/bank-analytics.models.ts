export interface HomeScreenData {
    ubprE013: PerformanceMetric[];
    ubprE630: FinancialMetric[];
}

export interface PerformanceMetric {
    id: number;
    period: string;
    value: number;
    description: string;
}

export interface FinancialMetric {
    id: number;
    period: string;
    value: number;
    description: string;
}

export interface Bank {
    institutionKey: number;
    name: string;
    location: string;
    assetSize: number;
}

export interface ChartData {
    period: string;
    value: number;
}

export interface PeerGroup {
    id: number;
    name: string;
    description: string;
    bankCount: number;
    assetSizeRange: string;
    isCustom: boolean;
}

export interface PeerGroupMetrics {
    key: string;
    name: string;
    value: number;
    comparison: number;
    trend: 'up' | 'down' | 'neutral';
}

export interface PeerGroupAnalysis {
    peerGroup: PeerGroup;
    metrics: PeerGroupMetrics[];
    charts: {
        [key: string]: ChartData[];
    };
}

export interface RiskCategory {
    id: number;
    name: string;
    description: string;
    score: number;
    trend: 'up' | 'down' | 'neutral';
    metrics: RiskMetric[];
}

export interface RiskMetric {
    id: number;
    name: string;
    value: number;
    benchmark: number;
    weight: number;
    impact: 'high' | 'medium' | 'low';
    trend: 'up' | 'down' | 'neutral';
}

export interface RiskProfile {
    overallScore: number;
    overallTrend: 'up' | 'down' | 'neutral';
    categories: RiskCategory[];
    historicalData: ChartData[];
}
