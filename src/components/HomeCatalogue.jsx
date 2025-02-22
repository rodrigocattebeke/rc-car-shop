import { useContext } from "react";
import { ProductList } from "./Product/ProductList";
import { ErrorScreen } from "./Common/ErrorScreen";
import { ProductsContext } from "../contexts/ProductsContext";

export const HomeCatalogue = () => {
  const { products, isSuccess, loading, error } = useContext(ProductsContext);

  if (loading) return null;

  if (!isSuccess) return <ErrorScreen errorMessage={`${error}`} />;

  if (products.length == 0) return <ErrorScreen errorMessage="No hay productos para mostrar." />;

  return <ProductList products={products}></ProductList>;
};
