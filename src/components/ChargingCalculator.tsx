import { useState } from "react";
import { fetchBestChargingWindow } from "../api";
import type { BestWindowResponse } from "../types";
import "../components.css";

export default function ChargingCalculator() {
  const [hours, setHours] = useState<number | "">("");
  const [result, setResult] = useState<BestWindowResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setError("");
    setResult(null);

    const hoursNum = Number(hours);
    if (!hoursNum || hoursNum < 1 || hoursNum > 6) {
      setError("Podaj prawidłowy czas ładowania (od 1 do 6 godzin).");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchBestChargingWindow(hoursNum);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString("pl-PL", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="calculator-container">
      <h2>Zaplanuj ładowanie EV</h2>

      <div className="input-group">
        <label className="input-label">Czas ładowania (godziny):</label>
        <input
          type="number"
          min="1"
          max="6"
          value={hours}
          onChange={(e) =>
            setHours(e.target.value ? Number(e.target.value) : "")
          }
          className="hours-input"
        />
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="calc-button"
        >
          {loading ? "Szukam..." : "Oblicz"}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {result && (
        <div className="result-box">
          <h3 className="result-title">Optymalne okno znalezione!</h3>
          <p>
            <strong>Start:</strong> {formatDate(result.startTime)}
          </p>
          <p>
            <strong>Koniec:</strong> {formatDate(result.endTime)}
          </p>
          <p className="result-highlight">
            Średnia czystej energii: {result.averageCleanEnergyPercentage}%
          </p>
        </div>
      )}
    </div>
  );
}
