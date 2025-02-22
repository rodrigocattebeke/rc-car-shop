import { createContext, useReducer } from "react";

const CartContext = createContext();

const initialCartState = { cartProducts: [] };

const cartTypes = {
  addProduct: "[CART] Add Product",
  clearCart: "[CART] Clear Cart",
  modifyQuantity: "[CART] Modify Quantity",
  removeProduct: "[CART] Remove Product",
};

const cartReducer = (state = initialCartState, action = {}) => {
  if (Object.keys(action).length <= 0) return;

  switch (action.type) {
    case cartTypes.addProduct:
      return { cartProducts: action.payload };
    case cartTypes.modifyQuantity:
      return { cartProducts: action.payload };
    case cartTypes.removeProduct:
      return { cartProducts: state.cartProducts.filter((item) => item.id !== action.payload.id) };
    case cartTypes.clearCart:
      return { cartProducts: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const addProductToCart = (product) => {
    const existingProduct = cartState.cartProducts.find((item) => item.id == product.id);

    if (existingProduct) {
      let updatedQuantity = 1;
      if (product.quantity) updatedQuantity = product.quantity;
      let updatedProducts = cartState.cartProducts.map((item) =>
        item.id == existingProduct.id
          ? {
              ...existingProduct,
              quantity: existingProduct.quantity + updatedQuantity,
              totalPrice: existingProduct.price * (existingProduct.quantity + updatedQuantity),
            }
          : item
      );

      const action = {
        type: cartTypes.modifyQuantity,
        payload: updatedProducts,
      };
      dispatch(action);
    } else {
      let quantity = 1;
      // VERIFY PRODUCT QUANTITY
      if (product.quantity) quantity = product.quantity;

      const newProducts = [...cartState.cartProducts, { ...product, quantity, totalPrice: product.price }];
      const action = {
        type: cartTypes.addProduct,
        payload: newProducts,
      };

      dispatch(action);
    }
  };

  const clearCart = () => {
    const action = {
      type: cartTypes.clearCart,
      payload: [],
    };
    dispatch(action);
  };

  const modifyProductQuantity = (product) => {
    const updatedProducts = cartState.cartProducts.map((item) => (item.id == product.id ? product : item));

    const action = {
      type: cartTypes.modifyQuantity,
      payload: updatedProducts,
    };

    dispatch(action);
  };

  const removeProductFromCart = (product) => {
    const action = {
      type: cartTypes.removeProduct,
      payload: product,
    };
    dispatch(action);
  };

  const getTotalPrice = () => {
    const products = cartState.cartProducts;
    if (products.length == 0) return 0;
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      totalPrice += products[i].totalPrice;
    }
    return totalPrice.toFixed(2);
  };

  return <CartContext.Provider value={{ addProductToCart, cartState, clearCart, getTotalPrice, modifyProductQuantity, removeProductFromCart }}>{children}</CartContext.Provider>;
};

export { CartContext };
