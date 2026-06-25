import { useState, useEffect } from "react";
import DailySummaries from "./components/DailySummaries";
import ChargingCalculator from "./components/ChargingCalculator";
import "./App.css";

function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [isLightMode]);

  return (
    <>
      <button
        className="theme-toggle-btn"
        onClick={() => setIsLightMode(!isLightMode)}
      >
        {isLightMode ? "🌙 Tryb Ciemny" : "☀️ Tryb Jasny"}
      </button>

      <div className="app-container">
        <h1 className="app-title">UK Energy Mix Dashboard</h1>

        <div className="dashboard-layout">
          <aside className="sidebar">
            <ChargingCalculator />
          </aside>

          <main className="main-content">
            <h2 className="app-subtitle">
              Prognoza Miksu Energetycznego na najbliższe dni
            </h2>
            <DailySummaries />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
