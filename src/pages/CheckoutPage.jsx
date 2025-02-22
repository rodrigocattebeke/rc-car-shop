import { RequireAuth } from "../components/Auth/RequireAuth";
import { Checkout } from "../components/Checkout";
import { CheckoutProvider } from "../contexts/CheckoutContext";
import { OrdersProvider } from "../contexts/OrdersHistoryContext";

export default function CheckoutPage() {
  return (
    <OrdersProvider>
      <CheckoutProvider>
        <RequireAuth>
          <section className="container-fluid" style={{ backgroundColor: "var(--background-color-secondary-transparent)" }}>
            <Checkout></Checkout>
          </section>
        </RequireAuth>
      </CheckoutProvider>
    </OrdersProvider>
  );
}
