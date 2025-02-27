import { HomeCatalogue } from "../../components/HomeCatalogue";
import { ProductsSale } from "../../components/Product/ProductsSale";
import { HomeSliders } from "../../components/Sliders";
import { BannersSlider } from "../../components/Sliders/BannersSlider";

export const HomePage = () => {
  return (
    <>
      {/* <ProductsSale /> */}
      <BannersSlider />
      <HomeSliders />
      {/* <HomeCatalogue /> No es necesario tener el catalogo abajo */}
    </>
  );
};
