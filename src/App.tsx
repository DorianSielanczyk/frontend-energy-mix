import DailySummaries from "./components/DailySummaries";
import ChargingCalculator from "./components/ChargingCalculator";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">UK Energy Mix Dashboard</h1>

      <ChargingCalculator />

      <hr className="app-divider" />

      <h2 className="app-subtitle">
        Prognoza Miksu Energetycznego na najbliższe dni
      </h2>
      <DailySummaries />
    </div>
  );
}

export default App;
