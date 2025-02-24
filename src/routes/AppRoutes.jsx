import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import React, { Suspense, useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { Loader } from "../components/Common/Loader";
import { ViewCategoryProductsPage } from "../pages/Products/ViewCategoryProductsPage";
import { ProductViewPage } from "../pages/Products/ProductViewPage";

//Components with lazy loading
// const CheckoutPage = React.lazy(() => import("../pages/CheckoutPage"));
// const UserLoginPage = React.lazy(() => import("../pages/User/UserLoginPage"));
// const UserAccountPage = React.lazy(() => import("../pages/User/UserAccountPage"));
const SearchPage = React.lazy(() => import("../pages/SearchPage"));

export const AppRoutes = () => {
  const { loading } = useContext(ProductsContext);

  return (
    <>
      {loading ? (
        <Loader fullscreen="true" />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route
            path="/account/*"
            element={
              <Suspense fallback={<Loader fullscreen="true" />}>
                <UserAccountPage />
              </Suspense>
            }
          /> */}
          <Route path="/category/*" element={<ViewCategoryProductsPage />} />
          {/* <Route
            path="/checkout"
            element={
              <Suspense fallback={<Loader fullscreen="true" />}>   checkout suspendido porque no hay contexto 
                <CheckoutPage />
              </Suspense>
            }
          /> */}
          {/* <Route
            path="/login"
            element={
              <Suspense fallback={<Loader fullscreen="true" />}>
                <UserLoginPage />  Login sacado, no se puede usar sin contexto
              </Suspense>
            }
          /> */}
          <Route path="/products/*" element={<ProductViewPage />} />
          <Route
            path="/search"
            element={
              <Suspense fallback={<Loader fullscreen="true" />}>
                <SearchPage />{" "}
              </Suspense>
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};
