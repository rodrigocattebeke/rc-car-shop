import { useLocation } from "react-router-dom";
import { CategoryProducts } from "../../components/CategoryProducts";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Common/Loader";
import { ErrorScreen } from "../../components/Common/ErrorScreen";
import { ProductFilter } from "../../components/Product/ProductFilter";
import { PageIndex } from "../../components/PageIndex";
import { ProductsContext } from "../../contexts/ProductsContext";

export const ViewCategoryProductsPage = () => {
  const location = useLocation();
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [category, setCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [isSimLoadingActive, setIsSimLoadingActive] = useState(false);

  const { getByCategory } = useContext(ProductsContext);

  useEffect(() => {
    const getCategoryProducts = async () => {
      setIsLoaderActive(true);
      const categorySearched = location.pathname.split("/category/")[1]; //Get category for the url
      let category = categorySearched.split("/")[categorySearched.split("/").length - 1];
      category = category[0].toUpperCase() + category.slice(1);
      setCategory(decodeURIComponent(category));

      const products = getByCategory(categorySearched);
      setCategoryProducts(products);
      setFilteredProducts(products); //initial products for filter
      setIsLoaderActive(false);
    };
    getCategoryProducts();
  }, [location.pathname, getByCategory]);

  //Simulate the API request time
  useEffect(() => {
    setIsSimLoadingActive(true);
    setTimeout(() => {
      setIsSimLoadingActive(false);
    }, 700);
  }, [filteredProducts]);

  return (
    <>
      {isLoaderActive && <Loader />}
      {!filteredProducts ? (
        <ErrorScreen errorMessage="No se encontraron productos para esta categoría." />
      ) : (
        <>
          <PageIndex />
          <div className="container my-3 z-3 position-relative">
            <p className="fs-2 m-0">{category}</p>
          </div>
          <ProductFilter products={categoryProducts} setFilteredProducts={setFilteredProducts} />
          <div className="position-relative">
            {isSimLoadingActive && (
              <div className="container-fluid position-absolute h-100 bg-white z-2">
                <div>
                  <Loader fullscreen={false} />
                </div>
              </div>
            )}
            <CategoryProducts products={filteredProducts} />
          </div>
        </>
      )}
    </>
  );
};
