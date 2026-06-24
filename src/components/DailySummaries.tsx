import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { DailySummaryResponse } from "../types";
import { fetchDailySummaries } from "../api";
import "../components.css";

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#6366F1",
  "#F97316",
  "#14B8A6",
  "#6B7280",
];

export default function DailySummaries() {
  const [summaries, setSummaries] = useState<DailySummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailySummaries()
      .then((data) => setSummaries(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Ładowanie danych z brytyjskiej sieci...</p>;
  if (summaries.length === 0) return <p>Brak danych do wyświetlenia.</p>;

  return (
    <div className="summaries-container">
      {summaries.map((summary, index) => {
        const chartData = Object.entries(summary.averageGenerationByFuel).map(
          ([name, value]) => ({
            name,
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
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
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
