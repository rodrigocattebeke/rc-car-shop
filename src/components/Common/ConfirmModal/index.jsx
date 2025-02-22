import styles from "./styles.module.css";

export const ConfirmModal = ({ question = "¿Deseas confirmar la acción?", onConfirm = null, onCancel = null }) => {
  if (!onConfirm) return console.warn("No hay funcion para la confirmación.");
  if (!onCancel) return console.warn("No hay funcion para la cancelación.");

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={`${styles.modalBackground}`}>
      <div className={`${styles.modalContainer}`}>
        <p>{question}</p>
        <div className={`${styles.modalOptions}`}>
          <button className={`${styles.option}  btn button-color-primary`} onClick={handleConfirm}>
            Si
          </button>
          <button className={`${styles.option} btn button-color-primary`} onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
