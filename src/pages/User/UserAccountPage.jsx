import { Route, Routes } from "react-router-dom";
import { UserPanel } from "../../components/User/UserPanel";
import { UserDirectionsPage } from "./UserDirectionsPage";
import { NewUserDirectionPage } from "./NewUserDirectionPage";
import { UserPersonalInformationPage } from "./UserPersonalInformationPage";
import { UserOrdersPage } from "./UserOrdersPage";
import { OrdersProvider } from "../../contexts/OrdersHistoryContext";
import { RequireAuth } from "../../components/Auth/RequireAuth";

export default function UserAccountPage() {
  return (
    <>
      <RequireAuth>
        <OrdersProvider>
          <Routes>
            <Route path="" element={<UserPanel />} />
            <Route path="directions" element={<UserDirectionsPage />} />
            <Route path="directions/new" element={<NewUserDirectionPage />} />
            <Route path="personal-information" element={<UserPersonalInformationPage />} />
            <Route path="orders-history" element={<UserOrdersPage />} />
          </Routes>
        </OrdersProvider>
      </RequireAuth>
    </>
  );
}
