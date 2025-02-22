import { useContext } from "react";
import { PageIndex } from "../../PageIndex";
import { AccountNavigationLinks } from "../AccountNavigationLinks";
import { UserDirectionContext } from "../../../contexts/UserDirectionsContext";
import styles from "./styles.module.css";
import { ReturnToAccountButton } from "../ReturnToAccountButton";
import { Link } from "react-router-dom";
import { DirectionsCardList } from "./DirectionsCardList";

export const UserDirections = () => {
  const { userDirections } = useContext(UserDirectionContext);

  return (
    <>
      <section>
        <PageIndex />
      </section>
      <section className="container-lg p-0 py-5">
        <div className="row m-0">
          <aside className="container col-4 d-none d-lg-block">
            <AccountNavigationLinks />
          </aside>
          <div className="container-lg p-0 px-sm-4 col-12 col-lg-8">
            {Object.keys(userDirections).length == 0 ? (
              <p className="fs-2 m-0">
                No hay direcciones para mostrar, añade una direccion{" "}
                <Link to="/account/directions/new" className={`${styles.link}`}>
                  aquí
                </Link>
              </p>
            ) : (
              //transform userDirections object to array with [key , value]
              <>
                <div className="container-fluid overflow-hidden mb-4">
                  <p className={`${styles.title}`}>Tus direcciones</p>
                </div>
                <div className="container-fluid">
                  <DirectionsCardList mode="view" />
                </div>
                <div className="container-fluid mt-4">
                  <Link to="/account/directions/new">
                    <button className="btn button-color-primary mb-4">+ Nueva dirección</button>
                  </Link>
                  <ReturnToAccountButton />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
