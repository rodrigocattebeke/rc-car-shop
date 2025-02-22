import { useContext } from "react";
import { PageIndex } from "../../PageIndex";
import { UserContext } from "../../../contexts/UserContext";
import { AccountNavigationLinks } from "../AccountNavigationLinks";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { ReturnToAccountButton } from "../ReturnToAccountButton";

export const UserPanel = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <section className="container-fluid p-0">
        <PageIndex />
      </section>
      <section className="container-lg p-0 py-5">
        <div className="row m-0">
          <aside className="container col-4 d-none d-lg-block">
            <AccountNavigationLinks />
          </aside>

          <section className="container-lg col-12 col-lg-8">
            <div className="container">
              <p className="fs-1">Hola, {user.name[0].toUpperCase() + user.name.slice(1)} </p>
            </div>
            <div className={`${styles.linksContainer}`}>
              <div className={`${styles.linkContainer}`}>
                <Link to="/account">
                  <span className="material-symbols-outlined">settings</span>
                  <p>Resumen</p>
                </Link>
              </div>
              <div className={`${styles.linkContainer}`}>
                <Link to={"/account/personal-information"}>
                  <span className="material-symbols-outlined">id_card</span>
                  <p>Información</p>
                </Link>
              </div>
              <div className={`${styles.linkContainer}`}>
                <Link to="/account/directions">
                  <span className="material-symbols-outlined">location_on</span>
                  <p>Direcciones</p>
                </Link>
              </div>
              <div className={`${styles.linkContainer}`}>
                <Link to={"/account/orders-history"}>
                  <span className="material-symbols-outlined">order_approve</span>
                  <p>Historial y detalles de pedidos</p>
                </Link>
              </div>
              <div className={`${styles.linkContainer}`}>
                <Link>
                  <span className="material-symbols-outlined">contract_delete</span>
                  <p>Facturas por cancelación</p>
                </Link>
              </div>
            </div>
            <div className="container-fluid mt-5">
              <ReturnToAccountButton />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
