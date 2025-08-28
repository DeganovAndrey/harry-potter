import { useState } from "react";
import FacultyChart from "./components/FacultyChart";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useHarryPotterData } from "./hooks/useHarryPotterData";
import type { DateRange, FacultyData } from "./types/harryPotter";
import "./App.css";
import DateRangePicker from "./components/DateRangePicker";

function App() {
  const { loading, error, getStudentsByDateRange } = useHarryPotterData();
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [chartData, setChartData] = useState<FacultyData[]>([]);
  const [showChart, setShowChart] = useState(false);

  const handleApplyDateRange = () => {
    const data = getStudentsByDateRange(dateRange.start, dateRange.end);
    setChartData(data);
    setShowChart(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Ошибка загрузки данных</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Статистика студентов Хогвартса</h1>
        <p>Анализ распределения студентов по факультетам</p>
      </header>

      <main className="app-main">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onApply={handleApplyDateRange}
        />

        {showChart && <FacultyChart data={chartData} />}

        {!showChart && !loading && (
          <div className="instruction">
            <p>
              Выберите диапазон дат рождения, чтобы увидеть распределение
              студентов
            </p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Данные предоставлены HP-API • Hogwarts ©</p>
      </footer>
    </div>
  );
}

export default App;
