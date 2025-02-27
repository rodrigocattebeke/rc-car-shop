import { moneyFormat } from "../../../../helpers/moneyFormat";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const SearchResult = ({ product = null }) => {
  return (
    <div className={`container-fluid`}>
      <Link to={`/products/${encodeURIComponent(product.title)}`} className="text-decoration-none">
        <div className="row">
          <div className="img-container col-2 p-0 pe-1 ">
            <img src={product?.image} className={`img-fluid`} alt={`${product.title}`} loading="lazy"></img>
          </div>
          <div className="info-container col-10 gap-1 p-0 align-items-center">
            <p className={styles.productTitle}>{product?.title}</p>
            <p className={styles.productPrice}>{moneyFormat(product.price)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
