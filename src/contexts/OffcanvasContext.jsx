import { createContext, useState } from "react";

const OffcanvasContext = createContext();
//El offcanvas provider sirve para manejar todos los offcanvas, haciendo que se cierren. Esto se usa, ya que al hacer scroll hacia abajo, se aplica un transform en el header para que solo se vea la barra de busqueda, pero mueve tambien el offcanvas, haciendo que todo se desborde. Al aplicar hideoffcanvas al hacer scroll, se da d-none al offcanvas, por lo que no ocurre el desbordamiento.

export const OffcanvasProvider = ({ children }) => {
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(true);

  const showOffcanvas = () => setIsOffcanvasVisible(true);
  const hideOffcanvas = () => setIsOffcanvasVisible(false);

  return <OffcanvasContext.Provider value={{ showOffcanvas, hideOffcanvas, isOffcanvasVisible }}>{children}</OffcanvasContext.Provider>;
};

export { OffcanvasContext };
