import { useEffect, useState } from "react";

export const useElementRefSize = (element = null) => {
  const [elementSize, setElementSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!element.current) return console.warn("El elemento no puede medirse.");
    const handleResize = () => {
      setElementSize({
        width: element.current.clientWidth,
        height: element.current.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [element]);
  return elementSize;
};
