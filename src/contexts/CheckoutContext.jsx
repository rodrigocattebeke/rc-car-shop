import { createContext, useState } from "react";

const CheckoutContext = createContext();

// shipping data example:
// direction = {
//   directionId: null,
//   directionName: null,
//   clientName: null,
//   clientLastname: null,
//   clientCI: null,
//   clientNumber: null,
//   country: null,
//   province: null,
//   city: null,
//   direction: null
// }

//payment method data example:

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState({
    shipping: null,
    payment: null,
    currentStep: 1,
    totalSteps: 2,
  });

  const clearCheckout = () => {
    setCheckoutData((prev) => ({
      ...prev,
      shipping: null,
      payment: null,
      currentStep: 1,
    }));
  };

  const updateShipping = (direction) => {
    const shippingData = {
      direction: direction,
      payment: "Cobro prepagado",
      price: 35000,
    };
    setCheckoutData((prev) => ({ ...prev, shipping: shippingData }));
  };

  const updatePayment = (data) => {
    setCheckoutData((prev) => ({ ...prev, payment: data }));
  };

  const nextStep = () => {
    if (checkoutData.currentStep == checkoutData.totalSteps) return;

    setCheckoutData((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const previousStep = () => {
    if (checkoutData.currentStep == 1) return;

    setCheckoutData((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
  };

  return <CheckoutContext.Provider value={{ checkoutData, clearCheckout, nextStep, previousStep, updatePayment, updateShipping }}>{children}</CheckoutContext.Provider>;
};

export { CheckoutContext };
