import Slider from "react-slick";
import { ProductCard } from "../../Product/ProductCard";

export const ProductsSlider = ({ products = null }) => {
  const settings = {
    autoplay: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Slider>
  );
};
