export interface AIParseResult {
  description: string;
  amount: number;
  category: string;
  date: Date;
  tags: string[];
  confidence: number;
}

export interface AIAnalysisResult {
  summary: string;
  insights: string[];
  recommendations: string[];
}
