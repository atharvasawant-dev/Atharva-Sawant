
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: { title: string; uri: string }[];
}

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface SectorData {
  name: string;
  performance: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}
