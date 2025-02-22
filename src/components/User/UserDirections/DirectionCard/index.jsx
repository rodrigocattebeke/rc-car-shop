import { useContext, useState } from "react";
import styles from "./styles.module.css";
import { UserDirectionContext } from "../../../../contexts/UserDirectionsContext";
import { ConfirmModal } from "../../../Common/ConfirmModal";
import { Link } from "react-router-dom";

export const DirectionCard = ({ directionObject }) => {
  const { deleteDirection } = useContext(UserDirectionContext);
  const [showModal, setShowModal] = useState(false);

  if (typeof directionObject !== "object" || Array.isArray(directionObject)) return console.warn("Solo se permiten objetos");

  const onDeleteConfirm = () => {
    deleteDirection(directionObject);
    setTimeout(() => {
      setShowModal(false);
    }, 200);
  };

  const onCancelConfirm = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 200);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className={`${styles.cardContainer}`} data-id={directionObject.directionId}>
        <div className={`${styles.directionContainer}`}>
          <p className={`${styles.directionName}`}>{directionObject.directionName[0].toUpperCase() + directionObject.directionName.slice(1)}</p>
          <address className={`${styles.adressContainer}`}>
            <p className="m-0">{directionObject.clientName + " " + directionObject.clientLastName}</p>
            <p className="m-0">{directionObject.clientCI}</p>
            <p className="m-0">{directionObject.clientNumber}</p>
            <p className="m-0">{directionObject.country}</p>
            <p className="m-0">{directionObject.province}</p>
            <p className="m-0">{directionObject.city}</p>
            <p className="m-0">{directionObject.direction}</p>
          </address>
        </div>
        <div className={`${styles.modifyControlsContainer}`}>
          <div className={`${styles.modifyControl}`}>
            <Link to={`/account/directions?direction_id=${directionObject.directionId}`}>
              <span className="material-symbols-outlined">edit_note</span>
              <p>Actualizar</p>
            </Link>
          </div>
          <div className={`${styles.modifyControl}`} onClick={handleDelete}>
            <span className="material-symbols-outlined">delete_forever</span>
            <p>Eliminar</p>
          </div>
        </div>
      </div>
      {showModal && <ConfirmModal onConfirm={onDeleteConfirm} onCancel={onCancelConfirm} />}
    </>
  );
};
