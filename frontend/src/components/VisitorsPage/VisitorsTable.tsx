import type { FC } from "react";
import { useState } from "react";
import "./VisitorsTable.css";
import type { Visitor } from "../../utils/visitorTypes";
import EditVisitorFormModal from "../forms/EditVisitorFormModal/EditVisitorFormModal";

interface VisitorsTableProps {
  visitors: Visitor[];
  onSuccess: () => void;
}

const VisitorsTable: FC<VisitorsTableProps> = ({ visitors, onSuccess }) => {
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  const handleClose = () => {
    setSelectedVisitor(null);
  };

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
            <tr
              key={visitor.id}
              onClick={() => setSelectedVisitor(visitor)}
              style={{ cursor: "pointer" }}
            >
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

      {selectedVisitor && (
        <EditVisitorFormModal
          isOpen={!!selectedVisitor}
          onClose={handleClose}
          onSuccess={() => {
            onSuccess();
            handleClose();
          }}
          visitor={selectedVisitor}
        />
      )}
    </div>
  );
};

export default VisitorsTable;
