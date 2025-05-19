import type { FC, ReactNode } from "react";
import "./Modal.css";
import CloseIcon from "../../assets/Icon ionic-ios-close-circle.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isExpanded?: boolean;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, isExpanded }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div
        className={`modal-content ${isExpanded ? "expanded" : "initial"}`}
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
