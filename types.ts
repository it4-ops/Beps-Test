export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  location: string;
  date: string;
}

export interface RegionalInsight {
  region: string;
  sentimentScore: number; // 0 to 100
  keyIssue: string;
  keyStrength: string;
}

export interface SwotResult {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[]; // Criticalities
}

export interface AnalysisResult {
  brandName: string;
  totalReviewsAnalyzed: number;
  averageSentiment: number; // 0 to 100
  swot: SwotResult;
  regionalInsights: RegionalInsight[];
  summary: string;
}

export enum AppState {
  IDLE,
  ANALYZING,
  SUCCESS,
  ERROR,
}