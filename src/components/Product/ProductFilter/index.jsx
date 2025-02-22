import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const ProductFilter = ({ products = null, setFilteredProducts }) => {
  const [filterSelected, setFilterSelected] = useState("relevance");

  const onSelectChange = (e) => {
    if (!products) return console.warn("No hay productos que filtrar");
    if (typeof setFilteredProducts !== "function") return console.warn("Hay que especificar una funcion para setear los productos filtrados en un state.");

    const copyProducts = products; //Copy of products

    setFilterSelected(e.target.value);
    switch (e.target.value) {
      case "relevance":
        return setFilteredProducts([...copyProducts]);
      case "priceDesc":
        return setFilteredProducts([...copyProducts.sort((a, b) => b.price - a.price)]);
      case "priceAsc":
        return setFilteredProducts([...copyProducts.sort((a, b) => a.price - b.price)]);
      default:
        return setFilteredProducts([...copyProducts]);
    }
  };

  return (
    <div className="container-fluid position-relative mt-2 z-3">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <p className={`${styles.filterTile}`}>Ordenar productos por</p>
            <div className={`${styles.filterOptionsContainer}`}>
              <select name="filter" value={filterSelected} title="products filter" onChange={onSelectChange}>
                <option value="relevance" title="relevance">
                  Relevancia
                </option>
                <option value="priceDesc" title="price from high to low">
                  Precio alto a bajo
                </option>
                <option value="priceAsc" title="price from low to high">
                  Precio bajo a alto
                </option>
              </select>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
