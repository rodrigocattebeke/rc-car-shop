import { useContext, useEffect, useRef } from "react";
import { NavBar } from "../NavBar";
import styles from "./styles.module.css";
import { useElementRefSize } from "../../../hooks/useElementRefResize";
import { OffcanvasContext } from "../../../contexts/OffcanvasContext";
export const Header = () => {
  const { hideOffcanvas, showOffcanvas } = useContext(OffcanvasContext);
  const headerRef = useRef(null);
  const { height, width } = useElementRefSize(headerRef);
  const prevScrollRef = useRef(0);
  const timeoutRef = useRef(null);

  const maxExpandHeaderHeight = 110; //110px is the max height of expand header. More than 110, it is in mobile view

  //move the header when scrolling for view only search bar
  useEffect(() => {
    const handleScroll = () => {
      //120px is the height of the header when it is at the md breakpoint
      if (headerRef.current.clientHeight < 120) return;

      const currentScroll = window.scrollY;

      if (currentScroll > prevScrollRef.current) {
        const searchContainer = headerRef.current.querySelector(".search-container");
        const pxToTranslate = headerRef.current.clientHeight - searchContainer.clientHeight;
        headerRef.current.style.transform = `translateY(-${pxToTranslate - 15}px)`;
        hideOffcanvas();
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      } else {
        headerRef.current.style.transform = ``;
        if (!timeoutRef.current) {
          timeoutRef.current = setTimeout(() => {
            showOffcanvas();
            timeoutRef.current = null;
          }, 1100);
        }
      }
      prevScrollRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //if the window is resized, check that it is applied to the header translateX(0), for avoid visual bugs
  useEffect(() => {
    if (height <= maxExpandHeaderHeight) {
      // if (headerRef.current) headerRef.current.style.transform = "translateY(0)"; //If the header leaves 50% of the top, and the screen is resized, to avoid visual bugs, the position of the header at Y is reset.
      headerRef.current.style.transform = ``;
    }
  }, [height, width]);

  //clear timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className={`${styles.header}`} ref={headerRef}>
      <NavBar></NavBar>
    </header>
  );
};
