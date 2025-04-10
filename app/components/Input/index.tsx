import styles from "./style.module.css";
import classNames from "classnames";

interface IProps {
  placeholder?: string;
  className?: string;
  name?: string;
  error?: {
    isError: boolean;
    errorMessage: string;
  };
}

const Input: React.FC<IProps> = ({ className, placeholder, name, error }) => {
  const { isError, errorMessage } = error || {};

  return (
    <div className={styles.container}>
      <input
        className={classNames(
          styles.inputContainer,
          className,
          isError && styles.error
        )}
        placeholder={placeholder}
        name={name}
        type="input"
      />
      {isError && <span className={styles.errorText}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
