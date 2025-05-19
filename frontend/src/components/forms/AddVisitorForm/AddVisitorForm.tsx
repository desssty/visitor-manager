import type { FC } from "react";
import Modal from "../../modals/Modal";
import VisitorForm from "../VisitorForm/VisitorForm";
import type { VisitorFormData } from "../../../utils/VisitorFormData";

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
  const handleSubmit = async (data: VisitorFormData) => {
    try {
      // Получаем текущих посетителей
      const visitorsResponse = await fetch("http://localhost:3000/visitors");
      if (!visitorsResponse.ok) throw new Error("Ошибка при загрузке списка");

      const visitors: { id: string }[] = await visitorsResponse.json();

      // Определяем максимальный id (предполагаем, что id — это число в строке)
      const maxId = visitors.reduce((max, visitor) => {
        const idNumber = parseInt(visitor.id, 10);
        return isNaN(idNumber) ? max : Math.max(max, idNumber);
      }, 0);

      const newVisitor = {
        id: (maxId + 1).toString(),
        ...data,
      };

      // Отправляем нового посетителя
      const response = await fetch("http://localhost:3000/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVisitor),
      });

      if (!response.ok) throw new Error();

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Не удалось добавить посетителя");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="add-visitor-modal-wrapper">
        <VisitorForm
          onSubmit={handleSubmit}
          onClose={onClose}
          submitLabel="Добавить"
        />
      </div>
    </Modal>
  );
};

export default AddVisitorFormModal;
