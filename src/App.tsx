import DailySummaries from "./components/DailySummaries";
import ChargingCalculator from "./components/ChargingCalculator";
import "./App.css";

function App() {
  return (
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
  );
}

export default App;
