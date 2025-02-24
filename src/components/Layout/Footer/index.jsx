import styles from "./styles.module.css";
import whatsappIcon from "../../../assets/icons/whatsapp-icon.svg";
import facebookIcon from "../../../assets/icons/facebook-icon.svg";
import instagramIcon from "../../../assets/icons/instagram-icon.svg";

export const Footer = () => {
  return (
    <footer className="container-fluid border-top border-1 py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 my-3">
            <p>RC Car Shop</p>
            <p>Todos los derechos reservados</p>
          </div>
          <div className="col-12 col-sm-6 my-3">
            <div>
              <p>Contáctanos:</p>
            </div>
            <ul>
              <li>
                <div className={`${styles.iconContainer}`}>
                  <a href="https://wa.me/+595984682068?txt=Hola%20vengo%20desde%20la%20web" target="_blank" rel="noopener">
                    <p>Whatsapp</p>
                    <img src={whatsappIcon} className={styles.icon} alt="Icono de WhatsApp"></img>
                  </a>
                </div>
              </li>
              {/* <li>
                <div className={`${styles.iconContainer}`}>
                  <p>Instagram</p>
                  <img src={instagramIcon} className={styles.icon}></img>
                </div>
              </li> */}
              <li>
                <div className={`${styles.iconContainer}`}>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener">
                    <p>Facebook</p>
                    <img src={facebookIcon} className={styles.icon} alt="Icono de Facebook"></img>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
