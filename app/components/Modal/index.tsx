import { createPortal } from "react-dom";
import styles from "./style.module.css";
import { useEffect } from "react";

interface IModalProps {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
interface IModalContentProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalContent: React.FC<IModalContentProps> = ({
  title,
  children,
  onClose,
}) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      data-testid="modal-overlay"
    >
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

const Modal: React.FC<IModalProps> = ({
  title,
  isVisible,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isVisible]);

  return (
    <>
      {isVisible &&
        createPortal(
          <ModalContent title={title} onClose={onClose}>
            {children}
          </ModalContent>,
          document.body
        )}
    </>
  );
};

export default Modal;
