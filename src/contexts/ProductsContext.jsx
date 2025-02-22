import { createContext, useEffect, useState } from "react";
import { apiUrls } from "../config/apiUrls";
import simpleFetch from "../helpers/simpleFetch";

// product object example
// {
//   "id": 1,
//   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   "price": 109.95,
//   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   "category": "men's clothing",
//   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   "rating": {
//       "rate": 3.9,
//       "count": 120
//   }
// }

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [saleProducts, setSaleProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  //Get products and sale products
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const [res, categoryRes] = await Promise.all([simpleFetch(apiUrls.products), simpleFetch(apiUrls.categories)]);

        if (res.isSuccess && categoryRes.isSuccess) {
          setProducts(res.data);
          setCategories(categoryRes.data);
          setSaleProducts(res.data);
          setIsSuccess(true);
        } else {
          throw new Error("Error durante la carga de productos");
        }
      } catch (err) {
        setProducts([]);
        setSaleProducts([]);
        setIsSuccess(false);
        setError(err.message || "Error durante la carga de productos");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  return <ProductsContext.Provider value={{ categories, error, isSuccess, loading, products, saleProducts }}>{children}</ProductsContext.Provider>;
};

export { ProductsContext };
