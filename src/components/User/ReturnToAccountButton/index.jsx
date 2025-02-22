import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const ReturnToAccountButton = () => {
  return (
    <div className={`${styles.returnButtonContainer}`}>
      <Link to="/account">
        <span className="material-symbols-outlined">arrow_back</span>
        Volver a tu cuenta
      </Link>
      <Link to="/">
        <span className="material-symbols-outlined">home</span>
        Inicio
      </Link>
    </div>
  );
};
