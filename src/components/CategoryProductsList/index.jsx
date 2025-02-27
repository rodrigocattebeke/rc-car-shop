import { ErrorScreen } from "../Common/ErrorScreen";
import { ProductList } from "../Product/ProductList";

export const CategoryProductsList = ({ products = null }) => {
  if (products.length == 0) return <ErrorScreen errorMessage="No se encontraron productos para esta categoría"></ErrorScreen>;

  return <ProductList products={products}></ProductList>;
};
