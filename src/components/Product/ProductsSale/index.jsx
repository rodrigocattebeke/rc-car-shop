import { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { OnlineSaleProductCard } from "../OnlineSaleProductCard";
import { CountdownTimer } from "../../Common/CountdownTimer";
import { ofertaCompraOnlineImg } from "../../../assets/img";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { ErrorScreen } from "../../Common/ErrorScreen";

export const ProductsSale = () => {
  const [carouselProductsContainerSize, setCarouselProductsContainerSize] = useState(0);
  const [isCarouselRefLoad, setIsCarouselRefLoad] = useState(false);
  const [carouselProducts, setSaleProducts] = useState(null);
  const [stepsTaken, setStepsTaken] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [totalCarouselSections, setTotalCarouselSections] = useState(0);
  const { saleProducts, error, loading, isSuccess } = useContext(ProductsContext);
  const firstCardRef = useRef(null);
  const timeoutRef = useRef(null);
  const carouselContainerRef = useRef(null);

  const setCarouselRef = (node) => {
    if (node) {
      carouselContainerRef.current = node;
      setIsCarouselRefLoad(true);
    }
  };

  // get sale products and set isLoading false
  useEffect(() => {
    const getSaleProducts = async () => {
      // totalProducts = total products in sale section
      const totalProducts = 5;
      setTotalCards(totalProducts); // totalCards = totalProducts viewed
      const productsViewed = saleProducts.slice(0, totalProducts);
      setSaleProducts(productsViewed);
    };
    getSaleProducts();
  }, [saleProducts]);

  // observe and set carousel total width

  useEffect(() => {
    //set carousel width and total sections of carousel
    if (!carouselContainerRef.current) return;
    const carouselCopy = carouselContainerRef.current;
    // create a carousel container resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length) {
        setCarouselProductsContainerSize(entries[0].contentRect.width);
      }
    });

    // observe carousel container

    if (carouselContainerRef.current) resizeObserver.observe(carouselContainerRef.current);
    return () => resizeObserver.unobserve(carouselCopy);
  }, [isCarouselRefLoad]);

  //carousel resized verify and carousel total sections setter
  useEffect(() => {
    if (!carouselContainerRef.current || !firstCardRef.current) return;
    const numbOfCardsViewed = Math.round(carouselProductsContainerSize / firstCardRef.current.clientWidth);
    setTotalCarouselSections(Math.round(totalCards / numbOfCardsViewed)); //Total cards|steps results are the number of groups viewed in the carousel.
    setStepsTaken(0);
  }, [carouselProductsContainerSize, totalCards]);

  // carousel arrows handle
  const handleCarouselArrows = (action) => {
    if (!carouselContainerRef.current) return;

    if (action == "back") {
      let newStepsTaken = stepsTaken - 1;
      if (newStepsTaken < 0) newStepsTaken = totalCarouselSections - 1; // 1 is substracted of totalCarouselSections because the group one is already viewed

      setStepsTaken(newStepsTaken);
      return;
    }
    if (action == "foward") {
      let newStepsTaken = stepsTaken + 1;
      if (newStepsTaken > totalCarouselSections - 1) newStepsTaken = 0; // 1 is substracted of totalCarouselSections because the group one is already viewed

      setStepsTaken(newStepsTaken);
      return;
    }
  };

  const handleTouchEnd = () => {
    //select the carousel container
    const container = carouselContainerRef.current;
    const containerWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    //Get the actual number of slider viewed
    let newStepsTaken = scrollLeft / containerWidth;

    //add or substract 0.2 to stepstaken for rounded the step instead of waiting to reach 0.5
    if (newStepsTaken > stepsTaken + 0.2) {
      newStepsTaken = stepsTaken + 1;
    } else if (newStepsTaken < stepsTaken - 0.2) {
      if (stepsTaken == 0) return;
      newStepsTaken = stepsTaken - 1;
    }
    setStepsTaken(newStepsTaken);
    return;
  };

  // Handle the carousel touch scroll
  const handleScroll = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const container = carouselContainerRef.current;
      const containerWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      //Get the actual number of slider viewed
      const newStepsTaken = Math.round(scrollLeft / containerWidth);

      //scroll again for evite errors
      container.scrollTo({
        left: stepsTaken * containerWidth,
        behavior: "smooth",
      });
      setStepsTaken(newStepsTaken);
    }, 80);

    return;
  };

  //Detect changes in stepsTaken and move the scroll of carousel container
  useEffect(() => {
    if (!carouselContainerRef.current) return;
    const container = carouselContainerRef.current;
    const containerWidth = container.clientWidth;
    container.scrollTo({
      left: stepsTaken * containerWidth,
      behavior: "smooth",
    });
  }, [stepsTaken]);

  //Remove Refs if the component are desarmed
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (loading) return null;

  if (!isSuccess) return <ErrorScreen errorMessage={`${error}`} />;

  if (saleProducts.length == 0) return <ErrorScreen errorMessage="No hay productos para mostrar." />;

  return carouselProducts == null ? (
    ""
  ) : (
    <>
      <section className="container d-flex align-items-center justify-content-center my-5 pb-4 border-bottom bg-color-primary">
        <div className={`${styles.saleProductsContainer} row row-gap-5`}>
          {/* Products sale container */}
          <div className={`${styles.saleProductsInfo} col-12 col-lg-6`}>
            <div className="container-fluid row">
              <div className="col-12 d-flex justify-content-center text-center align-items-center flex-column">
                <div className={`w-75`}>
                  <img src={`${ofertaCompraOnlineImg}`} className={`${styles.saleProductInfoImg}`} alt="Ofertas online"></img>
                </div>
                <p>¡Ofertas exclusivas para compras online!</p>
              </div>
              <div className="col-12 d-flex align-items-center justify-content-center">
                <CountdownTimer limitTime={{ hour: [23, 59, 59], day: 10, month: 2, year: 2025 }} />
              </div>
            </div>
          </div>

          {/* Carousel container */}

          <div className={`${styles.carouselContainer} col-12 col-lg-6`}>
            {/* carousel elements */}
            <div className={`${styles.carouselProductsContainer} d-flex justify-content-center`}>
              <div className={`${styles.carouselScrollContaniner}`} ref={setCarouselRef} onScroll={handleScroll}>
                <div className={`${styles.saleProductsCarousel}`} onTouchEnd={handleTouchEnd}>
                  {carouselProducts.map((product, i) => (
                    <div ref={i == 0 ? firstCardRef : null} className={`${styles.cardContainer} px-1`} key={`${product.id}`}>
                      <OnlineSaleProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* carousel arrow controls */}
            <div
              className={`${styles.controlArrowContainer + " " + styles.controlArrowContainerLeft}`}
              onClick={() => {
                handleCarouselArrows("back");
              }}
            >
              <span className={`${styles.controlArrow} material-symbols-outlined`}>arrow_back_ios</span>
            </div>
            <div className={`${styles.controlArrowContainer + " " + styles.controlArrowContainerRight}`} onClick={() => handleCarouselArrows("foward")}>
              <span className={`${styles.controlArrow} material-symbols-outlined`}>arrow_forward_ios</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
