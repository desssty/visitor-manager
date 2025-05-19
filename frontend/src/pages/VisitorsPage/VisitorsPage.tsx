import { useEffect, useState } from "react";
import type { FC } from "react";
import "./VisitorsPage.css";
import { Header, Filters, VisitorsTable } from "../../components/VisitorsPage";
import type { Visitor } from "../../utils/visitorTypes";

const VisitorsPage: FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [presenceFilter, setPresenceFilter] = useState<string>("Без фильтра");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const loadVisitors = () => {
    fetch("http://localhost:3000/visitors")
      .then((res) => res.json())
      .then((data) => setVisitors(data))
      .catch((err) => console.error("Ошибка загрузки данных:", err));
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  const presentCount = visitors.filter((v) => v.present).length;
  const absentCount = visitors.filter((v) => !v.present).length;

  const filteredVisitors = visitors
    .filter((v) => {
      if (presenceFilter === "Присутствующим") return v.present;
      if (presenceFilter === "Отсутствующим") return !v.present;
      return true;
    })
    .filter((v) => v.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        presentCount={presentCount}
        absentCount={absentCount}
        onVisitorAdded={loadVisitors}
      />
      <VisitorsTable visitors={filteredVisitors} onSuccess={loadVisitors} />
      <Filters
        presenceFilter={presenceFilter}
        setPresenceFilter={setPresenceFilter}
      />
    </div>
  );
};

export default VisitorsPage;
