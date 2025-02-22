import styles from "./styles.module.css";
export const ConfirmPurchaseModal = () => {
  return (
    <div className={`${styles.modalContainer}`}>
      <div className={`${styles.modal}`}>
        <p>Su compra ha finalizado con éxito.</p>
        <span className="material-symbols-outlined">check_circle</span>
      </div>
    </div>
  );
};
