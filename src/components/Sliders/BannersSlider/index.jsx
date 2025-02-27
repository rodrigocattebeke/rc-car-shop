import Slider from "react-slick";
import { vonnixxLineaBanner, vonnixxMakkerBanner } from "../../../assets/img";
import styles from "./styles.module.css";

export const BannersSlider = () => {
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className={styles.arrow} onClick={onClick}>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className={`${styles.arrow} ${styles.arrowPrev}`} onClick={onClick}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    pauseOnFocus: true,
    autoplay: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      <div>
        <img src={vonnixxLineaBanner} className={styles.img}></img>
      </div>
      <div>
        <img src={vonnixxMakkerBanner} className={styles.img}></img>
      </div>
    </Slider>
  );
};
