import type { FC } from "react";
import { useState } from "react";
import Modal from "../../modals/Modal";
import CommonButton from "../../buttons/CommonButton/CommonButton";
import "./AddVisitorForm.css";

interface AddVisitorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddVisitorFormModal: FC<AddVisitorFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [group, setGroup] = useState("default");
  const [present, setPresent] = useState(false);
  const groupOptions = ["Прохожий", "Клиент", "Партнер"];
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !company || group === "default") {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const newVisitor = {
      id: Date.now().toString(),
      fullName,
      company,
      group,
      present,
    };

    try {
      const response = await fetch("http://localhost:3000/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVisitor),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении посетителя");
      }

      setFullName("");
      setCompany("");
      setGroup("default");
      setPresent(false);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось добавить посетителя");
    }
  };

  const handleGroupSelect = (value: string) => {
    setGroup(value);
    setIsGroupOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isExpanded={isGroupOpen}>
      <div className="add-visitor-modal-wrapper">
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
            <div
              className={`custom-select-wrapper ${isGroupOpen ? "open" : ""}`}
            >
              <div
                className="custom-select-selected"
                onClick={() => setIsGroupOpen(!isGroupOpen)}
              >
                {group === "default" ? "Выбрать" : group}
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
              Добавить
            </CommonButton>
            <CommonButton color="gray" type="button" onClick={onClose}>
              Закрыть
            </CommonButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddVisitorFormModal;
