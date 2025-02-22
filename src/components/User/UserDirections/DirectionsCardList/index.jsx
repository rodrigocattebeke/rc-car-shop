import { useContext, useState } from "react";
import { UserDirectionContext } from "../../../../contexts/UserDirectionsContext";
import { DirectionCard } from "../DirectionCard";
import styles from "./styles.module.css";
import { CheckoutContext } from "../../../../contexts/CheckoutContext";

export const DirectionsCardList = ({ mode = "view", onSelectDirection = null }) => {
  const { userDirections, selectDirection } = useContext(UserDirectionContext);
  const [cardSelectedIndex, setCardSelectedIndex] = useState(null);

  const handleSelect = (e, direction) => {
    setCardSelectedIndex(e.target.closest(`.${styles.cardContainer}`).dataset.index);
    if (onSelectDirection) onSelectDirection(direction);
  };

  return userDirections.length == 0 ? (
    <p className="fs-2">No hay direcciones para mostrar</p>
  ) : (
    <>
      {mode == "checkout" && <p className="mb-3 fs-5">Selecciona una dirección para el envío</p>}
      <div className={`${styles.directionCardsContainer} container-fluid p-0`}>
        {userDirections.map((directionObject, i) => {
          return (
            <>
              <div key={directionObject.directionName + i} data-index={i} className={`${styles.cardContainer} ${(mode == "select" || mode == "checkout") && cardSelectedIndex == i ? styles.active : ""}`} onClick={mode == "select" || mode == "checkout" ? (e) => handleSelect(e, directionObject) : null} style={mode == "select" || mode == "checkout" ? { cursor: "pointer" } : { cursor: "" }}>
                <DirectionCard directionObject={directionObject} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
