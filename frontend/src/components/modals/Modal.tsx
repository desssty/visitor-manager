import { useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import "./Modal.css";
import CloseIcon from "../../assets/Icon ionic-ios-close-circle.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      // Ждем 300ms, пока проиграется анимация закрытия, потом скрываем
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`modal-backdrop ${isOpen ? "open" : "close"}`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${isOpen ? "open" : "close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <img src={CloseIcon} alt="close button" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
