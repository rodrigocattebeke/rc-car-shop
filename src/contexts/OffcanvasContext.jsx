import { createContext, useState } from "react";

const OffcanvasContext = createContext();

export const OffcanvasProvider = ({ children }) => {
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(true);

  const showOffcanvas = () => setIsOffcanvasVisible(true);
  const hideOffcanvas = () => setIsOffcanvasVisible(false);

  return <OffcanvasContext.Provider value={{ showOffcanvas, hideOffcanvas, isOffcanvasVisible }}>{children}</OffcanvasContext.Provider>;
};

export { OffcanvasContext };
