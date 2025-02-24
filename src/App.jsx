import { CartProvider } from "./contexts/CartContext.jsx";
import { useLocation } from "react-router-dom";
import { Header } from "./components/Layout/Header";
import { Footer } from "./components/Layout/Footer";
import { ScrollToTop } from "./hooks/ScrollToTop";
import { ProductsProvider } from "./contexts/ProductsContext.jsx";
import { UserDirectionsProvider } from "./contexts/UserDirectionsContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { OffcanvasProvider } from "./contexts/OffcanvasContext.jsx";
import { AppRoutes } from "./routes/AppRoutes.jsx";

function App() {
  const location = useLocation();

  // LOCATIONS WITH HEADER/FOOTER HIDE
  const hideHeaderLocations = ["/login"];
  const hideFooterLocations = ["/login"];

  return (
    // <UserProvider> Por ahora no habrá usuarios
    // <UserDirectionsProvider> Como no hay usuarios, no se guardaran las ubicaciones
    <ProductsProvider>
      <CartProvider>
        <OffcanvasProvider>
          <ScrollToTop /> {/* If the url is changed, scroll to top */}
          {!hideHeaderLocations.includes(location.pathname) && <Header />}
        </OffcanvasProvider>
        <main className={`container-xxl p-0 main`}>
          <AppRoutes />
        </main>
        {!hideFooterLocations.includes(location.pathname) && <Footer />}
      </CartProvider>
    </ProductsProvider>
    // </UserDirectionsProvider>
    // </UserProvider>
  );
}

export default App;
