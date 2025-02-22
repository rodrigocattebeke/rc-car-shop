import { useContext, useState } from "react";
import { CartContext } from "../../../contexts/CartContext";
import styles from "./styles.module.css";
import { QuantitySelector } from "../../Common/QuantitySelector";
import { Link } from "react-router-dom";
import { moneyFormat } from "../../../helpers/moneyFormat";
import { dolarToPYG } from "../../../helpers/dolarToPYG";

export const ProductCartInfo = ({ product = {}, isModifyActive = true }) => {
  const { cartState, modifyProductQuantity, removeProductFromCart } = useContext(CartContext);
  const [productQuantity, setProductQuantity] = useState(product.quantity);

  const handleQuantity = (quantity) => {
    setProductQuantity(quantity);
  };

  const updateProductQuantity = () => {
    const updatedProduct = { ...product, quantity: productQuantity, totalPrice: product.price * productQuantity };
    modifyProductQuantity(updatedProduct);
  };

  const closeOffcanvas = (e) => {
    e.target.closest(".offcanvas").querySelector(".offcanvas-header").querySelector(".btn-close").click();
  };

  let borderBottom = false;
  if (cartState.cartProducts.length > 1) borderBottom = true;

  return (
    <div className={`${styles.productContainer} row py-3 ${borderBottom ? "border-top" : ""}`} key={product.id}>
      <div className={`${isModifyActive ? "col-2" : "col-4"}`}>
        <img src={product.image} alt={product.title} className={`${styles.productImg}`}></img>
      </div>
      <div className="col-8">
        <Link to={`/products/${product.id}`} className="product-link">
          <p className={styles.productTitle} onClick={closeOffcanvas}>
            {product.title}
          </p>
        </Link>
        <p className={`${styles.productPrice} small my-0`}>Gs. {moneyFormat(dolarToPYG(product.price))}</p>
        <div className="d-flex gap-1">
          <p className="my-0">Cantidad:</p>
          {isModifyActive ? <QuantitySelector initialQuantity={product.quantity} onQuantityChange={handleQuantity}></QuantitySelector> : <p className="m-0">{` ${product.quantity}`}</p>}
          <button className={`${styles.updateProductButton} ${product.quantity == productQuantity ? "" : styles.active}`} onClick={updateProductQuantity}>
            Actualizar
          </button>
        </div>
      </div>
      {isModifyActive && (
        <div className="col-2">
          <span
            className="material-symbols-outlined shopIcon"
            onClick={() => {
              removeProductFromCart(product);
            }}
          >
            delete
          </span>
        </div>
      )}
    </div>
  );
};
