import type { FC } from "react";
import "./Filters.css";

interface FiltersProps {
  presenceFilter: string;
  setPresenceFilter: (value: string) => void;
}

const Filters: FC<FiltersProps> = ({ presenceFilter, setPresenceFilter }) => {
  return (
    <div className="bottom-filters">
      <span className="filter-label">Фильтровать по:</span>
      <button
        className={`filter-button ${
          presenceFilter === "Отсутствующим" ? "active" : ""
        }`}
        onClick={() => setPresenceFilter("Отсутствующим")}
      >
        Отсутствующим
      </button>
      <button
        className={`filter-button ${
          presenceFilter === "Присутствующим" ? "active" : ""
        }`}
        onClick={() => setPresenceFilter("Присутствующим")}
      >
        Присутствующим
      </button>
      <button
        className={`filter-button ${
          presenceFilter === "Без фильтра" ? "active" : ""
        }`}
        disabled={presenceFilter === "Без фильтра"}
        onClick={() => setPresenceFilter("Без фильтра")}
      >
        Без фильтра
      </button>
    </div>
  );
};

export default Filters;
