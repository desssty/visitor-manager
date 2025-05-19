import type { FC } from "react";
import Modal from "../../modals/Modal";
import VisitorForm from "../VisitorForm/VisitorForm";
import type { Visitor } from "../../../utils/visitorTypes";
import type { VisitorFormData } from "../../../utils/VisitorFormData";

interface EditVisitorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  visitor: Visitor;
}

const EditVisitorFormModal: FC<EditVisitorFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  visitor,
}) => {
  const handleSubmit = async (data: VisitorFormData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/visitors/${visitor.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: visitor.id,
            fullName: data.fullName,
            company: data.company,
            group: data.group,
            present: data.present,
          }),
        }
      );

      console.log("PUT response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка: ${response.status} — ${errorText}`);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Ошибка обновления:", error);
      alert("Не удалось обновить данные");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Удалить посетителя?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/visitors/${visitor.id}`,
        {
          method: "DELETE",
        }
      );

      console.log("DELETE response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка: ${response.status} — ${errorText}`);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Ошибка при удалении");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="add-visitor-modal-wrapper">
        <VisitorForm
          initialData={visitor}
          onSubmit={handleSubmit}
          onClose={onClose}
          submitLabel="Сохранить"
          showDeleteButton
          onDelete={handleDelete}
        />
      </div>
    </Modal>
  );
};

export default EditVisitorFormModal;
