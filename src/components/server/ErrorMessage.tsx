import { CircleAlert } from "lucide-react";
import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>
        <CircleAlert />
      </div>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
}
