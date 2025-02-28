import { useContext, useEffect, useState } from "react";
import { ProductCartInfo } from "../../Product/ProductCartInfo";
import { CartContext } from "../../../contexts/CartContext";
import styles from "./styles.module.css";
import { moneyFormat } from "../../../helpers/moneyFormat";
import { OffcanvasContext } from "../../../contexts/OffcanvasContext";
import { cartCryImg } from "../../../assets/img";

export const ShopCartOffCanvas = () => {
  const { cartState, getTotalPrice } = useContext(CartContext);
  const { isOffcanvasVisible } = useContext(OffcanvasContext);
  const [whatsappMessage, setWhatsappMessage] = useState("");

  //Generate the whatsapp link message
  useEffect(() => {
    if (!cartState.cartProducts) return;
    const allMessages = cartState.cartProducts.map((product) => `\n*Producto:* ${product.title}\n*Cantidad:* ${product.quantity}\n*Precio Unitario:* ${product.price}`).join("\n");

    let firstPart = encodeURIComponent("Hola! Estoy interesado en estos productos:");
    let secondPart = encodeURIComponent(allMessages);
    setWhatsappMessage(firstPart + secondPart);
  }, [cartState]);

  return (
    <div className={`${styles.offCanvas} offcanvas offcanvas-end shopcart-menu ${isOffcanvasVisible ? "" : "d-none"}`} tabIndex="-1" id="shopcartOffCanvas" aria-labelledby="shopcartOffCanvasLabel">
      <div className="offcanvas-header shopcart-header">
        <h5 className="offcanvas-title" id="shopcartOffCanvasLabel">
          Carrito
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body h-100">
        <div className={`shopcart-body-items h-75 overflow-y-auto overflow-x-hidden ${cartState.cartProducts.length < 1 ? "text-center align-content-center" : ""}`}>
          {cartState.cartProducts.length < 1 ? (
            <div className={`${styles.emptyCartContainer}`}>
              <p className="m-0">No tenés ningun producto en tu carrito</p>
              <img src={cartCryImg} />
            </div>
          ) : (
            cartState.cartProducts.map((product) => <ProductCartInfo key={product.id} product={product} />)
          )}
        </div>
        {cartState.cartProducts.length < 1 ? (
          ""
        ) : (
          <div className="shopcart-body-actions align-items-center d-flex flex-column h-25 gap-2 ">
            <div className={`${styles.totalPrice} d-flex justify-content-between w-100`}>
              <p>Total:</p>
              <p>{moneyFormat(getTotalPrice())}</p>
            </div>
            <a href={`https://wa.me/595984682068?text=${whatsappMessage}`} rel="noopener noreferrer" target="_blank">
              <button className="btn btn-success"> Finalizar pedido por whatsapp</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
