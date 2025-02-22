import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useContext } from "react";
import { OrdersContext } from "../../../../../contexts/OrdersHistoryContext";
import { moneyFormat } from "../../../../../helpers/moneyFormat";
import { orderToPDF } from "../orderToPDF";

export const OrderTable = () => {
  const { orders } = useContext(OrdersContext);

  const handleDownloadPDF = (order) => {
    orderToPDF(order);
  };

  return (
    <table className={`${styles.table} table`}>
      <thead>
        <tr>
          <th scope="col">Pedido #</th>
          <th scope="col">Fecha</th>
          <th scope="col">Total del pedido</th>
          <th scope="col">Estado</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, i) => (
          <tr key={i}>
            <td scope="row" className={`${styles.productId} ${styles.td}`}>
              {order.orderId}
            </td>
            <td className={`${styles.date} ${styles.td}`}>22/12/23</td>
            <td className={`${styles.total} ${styles.td}`}>Gs. {moneyFormat(order.total)}</td>
            <td className={`${styles.status} ${styles.td}`}>{order.status}</td>
            <td className={`${styles.action} ${styles.td}`}>
              <span className="material-symbols-outlined" onClick={() => handleDownloadPDF(order)} title="Descargar factura en formato pdf">
                picture_as_pdf
              </span>
              {/* <Link to={`/account/orders-history?v-id=${order.orderId}`}>Ver pedido</Link> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
