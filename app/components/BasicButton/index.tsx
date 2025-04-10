import throttle from "lodash/throttle";
import styles from "./style.module.css";

interface IProps {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void> | void;
}

const BasicButton: React.FC<IProps> = ({
  text,
  className,
  type = "button",
  disabled,
  onClick,
}) => {
  const throttledOnClick = throttle(onClick, 500);

  return (
    <button
      onClick={throttledOnClick}
      className={`${styles.container} ${className}`}
      type={type}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
};

export default BasicButton;
