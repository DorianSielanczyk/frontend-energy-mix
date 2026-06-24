export interface DailySummaryResponse {
  date: string;
  cleanEnergyPercentage: number;
  averageGenerationByFuel: Record<string, number>;
}

export interface BestWindowResponse {
  startTime: string;
  endTime: string;
  averageCleanEnergyPercentage: number;
}
