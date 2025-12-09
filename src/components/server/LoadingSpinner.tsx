import styles from "./LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} />
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}
