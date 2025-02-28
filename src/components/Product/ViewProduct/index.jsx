import { useContext, useEffect, useState } from "react";
import { QuantitySelector } from "../../Common/QuantitySelector";
import styles from "./styles.module.css";
import { CartContext } from "../../../contexts/CartContext";
import { Loader } from "../../Common/Loader";
import { ErrorScreen } from "../../Common/ErrorScreen";
import { Link, useLocation } from "react-router-dom";
import { moneyFormat } from "../../../helpers/moneyFormat";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { ProductsSlider } from "../../Sliders";

export const ViewProduct = () => {
  const { addProductToCart } = useContext(CartContext);
  const { getByName, getByTags } = useContext(ProductsContext);

  const location = useLocation();

  const [isSuccess, setIsSuccess] = useState(true);
  const [productQuantity, setProductQuantity] = useState(1);
  const [stockClass, setStockClass] = useState("");
  const [stockMessage, setStockMessage] = useState("");
  const [showQuantityMessage, setShowQuantityMessage] = useState(false);
  const [product, setProduct] = useState(null);
  const [whatsappMessage, setWhatsappMessage] = useState("");

  const handleQuantity = (quantity) => {
    setProductQuantity(quantity);
  };

  const handleAddToCart = () => {
    const shopProduct = { ...product, quantity: productQuantity };
    addProductToCart(shopProduct);
  };

  //Get product by the id in url
  useEffect(() => {
    const productName = decodeURIComponent(location.pathname.split("/products/")[1]);

    const getProduct = async () => {
      setProduct(null);
      const result = getByName(productName);
      setIsSuccess(result ? true : false);
      setProduct(result);
    };
    getProduct();
  }, [location.pathname, getByName]);

  //Verify stock and set the stock class
  useEffect(() => {
    if (!product) return;

    if (product.stock > 5) {
      setStockMessage("En stock");
      return setStockClass(styles.isInStock);
    } else if (product.stock <= 5 && product.stock > 0) {
      setShowQuantityMessage(true);
      setStockMessage("Stock bajo");
      return setStockClass(styles.lowStock);
    } else if (product.stock <= 0) {
      setStockMessage("Sin stock");
      return setStockClass(styles.outOfStock);
    }
  }, [product, setStockClass]);

  //Generate the whatsapp link message
  useEffect(() => {
    if (!product) return;
    let firstPart = encodeURIComponent("Hola! Estoy interesado en estos productos:");
    let secondPart = encodeURIComponent(`\n*Producto:* ${product.title}\n*Cantidad:* ${productQuantity}
        `);
    setWhatsappMessage(firstPart + secondPart);
  }, [product, productQuantity]);

  // VALIDATE PRODUCT
  if (!isSuccess) return <ErrorScreen />;

  return !product ? (
    <Loader />
  ) : (
    <>
      <section className="container">
        {/* Product Title */}
        <div className={`${styles.titleContainer} my-3`}>
          <h2>{product?.title}</h2>
          <p className="m-0">
            <span style={{ fontWeight: "bold" }}>{product.brand.toUpperCase()}</span>
          </p>
        </div>
        {/* Product Information Body */}
        <div className={`${styles.productSection1} row pt-4 border-top border-1`}>
          {/* Product Image */}
          <div className={`${styles.productImgContainer} col-12 col-sm-6 mb-4`}>
            <img src={product?.image} alt={`${product.title}`} loading="lazy"></img>
          </div>

          <div className={`${styles.productInfoContainer} m-0 col-12 col-sm-6 mb-4`}>
            <div className={`${styles.productInfo}`}>
              <p>Precio: Gs. {moneyFormat(product.price)}</p>
              <div>
                <div className={`${styles.productStock} ${stockClass}`}>
                  <p className="m-0">{stockMessage}</p>
                </div>
                {showQuantityMessage && (
                  <p className="m-0">
                    Solo quedan <span style={{ fontWeight: "bold" }}>{product.stock}</span>
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className={`${styles.addCartContainer}`}>
                <QuantitySelector initialQuantity={1} onQuantityChange={handleQuantity} />
                <button className="btn button-color-primary" onClick={handleAddToCart}>
                  <span className="material-symbols-outlined">add_shopping_cart</span> Comprar
                </button>
              </div>

              <div>
                <a href={`https://wa.me/595984682068?text=${whatsappMessage}`} rel="noopener noreferrer" target="_blank">
                  <button className={`${styles.shopInWhatsappButton}`}>Pedir por WhatsApp</button>
                </a>
              </div>

              <small>
                Categoría:{" "}
                <Link to={`/category/${product?.category}`} className="product-link">
                  {product?.category}
                </Link>
              </small>
            </div>
          </div>
        </div>
      </section>
      <div className={`${styles.similarProductsContainer} container mt-5 h-100`}>
        <div className={`${styles.title}`}>
          <p>Productos relacionados</p>
        </div>
        <div className="my-4">
          <ProductsSlider products={getByTags(product.tags)} />
        </div>
      </div>
    </>
  );
};
