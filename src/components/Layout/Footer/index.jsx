import styles from "./styles.module.css";
import whatsappIcon from "../../../assets/icons/whatsapp.svg";
import facebookIcon from "../../../assets/icons/facebook.svg";
import instagramIcon from "../../../assets/icons/instagram.svg";

export const Footer = () => {
  return (
    <footer className={`${styles.footer} container-fluid border-top text-center text-sm-start border-1 py-4`}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 my-3">
            <p className={`${styles.title}`}>RC Car Shop</p>
            <p>Acá vamos a poner una descripción despues</p>
          </div>
          <div className="col-12 col-sm-6 my-3">
            <div>
              <p className={`${styles.title}`}>Contáctanos:</p>
            </div>
            <div className={`${styles.contactContainer}`}>
              <a href="https://wa.me/+595984682068?txt=Hola%20vengo%20desde%20la%20web" target="_blank" rel="noopener">
                <p>0984-682-068</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.direction} container`}>
        <p className={`${styles.title}`}>Cómo encontrarnos</p>
        <div className={`d-flex justifycontent-center justify-content-sm-start`}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d721.6163252913609!2d-57.55205053047245!3d-24.98917418305422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945d9bd7d9be4e35%3A0x5d2b0112f451bf50!2sLAVADERO%20CATTE!5e1!3m2!1ses!2spy!4v1740605271480!5m2!1ses!2spy" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </footer>
  );
};
