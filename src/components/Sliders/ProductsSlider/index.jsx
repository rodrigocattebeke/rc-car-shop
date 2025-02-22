import { useEffect, useRef, useState } from "react";
import { ProductCard } from "../../Product/ProductCard";
import styles from "./styles.module.css";

export const ProductsSlider = ({ products = null }) => {
  const [sliderProductsContainerSize, setSliderProductsContainerSize] = useState(null);
  const [cardWidth, setCardWidth] = useState(100);
  const [stepsTaken, setStepsTaken] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [totalSliderSections, setTotalSliderSections] = useState(0);
  const sliderScrollContainerRef = useRef(null);
  const firstCardRef = useRef(null);
  const timeoutRef = useRef(null);

  //set the total cards in the slider
  useEffect(() => {
    if (products) {
      setTotalCards(products.length);
    }
  }, [products]);

  // observe and set slider total width
  useEffect(() => {
    //set slider width and total sections of slider
    if (!sliderScrollContainerRef.current) return;
    const sliderCopy = sliderScrollContainerRef.current;

    // create a slider container resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length) {
        setSliderProductsContainerSize(entries[0].contentRect.width);
      }
    });

    // observe slider container

    if (sliderScrollContainerRef.current) resizeObserver.observe(sliderScrollContainerRef.current);
    return () => resizeObserver.unobserve(sliderCopy);
  }, []);

  //when card scroll container resized, verify and modify the card width
  useEffect(() => {
    if (!sliderProductsContainerSize) return;
    if (sliderProductsContainerSize < 560) {
      setCardWidth(100);
      return;
    } else if (sliderProductsContainerSize > 560) {
      setCardWidth(50);
      return;
    }
    console.log(sliderProductsContainerSize);
  }, [sliderProductsContainerSize]);

  //slider resized verify and slider total sections setter
  useEffect(() => {
    if (!sliderScrollContainerRef.current) return;
    if (!firstCardRef.current) return;
    if (!sliderProductsContainerSize) return;
    const numbOfCardsViewed = Math.round(sliderProductsContainerSize / firstCardRef.current.clientWidth);
    setTotalSliderSections(Math.round(totalCards / numbOfCardsViewed)); //Total steps results are the number of groups viewed in the slider.
    setStepsTaken(0);
  }, [sliderProductsContainerSize, totalCards]);

  // slider arrows handle
  const handlesliderArrows = (action) => {
    if (!sliderScrollContainerRef.current) return;

    if (action == "back") {
      let newStepsTaken = stepsTaken - 1;
      if (newStepsTaken < 0) newStepsTaken = totalSliderSections - 1; // 1 is substracted of totalsliderSections because the group one is already viewed

      setStepsTaken(newStepsTaken);
      return;
    }
    if (action == "foward") {
      let newStepsTaken = stepsTaken + 1;
      if (newStepsTaken > totalSliderSections - 1) newStepsTaken = 0; // 1 is substracted of totalsliderSections because the group one is already viewed

      setStepsTaken(newStepsTaken);
      return;
    }
  };

  const handleTouchEnd = () => {
    //select the slider container
    const container = sliderScrollContainerRef.current;
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

  // Handle the slider touch scroll
  const handleScroll = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const container = sliderScrollContainerRef.current;
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

  //Detect changes in stepsTaken and move the scroll of slider container
  useEffect(() => {
    if (!sliderScrollContainerRef.current) return;
    const container = sliderScrollContainerRef.current;
    const containerWidth = container.clientWidth;
    container.scrollTo({
      left: stepsTaken * containerWidth,
      behavior: "smooth",
    });
  }, [stepsTaken]);

  return !products ? (
    ""
  ) : (
    <section className={`container`}>
      <div className={`${styles.sliderContainer}`}>
        <div className={`${styles.sliderProductsContainer} d-flex justify-content-center`}>
          <div className={`${styles.sliderScrollContaniner}`} ref={sliderScrollContainerRef} onScroll={handleScroll}>
            {/* slider elements */}

            <div className={`${styles.sliderProducts}`} onTouchEnd={handleTouchEnd}>
              {products.map((product, i) => (
                <div ref={i == 0 ? firstCardRef : null} className={`${styles.cardContainer} px-1`} key={`${product.id}`} style={{ minWidth: `${cardWidth}%` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* slider arrow controls */}
        <div
          className={`${styles.controlArrowContainer + " " + styles.controlArrowContainerLeft}`}
          onClick={() => {
            handlesliderArrows("back");
          }}
        >
          <span className={`${styles.controlArrow} material-symbols-outlined`}>arrow_back_ios</span>
        </div>
        <div className={`${styles.controlArrowContainer + " " + styles.controlArrowContainerRight}`} onClick={() => handlesliderArrows("foward")}>
          <span className={`${styles.controlArrow} material-symbols-outlined`}>arrow_forward_ios</span>
        </div>
      </div>
    </section>
  );
};
