import { ShopCartOffCanvas } from "../ShopCartOffCanvas";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";
// import { Link } from "react-router-dom";
import styles from "./userControls.module.css";
// import { UserContext } from "../../../contexts/UserContext";
import { UserControlsOffcanvas } from "./UserControlsOffCanvas";
// import { UserControlsLinks } from "./UserControlsLinks";

export const UserControls = ({ responsiveClass = "" }) => {
  const { cartState } = useContext(CartContext);
  // const { user } = useContext(UserContext);

  return (
    <>
      {/* USer control icons */}

      <div className={`${styles.userControlsContainer} ${responsiveClass}`}>
        <div className={`${styles.cartIconContainer} imgFlyHere`}>
          <span className={`material-symbols-outlined ${(styles.userControl, styles.userControlCart)}`} data-bs-toggle="offcanvas" data-bs-target="#shopcartOffCanvas" aria-controls="shopcartOffCanvas">
            shopping_cart
          </span>
          <p className={`${styles.cartCounter} ${cartState.cartProducts.length > 0 ? `${styles.active}` : ""}`}>{cartState.cartProducts.length > 0 ? `${cartState.cartProducts.length}` : ""}</p>
        </div>

        {/* Esta parte todavia no se usa porque no hay contexto de usuario */}
        {/* <div className="d-flex align-items-center">
           if user.isLogged is true, add a user logged controls, otherwise, add a link to login page 
          <Link
            {...(user.isLogged
              ? {
                  "data-bs-toggle": "offcanvas",
                  "data-bs-target": "#userControlsOffcanvas",
                  "aria-controls": "userControlsOffcanvas",
                  to: "#",
                }
              : {
                  to: "/login",
                })}
            className={`material-symbols-outlined ${(styles.userControl, styles.userControlPerson)}`}
          >
            person
          </Link>
          {!user.isLogged ? (
            <ul className={`${styles.userLoginLinks} d-none d-md-block`}>
              <li>
                <Link to="/login#login">Iniciar sesión</Link>
              </li>
              <li>
                <Link to="/login#register">Registrarme</Link>
              </li>
            </ul>
          ) : (
            <div className={`${styles.userLogInNameContainer} d-none d-md-flex`}>
              <p className={`${styles.userLogInName}`}>Hola, {user.name}</p>
              <div className={`${styles.dropdownContainer}`}>
                <UserControlsLinks />
              </div>
            </div>
          )}
        </div> */}
      </div>
      {/* use controls offcanvas */}

      {/* {user.isLogged && <UserControlsOffcanvas />} */}
      {/* User control shopcart (offcanvas) */}

      {/*Este offcanvas es el normal que lleva al checkout*/}
      {/* <ShopCartOffCanvas></ShopCartOffCanvas> */}

      {/*Este offcanvas es el que usamos ahora, ya que no habrá checkout, llevará a whatsapp poniendo los pedidos en el mensaje*/}

      <ShopCartOffCanvas></ShopCartOffCanvas>
    </>
  );
};
