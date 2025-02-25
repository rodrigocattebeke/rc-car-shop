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
    addProductToCart(product);
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.card}`} to={`/products/${product.id}`} data-id={product.id}>
        <div className={`${styles.cardImgContainer}`}>
          <Link to={`/products/${product.id}`}>
            {/* <img src={product.image} className="cardImg" alt={product.title} loading="lazy" /> */}
            <img src={"/src/images/vonix.jpg"} className={`${styles.cardImg}`} alt={`${product.title}`} loading="lazy"></img>
          </Link>
        </div>
        <div className={`${styles.cardBody}`}>
          <Link to={`/products/${product.id}`}>
            <h4 className={`${styles.cardTitle}`}>{product.title}</h4>
            <p className={`${styles.cardPrice}`}>Gs. {moneyFormat(product.price)}</p>
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
