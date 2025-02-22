import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styles from "./headerLinks.module.css";
import { logoSinFondoImg } from "../../../assets/img";
import { ProductsContext } from "../../../contexts/ProductsContext";

export const HeaderLinks = ({ responsiveClass = "" }) => {
  const [categoriesArray, setCategoriesArray] = useState([]);
  const { categories } = useContext(ProductsContext);

  useEffect(() => {
    if (!categories) return;
    setCategoriesArray(categories);
  }, [categories]);

  const closeMenu = (e) => {
    e.target.closest(".offcanvas").querySelector(".btn-close").click();
  };
  return (
    <>
      <section className={`navbar navbar-expand-md header-links-container py-0 ${responsiveClass}`}>
        <div className="container-fluid justify-content-md-evenly p-0">
          <div className="order-2 order-md-1  d-flex justify-content-center w-50">
            <Link className="navbar-brand me-0" to="/">
              <img src={logoSinFondoImg} className={`${styles.navbarImg}`} alt="LyR Express logo" />
            </Link>
          </div>
          <div className="order-1 w-50 d-md-none">
            <button className={`${styles.hamburguerButton} navbar-toggler`} type="button" data-bs-toggle="offcanvas" data-bs-target="#categoryOffcanvas" aria-controls="categoryOffcanvas">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse nav-links-container d-none d-md-flex order-3 mt-3 mt-md-0 w-50" id="navbarNavDropdown">
            <div className={`nav-link ${styles.categoriesDropdown}`} role="button" data-bs-toggle="offcanvas" data-bs-target="#categoryOffcanvas" aria-controls="categoryOffcanvas">
              Categorías
            </div>
          </div>
        </div>

        {/* Offcanvas with categories */}
      </section>
      <div className={`${styles.offcanvas} offcanvas offcanvas-start`} tabIndex="-1" id="categoryOffcanvas" aria-labelledby="categoryOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="categoryOffcanvas">
            Categorías
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body px-0">
          <ul className={`${styles.offcanvasCategories}`}>
            {categoriesArray.length < 1
              ? ""
              : categoriesArray.map((category, index) => (
                  <li key={index} onClick={closeMenu}>
                    <Link className={`${styles.offcanvasItem}`} to={`/category/${category}`}>
                      {category[0].toUpperCase() + category.slice(1)}
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </>
  );
};
