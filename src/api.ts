import type { DailySummaryResponse, BestWindowResponse } from "./types";
import { handleApiError } from "./apiUtils";

const API_BASE_URL = "https://localhost:7085/api/EnergyMix";

export const fetchDailySummaries = async (): Promise<
  DailySummaryResponse[]
> => {
  const response = await fetch(`${API_BASE_URL}/daily-summaries`);

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

export const fetchBestChargingWindow = async (
  hours: number,
): Promise<BestWindowResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/best-charging-window?chargingHours=${hours}`,
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};
