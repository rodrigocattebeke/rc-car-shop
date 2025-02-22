import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "../components/Common/Loader";
import { ErrorScreen } from "../components/Common/ErrorScreen";
import { ProductList } from "../components/Product/ProductList";
import { ProductsContext } from "../contexts/ProductsContext";
import { PageIndex } from "../components/PageIndex";
import { ProductFilter } from "../components/Product/ProductFilter";

export default function SearchPage() {
  const location = useLocation();
  const { productsState } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimLoadingActive, setIsSimLoadingActive] = useState(false);
  const [productsSearched, setProductsSearched] = useState([]);
  const [searched, setSearched] = useState("");

  //get URL variables
  useEffect(() => {
    if (!productsState) return;

    const urlVariables = new URLSearchParams(location.search);
    const searchValue = urlVariables.get("sv").toLowerCase();
    setSearched(urlVariables.get("sv"));

    if (productsState.length > 0) {
      const products = productsState.filter((product) => product.title.toLowerCase().includes(searchValue));
      setProductsSearched(products);
      setFilteredProducts(products); //Initial value for FilteredProducts
      setIsLoading(false);
    } else {
      setIsLoading(false);
      return setProductsSearched([]);
    }
  }, [location.search, productsState]);

  //Simulate the API request time
  useEffect(() => {
    setIsSimLoadingActive(true);
    setTimeout(() => {
      setIsSimLoadingActive(false);
    }, 700);
  }, [filteredProducts]);

  return filteredProducts.length == 0 && isLoading ? (
    <Loader />
  ) : filteredProducts.length == 0 && !isLoading ? (
    <ErrorScreen errorMessage={`No se encontraron resultados para: "${searched}"`} />
  ) : (
    <div className="container-fluid p-0">
      <PageIndex />
      <div className="container">
        <p className="fs-3 my-3">Resultados de búsqueda para: {`"${searched}"`}</p>
      </div>
      <ProductFilter products={productsSearched} setFilteredProducts={setFilteredProducts} />
      <div className="position-relative">
        {isSimLoadingActive && (
          <div className="container-fluid position-absolute h-100 bg-white z-2">
            <div>
              <Loader fullscreen={false} />
            </div>
          </div>
        )}
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
