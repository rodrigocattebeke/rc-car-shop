import { PageIndex } from "../../../PageIndex";
import { AccountNavigationLinks } from "../../AccountNavigationLinks";
import styles from "./styles.module.css";
import { OrderTable } from "./OrderTable";
import { ReturnToAccountButton } from "../../ReturnToAccountButton";
import { useContext } from "react";
import { OrdersContext } from "../../../../contexts/OrdersHistoryContext";

export const UserOrdersHistory = () => {
  const { orders } = useContext(OrdersContext);

  return (
    <>
      <section>
        <PageIndex />
      </section>
      <section className="container-lg p-0 py-5">
        <div className="row m-0">
          <aside className="container col-4 d-none d-lg-block">
            <AccountNavigationLinks />
          </aside>
          <section className="container-lg col-12 col-lg-8">
            <div className="container-xl mb-4">
              <p className="fs-2 m-0">Historial de pedidos</p>
            </div>

            {orders.length == 0 ? <p className="fs-5 m-0">No hay ordenes para mostrar.</p> : <OrderTable />}
            <div className="container-fluid mt-5">
              <ReturnToAccountButton />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
