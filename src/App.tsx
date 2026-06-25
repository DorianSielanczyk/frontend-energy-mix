import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DailySummaries from "./components/DailySummaries";
import ChargingCalculator from "./components/ChargingCalculator";
import "./App.css";

function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [isLightMode]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "pl" ? "en" : "pl";
    i18n.changeLanguage(nextLang);
  };

  return (
    <>
      <div className="top-controls">
        <button className="theme-toggle-btn lang-btn" onClick={toggleLanguage}>
          {i18n.language === "pl" ? "EN" : "PL"}
        </button>

        <button
          className="theme-toggle-btn"
          onClick={() => setIsLightMode(!isLightMode)}
        >
          {isLightMode ? t("app.darkMode") : t("app.lightMode")}
        </button>
      </div>

      <div className="app-container">
        <h1 className="app-title">{t("app.title")}</h1>
        <div className="dashboard-layout">
          <aside className="sidebar">
            <ChargingCalculator />
          </aside>
          <main className="main-content">
            <h2 className="app-subtitle">{t("app.subtitle")}</h2>
            <DailySummaries />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
