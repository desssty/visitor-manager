import { FC } from "react";
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
          presenceFilter === "Все" ? "active gray" : "gray"
        }`}
        onClick={() => setPresenceFilter("Все")}
      >
        Без фильтра
      </button>
    </div>
  );
};

export default Filters;
