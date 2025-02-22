import { useContext } from "react";
import styles from "./styles.module.css";
import { CartContext } from "../../../contexts/CartContext";
import { Link } from "react-router-dom";
import { moneyFormat } from "../../../helpers/moneyFormat";
import { dolarToPYG } from "../../../helpers/dolarToPYG";
import { imgFlyAnimation } from "../../../helpers/imgFlyAnimation";

export const OnlineSaleProductCard = ({ product = {} }) => {
  const { addProductToCart } = useContext(CartContext);
  product = { ...product, oldPrice: Number.parseFloat(product.price + product.price * 0.3).toFixed(2) };

  const handleButtonClick = (e, product) => {
    imgFlyAnimation(e);
    addProductToCart(product);
  };

  return Object.keys(product).length == 0 ? (
    ""
  ) : (
    <div className={`card ${styles.card}`} to={`/products/${product.id}`} data-id={product.id}>
      <Link className={`${styles.cardImgContainer}`} to={`/products/${product.id}`}>
        <img src={product.image} className={`${styles.cardImg} cardImg`} alt={product.title} loading="eager" />
      </Link>
      <div className={`card-body ${styles.cardBody}`}>
        <Link to={`/products/${product.id}`}>
          <h4 className={`card-title ${styles.cardTitle}`}>{product.title}</h4>
          <div className={`${styles.priceContainer}`}>
            <p className={`${styles.newPrice}`}>Gs. {moneyFormat(dolarToPYG(product.price))}</p>
            <p className={`${styles.oldPrice}`}>Gs. {moneyFormat(dolarToPYG(product.oldPrice))}</p>
          </div>
        </Link>
        <div className={`${styles.buttonContainer}`}>
          <button className="btn button-color-primary" onClick={(e) => handleButtonClick(e, product)}>
            <span className={`material-symbols-outlined addToCartIcon`}>shopping_cart</span>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
