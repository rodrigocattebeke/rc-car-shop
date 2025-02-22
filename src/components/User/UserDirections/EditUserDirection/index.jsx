import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { PageIndex } from "../../../PageIndex";
import departamentos from "../../../../assets/json/departamentos.json";
import ciudades from "../../../../assets/json/ciudades.json";
import useFormDataRetriever from "../../../../helpers/formDataRetriever";
import { UserDirectionContext } from "../../../../contexts/UserDirectionsContext";
import { useLocation } from "react-router-dom";
import { Loader } from "../../../Common/Loader";
import { ErrorScreen } from "../../../Common/ErrorScreen";
import { FormAdress } from "../../../FormAdress";

const defaultInitialForm = {
  directionName: "",
  clientName: "",
  clientLastName: "",
  clientCI: "",
  clientNumber: "",
  country: "Paraguay",
  province: "",
  city: "",
  direction: "",
};

export const EditUserDirection = () => {
  const { userDirections } = useContext(UserDirectionContext);
  const [directionToEdit, setDirectionToEdit] = useState(null);
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const directionId = new URLSearchParams(location.search).get("direction_id");
    const direction = userDirections.find((e) => e.directionId == directionId);
    direction ? setDirectionToEdit(direction) : setDirectionToEdit(null);
    setIsLoaderActive(false);
  }, [location.search, userDirections]);

  return isLoaderActive ? (
    <Loader />
  ) : !directionToEdit ? (
    <ErrorScreen errorMessage="Ocurrió un error, por favor, intentelo más tarde." />
  ) : (
    <>
      <section className="container-fluid p-0">
        <PageIndex />
      </section>
      <section className={`container mt-3 pb-5`}>
        <div className={`${styles.title}`}>
          <p>Actualizar su dirección</p>
        </div>
        <FormAdress mode="edit" adressToEdit={directionToEdit} />
      </section>
    </>
  );
};
