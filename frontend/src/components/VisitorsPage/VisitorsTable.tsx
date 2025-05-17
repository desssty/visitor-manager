import type { FC } from "react";
import "./VisitorsTable.css";
import type { Visitor } from "../../utils/visitorTypes";

interface VisitorsTableProps {
  visitors: Visitor[];
}

const VisitorsTable: FC<VisitorsTableProps> = ({ visitors }) => {
  return (
    <div className="visitors-table-wrapper">
      <table className="visitors-table">
        <thead>
          <tr>
            <th>Номер</th>
            <th>ФИО</th>
            <th>Компания</th>
            <th>Группа</th>
            <th>Присутствие</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor, index) => (
            <tr key={visitor.id}>
              <td>{index + 1}</td>
              <td>{visitor.fullName}</td>
              <td>{visitor.company}</td>
              <td>{visitor.group}</td>
              <td>
                <span
                  className={`presence-dot ${
                    visitor.present ? "present" : "absent"
                  }`}
                ></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorsTable;
