import { useContext } from "react";
import styles from "./styles.module.css";
import { CartContext } from "../../../contexts/CartContext";
import { Link } from "react-router-dom";
import { moneyFormat } from "../../../helpers/moneyFormat";
import { imgFlyAnimation } from "../../../helpers/imgFlyAnimation";

export const ProductCard = ({ product = {} }) => {
  const { addProductToCart } = useContext(CartContext);

  const handleButtonClick = (e, product) => {
    imgFlyAnimation(e);
    setTimeout(() => {
      addProductToCart(product);
    }, 1000);
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.card} card`} to={`/products/${encodeURIComponent(product.title)}`} data-id={encodeURIComponent(product.title)}>
        <div className={`${styles.cardImgContainer}`}>
          <Link to={`/products/${encodeURIComponent(product.title)}`}>
            <img src={product.image} className={`${styles.cardImg} cardImg`} alt={`${product.title}`} loading="lazy"></img>
          </Link>
        </div>
        <div className={`${styles.cardBody}`}>
          <Link to={`/products/${encodeURIComponent(product.title)}`}>
            <h4 className={`${styles.cardTitle}`}>{product.title}</h4>
            <p className={`${styles.cardPrice}`}>{moneyFormat(product.price)}</p>
          </Link>
          <button className="btn button-color-primary" onClick={(e) => handleButtonClick(e, product)}>
            <span className={`material-symbols-outlined addToCartIcon`}>shopping_cart</span>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
