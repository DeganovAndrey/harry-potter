import type React from "react";
import type { DateRange } from "../types/harryPotter";
import { CalendarDays } from "lucide-react";

interface DataRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onApply: () => void;
}

const DateRangePicker: React.FC<DataRangePickerProps> = ({
  dateRange,
  onDateRangeChange,
  onApply,
}) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onDateRangeChange({ ...dateRange, start: date });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onDateRangeChange({ ...dateRange, end: date });
  };

  return (
    <div className="date-range-picker">
      <div className="picker-header">
        <CalendarDays size={100} />
        <h3>Выберите диапазон дат рождения </h3>
      </div>

      <div className="date-inputs">
        <div className="input-group">
          <label htmlFor="start-date">С:</label>
          <input
            id="start-date"
            type="date"
            value={dateRange.start?.toISOString().split("T")[0] || ""}
            onChange={handleStartDateChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="end-date">По:</label>
          <input
            id="end-date"
            type="date"
            value={dateRange.end?.toISOString().split("T")[0] || ""}
            onChange={handleEndDateChange}
          />
        </div>
      </div>

      <button
        className="apply-button"
        onClick={onApply}
        disabled={!dateRange.start && !dateRange.end}
      >
        Показать график
      </button>
    </div>
  );
};

export default DateRangePicker;
