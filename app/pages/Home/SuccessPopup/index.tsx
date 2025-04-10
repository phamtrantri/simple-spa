import Modal from "@components/Modal";
import styles from "./style.module.css";
import BasicButton from "@components/BasicButton";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}
const SuccessPopup: React.FC<IProps> = ({ isVisible, onClose }) => {
  return (
    <Modal title="All done!" isVisible={isVisible} onClose={onClose}>
      <p className={styles.desc}>
        You will be one of the first to experience Broccoli & Co. when we
        launch.
      </p>
      <BasicButton className={styles.btn} text="OK" onClick={onClose} />
    </Modal>
  );
};

export default SuccessPopup;
