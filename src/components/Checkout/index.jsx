import { useContext, useEffect, useState } from "react";
import { ProductsSelected } from "./ProductsSelected";
import styles from "./checkout.module.css";
import { OrdersContext } from "../../contexts/OrdersHistoryContext";
import { CheckoutContext } from "../../contexts/CheckoutContext";
import { SelectDirection } from "./SelectDirection";
import { PaymentMethod } from "./PaymentMethod";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Common/Loader";
import { UserContext } from "../../contexts/UserContext";
import { ConfirmPurchaseModal } from "../Common/ConfirmPurchaseModal";

//Set titles for change by current step
const titles = {
  1: {
    symbol: "location_on",
    title: "Dirección de envío",
  },
  2: {
    symbol: "credit_card",
    title: "Forma de pago seleccionada",
  },
};

export const Checkout = () => {
  const { addOrder } = useContext(OrdersContext);
  const { cartState, clearCart, getTotalPrice } = useContext(CartContext);
  const { checkoutData, clearCheckout, previousStep, nextStep } = useContext(CheckoutContext);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const currentTitle = titles[checkoutData.currentStep];

  const handleNextStep = () => {
    if (checkoutData.currentStep == 1 && !checkoutData.shipping) return alert("seleccione una direccion");
    if (checkoutData.currentStep == 2 && !checkoutData.payment) return;

    if (checkoutData.currentStep < checkoutData.totalSteps) return nextStep();
    if (checkoutData.currentStep == checkoutData.totalSteps) {
      setIsLoaderActive(true);
      setTimeout(() => {
        const orderDetails = { checkout: checkoutData, products: cartState.cartProducts, totalPrice: getTotalPrice() };
        addOrder(user.user, orderDetails);
        clearCart();
        clearCheckout();
        setIsLoaderActive(false);
        setIsModalActive(true);
      }, 1000);
      setTimeout(() => {
        navigate("/");
      }, 2300);
    }
  };

  return (
    <div className={` container-xl py-5 px-0`}>
      <div className={`row row-gap-5 m-0`}>
        <div className={`col-12 col-lg-8`}>
          <div className={`${styles.infoContainer}`}>
            <div className={`${styles.infoTitle}`}>
              <span className="material-symbols-outlined">{currentTitle.symbol}</span>
              <p className="m-0 ms-2">{currentTitle.title}</p>
            </div>
            {checkoutData.currentStep == 1 && <SelectDirection />}
            {checkoutData.currentStep == 2 && <PaymentMethod />}
          </div>
          <div className={`${styles.buttonsContainer}`}>
            <button className="btn button-color-primary" onClick={previousStep}>
              Atras
            </button>
            <button className="btn button-color-primary" onClick={handleNextStep}>
              {checkoutData.currentStep == checkoutData.totalSteps ? "Realizar pedido" : "Siguiente"}
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-4 ">
          <ProductsSelected></ProductsSelected>
        </div>
      </div>
      {isLoaderActive && <Loader bgTransparent="true" />}
      {isModalActive && <ConfirmPurchaseModal />}
    </div>
  );
};
