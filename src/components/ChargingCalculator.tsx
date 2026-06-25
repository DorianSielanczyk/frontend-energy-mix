import { useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchBestChargingWindow } from "../api";
import type { BestWindowResponse } from "../types";
import "../components.css";

export default function ChargingCalculator() {
  const [hours, setHours] = useState<number | "">("");
  const [result, setResult] = useState<BestWindowResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { t, i18n } = useTranslation();

  const handleCalculate = async () => {
    setError("");
    setResult(null);

    const hoursNum = Number(hours);
    if (
      !hoursNum ||
      !Number.isInteger(hoursNum) ||
      hoursNum < 1 ||
      hoursNum > 6
    ) {
      setError(t("calculator.errorRange"));
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
    const locale = i18n.language === "pl" ? "pl-PL" : "en-GB";

    return new Date(isoString).toLocaleString(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="calculator-container">
      <h2>{t("calculator.title")}</h2>

      <div className="input-group">
        <label className="input-label">{t("calculator.hoursLabel")}</label>
        <input
          type="number"
          min="1"
          max="6"
          step="1"
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
          {loading ? t("calculator.loadingBtn") : t("calculator.calculateBtn")}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {result && (
        <div className="result-box">
          <h3 className="result-title">{t("calculator.resultTitle")}</h3>
          <p>
            <strong>{t("calculator.start")}</strong>{" "}
            {formatDate(result.startTime)}
          </p>
          <p>
            <strong>{t("calculator.end")}</strong> {formatDate(result.endTime)}
          </p>
          <p className="result-highlight">
            {t("calculator.cleanEnergy")} {result.averageCleanEnergyPercentage}%
          </p>
        </div>
      )}
    </div>
  );
}
