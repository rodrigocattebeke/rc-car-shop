import { ErrorScreen } from "../../Common/ErrorScreen";
import { ProductCard } from "../ProductCard";
import styles from "./styles.module.css";

export const ProductList = ({ products = [] }) => {
  return !Array.isArray(products) || !products || products.length == 0 ? (
    <ErrorScreen errorMessage="No hay productos para mostrar"></ErrorScreen>
  ) : (
    <section className={`container ${styles.listContainer}`}>
      {" "}
      {products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </section>
  );
};
