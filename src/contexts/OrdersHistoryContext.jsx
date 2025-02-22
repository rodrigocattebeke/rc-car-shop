import { createContext, useContext, useEffect, useState } from "react";
import { dolarToPYG } from "../helpers/dolarToPYG";
import { UserContext } from "./UserContext";

//Order object example
// order = {
//   orderId: number, //simulate a id setting by Relational DB
//   date: new Date().toISOString(),
//   payment: string,
//   products: array,
//   shipping: object {
//    direction: {} ,object
//    payment: "Cobro a destino || Cobro prepagado", string
//    price: 30000,  number
// },
//   total: dolarToPYG(orderDetails.totalPrice),
//   status: "En proceso", //Default status
// };

// ordersData
// = [{
//   user: "",
//   orders: []
// },...]

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [ordersBD, setOrdersBD] = useState([]);
  const { user } = useContext(UserContext);

  //verify if orders have data
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders"));

    if (savedOrders) {
      const userOrders = savedOrders.filter((order) => order.user === user.user);
      setOrders(userOrders.length > 0 ? userOrders[0].orders || [] : []);
    }
  }, [user, ordersBD]);

  const saveOrder = (user, newOrder) => {
    const userIndex = orders.findIndex((order) => order.user == user);

    let updatedOrders;

    if (userIndex >= 0) {
      updatedOrders = orders.map((order) => (order.user == user ? { ...order, orders: [...order.orders, newOrder] } : order));
    } else {
      updatedOrders = [...orders, { user, orders: [newOrder] }];
    }

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrdersBD(updatedOrders);
  };

  const addOrder = (user, orderDetails) => {
    const newUserOrder = {
      orderId: orders.length + 1, //simulate a id setting by Relational DB
      date: new Date().toISOString(),
      payment: orderDetails.checkout.payment,
      products: [...orderDetails.products],
      shipping: orderDetails.checkout.shipping,
      total: dolarToPYG(orderDetails.totalPrice),
      status: "En proceso", //Default status
    };
    saveOrder(user, newUserOrder);
  };

  return <OrdersContext.Provider value={{ orders, addOrder }}>{children}</OrdersContext.Provider>;
};

export { OrdersContext };
