import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { DailySummaryResponse } from "../types";
import { fetchDailySummaries } from "../api";
import { ClipLoader } from "react-spinners";
import { CHART_COLORS, FUEL_TRANSLATIONS } from "../chartConfig";
import "../components.css";

export default function DailySummaries() {
  const [summaries, setSummaries] = useState<DailySummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailySummaries()
      .then((data) => setSummaries(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color="#007bff" size={40} />
        <p>Ładowanie danych z brytyjskiej sieci...</p>
      </div>
    );
  }

  if (summaries.length === 0) return <p>Brak danych do wyświetlenia.</p>;

  return (
    <div className="summaries-container">
      {summaries.map((summary, index) => {
        const chartData = Object.entries(summary.averageGenerationByFuel).map(
          ([name, value]) => ({
            name: FUEL_TRANSLATIONS[name.toLowerCase()] || name,
            value,
          }),
        );

        const dateObj = new Date(summary.date);
        const dateLabel = dateObj.toLocaleDateString("pl-PL", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });

        return (
          <div key={index} className="summary-card">
            <h3>{dateLabel}</h3>
            <h2 className="clean-energy-header">
              {summary.cleanEnergyPercentage}% Czystej Energii
            </h2>

            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {chartData.map((_entry, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={CHART_COLORS[i % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        );
      })}
    </div>
  );
}
