import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const AccountNavigationLinks = () => {
  return (
    <section className="container p-0 pe-3 d-flex flex-direction-column">
      <ul className={`${styles.linkContainer} list-group`}>
        <li className="list-group-item">
          <Link to="/account">
            <span className="material-symbols-outlined">settings</span>
            <p>Resumen</p>
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/account/personal-information">
            <span className="material-symbols-outlined">id_card</span>
            <p>Información</p>
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/account/directions">
            <span className="material-symbols-outlined">location_on</span>
            <p>Direcciones</p>
          </Link>
        </li>
        <li className="list-group-item">
          <Link to={"/account/orders-history"}>
            <span className="material-symbols-outlined">order_approve</span>
            <p>Historial y detalles de pedidos</p>
          </Link>
        </li>
        <li className="list-group-item">
          <Link>
            <span className="material-symbols-outlined">contract_delete</span>
            <p>Facturas por cancelación</p>
          </Link>
        </li>
      </ul>
    </section>
  );
};
