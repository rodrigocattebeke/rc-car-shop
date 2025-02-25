import { createContext, useEffect, useState } from "react";
import { getProducts } from "../services/getProducts";

// product object example
// {
//   "id": 1,
//   "title": "SPARCO TAPA LLANTA NAYORO ARO 14" BLACK / SILVER SPC1415BKGR",
//   "price": 250000,
//   "description": "Tapallanta",
//   "image": "https://drive.google.com/imagen1",
// }

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [saleProducts, setSaleProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const getCategories = (products) => {
    const categories = products.map((product) => product.category);

    return [...new Set(categories)];
  };

  //Get products, and set products and categories
  useEffect(() => {
    const getAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getProducts();

        if (response.isSuccess) {
          setProducts(response.data);
          setCategories(getCategories(response.data));
          setSaleProducts([]);
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

    getAll();
  }, []);

  const getByCategory = (category = "") => {
    if (!products) return;
    const categoryProducts = products.filter((product) => product.category == category);
    return categoryProducts;
  };

  const getById = (productId) => {
    if (!products) return;
    const product = products.find((product) => product.id == productId);
    return product;
  };

  const getByTags = (tags) => {
    if (!products) return;
    let similarProducts = products.filter((product) => product.tags.some((tag) => tags.includes(tag)));

    return similarProducts;
  };

  return <ProductsContext.Provider value={{ categories, error, getById, getByCategory, getByTags, isSuccess, loading, products, saleProducts }}>{children}</ProductsContext.Provider>;
};

export { ProductsContext };
