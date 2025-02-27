import { useContext } from "react";
import { ProductsSlider } from "../ProductsSlider";
import { ProductsContext } from "../../../contexts/ProductsContext";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { deliveryGratisImg, nuevosProductosImg } from "../../../assets/img";
import { ErrorScreen } from "../../Common/ErrorScreen";

export const HomeSliders = () => {
  const { products, isSuccess, loading, error } = useContext(ProductsContext);

  if (loading) return null;

  if (!isSuccess) return <ErrorScreen errorMessage={`${error}`} />;

  if (products.length == 0) return <ErrorScreen errorMessage="No hay productos para mostrar." />;

  return (
    <div className="container-fluid ">
      <div className="row row-gap-5 my-5">
        {/* first slider */}
        <div className="col-12">
          <div className="container d-flex flex-column justify-content-around" style={{ minHeight: "550px" }}>
            <div className={`${styles.sliderTitle}`}>
              <img src={`${nuevosProductosImg}`} className={`${styles.sliderTitleImg}`} alt="Nuevos Productos" loading="lazy"></img>
              <p>Nuevos Productos</p>
            </div>
            <ProductsSlider products={products} />
            <div className={`${styles.viewAllButtonContainer}`}>
              <Link to={`/category/electronics`}>
                <button className="btn button-color-primary">
                  Ver todos
                  <span className="material-symbols-outlined ms-1">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* // slider */}

        <div className="col-12">
          <div className="container d-flex flex-column justify-content-around" style={{ minHeight: "550px" }}>
            <div className={`${styles.sliderTitle}`}>
              <img src={`${deliveryGratisImg}`} className={`${styles.sliderTitleImg}`} alt="Productos con delivery gratis" loading="lazy"></img>
              <p>
                Productos Con <span className={`${styles.sliderTitleBold}`}>Envío Gratis A Todo El País</span>
              </p>
            </div>
            <ProductsSlider products={products} />
            <div className={`${styles.viewAllButtonContainer}`}>
              <Link to={`/category/electronics`}>
                <button className="btn button-color-primary">
                  Ver todos
                  <span className="material-symbols-outlined ms-1">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* // slider */}

        <div className="col-12">
          <div className="container d-flex flex-column justify-content-around" style={{ minHeight: "550px" }}>
            <div className={`${styles.sliderTitle}`}>
              <p>Ropa Moderna</p>
            </div>
            <ProductsSlider products={products} />
            <div className={`${styles.viewAllButtonContainer}`}>
              <Link to={`/category/electronics`}>
                <button className="btn button-color-primary">
                  Ver todos
                  <span className="material-symbols-outlined ms-1">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* // slider */}

        <div className="col-12">
          <div className="container d-flex flex-column justify-content-around" style={{ minHeight: "550px" }}>
            <div className={`${styles.sliderTitle}`}>
              <p>Electronicos</p>
            </div>
            <ProductsSlider products={products} />
            <div className={`${styles.viewAllButtonContainer}`}>
              <Link to={`/category/electronics`}>
                <button className="btn button-color-primary">
                  Ver todos
                  <span className="material-symbols-outlined ms-1">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
