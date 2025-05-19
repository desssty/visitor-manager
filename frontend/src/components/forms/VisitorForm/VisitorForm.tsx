import type { FC } from "react";
import { useState, useEffect } from "react";
import CommonButton from "../../buttons/CommonButton/CommonButton";
import "./VisitorForm.css";
import Arrow from "../../../assets/Icon ionic-md-arrow-dropdown.svg";

interface VisitorFormProps {
  initialData?: {
    fullName: string;
    company: string;
    group: string;
    present: boolean;
  };
  onSubmit: (data: {
    fullName: string;
    company: string;
    group: string;
    present: boolean;
  }) => void;
  onClose: () => void;
  submitLabel: string;
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

const VisitorForm: FC<VisitorFormProps> = ({
  initialData,
  onSubmit,
  onClose,
  submitLabel,
  showDeleteButton = false,
  onDelete,
}) => {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [group, setGroup] = useState("default");
  const [present, setPresent] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName);
      setCompany(initialData.company);
      setGroup(initialData.group);
      setPresent(initialData.present);
    }
  }, [initialData]);

  const groupOptions = ["Прохожий", "Клиент", "Партнер"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !company || group === "default") {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    onSubmit({ fullName, company, group, present });
  };

  const handleGroupSelect = (value: string) => {
    setGroup(value);
    setIsGroupOpen(false);
  };

  return (
    <form className="add-visitor-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-label">ФИО</label>
        <input
          type="text"
          className="form-input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label className="form-label">Компания</label>
        <input
          type="text"
          className="form-input"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label className="form-label">Группа</label>
        <div className={`custom-select-wrapper ${isGroupOpen ? "open" : ""}`}>
          <div
            className="custom-select-selected"
            onClick={() => setIsGroupOpen(!isGroupOpen)}
          >
            {group === "default" ? "Выбрать" : group}
            <img
              src={Arrow}
              className={`dropdown-arrow ${isGroupOpen ? "rotate" : ""}`}
              alt="arrow"
            />
          </div>

          {isGroupOpen && (
            <div className="custom-select-options">
              {groupOptions.map((option) => (
                <div
                  key={option}
                  className="custom-select-option"
                  onClick={() => handleGroupSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="presence">
          Присутствие
        </label>
        <label className="custom-checkbox">
          <input
            type="checkbox"
            id="presence"
            checked={present}
            onChange={(e) => setPresent(e.target.checked)}
          />
          <span className="checkmark"></span>
        </label>
      </div>

      <div className="button-panel">
        <CommonButton color="green" type="submit">
          {submitLabel}
        </CommonButton>
        {showDeleteButton && onDelete && (
          <CommonButton color="red" type="button" onClick={onDelete}>
            Удалить
          </CommonButton>
        )}
        <CommonButton color="gray" type="button" onClick={onClose}>
          Закрыть
        </CommonButton>
      </div>
    </form>
  );
};

export default VisitorForm;
