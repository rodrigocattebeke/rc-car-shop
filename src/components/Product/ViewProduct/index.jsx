import { useContext, useEffect, useState } from "react";
import { QuantitySelector } from "../../Common/QuantitySelector";
import styles from "./styles.module.css";
import simpleFetch from "../../../helpers/simpleFetch";
import { CartContext } from "../../../contexts/CartContext";
import { Loader } from "../../Common/Loader";
import { ErrorScreen } from "../../Common/ErrorScreen";
import { Link, useLocation } from "react-router-dom";
import { apiUrls } from "../../../config/apiUrls";
import { moneyFormat } from "../../../helpers/moneyFormat";
import { ProductsContext } from "../../../contexts/ProductsContext";

export const ViewProduct = () => {
  const { addProductToCart } = useContext(CartContext);
  const { getById } = useContext(ProductsContext);

  const location = useLocation();

  const [isSuccess, setIsSuccess] = useState(true);
  const [productQuantity, setProductQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  const handleQuantity = (quantity) => {
    setProductQuantity(quantity);
  };

  const handleAddToCart = () => {
    const shopProduct = { ...product, quantity: productQuantity };
    addProductToCart(shopProduct);
  };

  useEffect(() => {
    const productId = location.pathname.split("/products/")[1];
    const getProduct = async () => {
      setProduct(null);
      const result = getById(productId);
      setIsSuccess(result ? true : false);
      setProduct(result);
    };
    getProduct();
  }, [location.pathname, getById]);

  // VALIDATE PRODUCT
  if (!isSuccess) return <ErrorScreen />;

  return !product ? (
    <Loader />
  ) : (
    <section className="container">
      <div className={`${styles.titleContainer} my-3`}>
        <h2>{product?.title}</h2>
      </div>
      <div className={`${styles.productSection1} row pt-4 border-top border-1`}>
        <div className={`${styles.productImgContainer} col-12 col-sm-6 mb-4`}>
          <img src={product?.image} alt={`${product.title}`} loading="lazy"></img>
        </div>
        <div className={`${styles.productInfoContainer} col-12 col-sm-6 mb-4`}>
          <div className={`${styles.productInfo}`}>
            <p>Precio: Gs. {moneyFormat(product.price)}</p>
            <div className={`${styles.productStock}`}>
              <p className="m-0">En Stock</p>
            </div>
            <small>
              Categoría:{" "}
              <Link to={`/category/${product?.category}`} className="product-link">
                {product?.category}
              </Link>
            </small>
          </div>
          <div className={`${styles.addCartContainer}`}>
            <QuantitySelector initialQuantity={1} onQuantityChange={handleQuantity} />
            <button className="btn button-color-primary" onClick={handleAddToCart}>
              <span className="material-symbols-outlined">add_shopping_cart</span> Comprar
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles.productSection2} mt-5 h-100`}>
        <div className="text-center">
          <p>Productos relacionados</p>
        </div>

        <div className={`${styles.productDescription}`}>
          <p>Aca iria un carrusel de productos relacionados</p>
          <br></br>
          <br></br>

          <br></br>

          <br></br>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </section>
  );
};
