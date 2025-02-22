import { useCallback, useContext, useEffect, useState } from "react";
import useFormDataRetriever from "../../helpers/formDataRetriever";
import ciudades from "../../assets/json/ciudades.json";
import departamentos from "../../assets/json/departamentos.json";
import { UserDirectionContext } from "../../contexts/UserDirectionsContext";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

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

export const FormAdress = ({ mode = "add", adressToEdit = null }) => {
  const { updateDirection, addDirection } = useContext(UserDirectionContext);
  const [availableCities, setCitysToShowed] = useState(null);

  const { formData, setFormData, onFormInputChange } = useFormDataRetriever(defaultInitialForm);

  const navigate = useNavigate();

  useEffect(() => {
    if (mode == "edit" && adressToEdit) {
      setFormData(adressToEdit);
    }
  }, [mode, setFormData, adressToEdit]);

  const nameFormat = useCallback((name) => {
    return name
      .split(" ")
      .map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase())
      .join(" ");
  }, []);

  // //on district change, update the available cities
  useEffect(() => {
    if (!formData) return;
    const ciudadesDisponibles = ciudades.filter((ciudad) => ciudad["Descripción de Departamento"] == formData.province.toUpperCase());
    setCitysToShowed(ciudadesDisponibles);
  }, [formData]);

  //Handle submit by form mode

  const handleSubmit = (e) => {
    e.preventDefault();
    if (/^\s*$/.test(formData.directionName)) formData.directionName = "Mi dirección";
    switch (mode) {
      case "add":
        addDirection(formData);
        navigate("/account/directions");
        break;
      case "edit":
        updateDirection(formData);
        navigate("/account/directions");
        break;
      case "checkout":
        addDirection(formData);
        break;
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row m-0">
        <fieldset className="col-12 col-md-6">
          <div className={`${styles.formGroup} alias form-group mb-3`}>
            <label htmlFor="directionName" className="form-label">
              Alias (opcional)
            </label>
            <input type="text" value={formData.directionName} className="form-control" id="directionName" name="directionName" onChange={onFormInputChange} />
          </div>
          <div className={`${styles.formGroup} form-group mb-3`}>
            <label htmlFor="clientName" className="form-label">
              Nombre
            </label>
            <input type="text" value={formData.clientName} className="form-control" id="clientName" name="clientName" onChange={onFormInputChange} required />
          </div>
          <div className={`${styles.formGroup} form-group mb-3`}>
            <label htmlFor="clientLastName" className="form-label">
              Apellido
            </label>
            <input type="text" value={formData.clientLastName} className="form-control" id="clientLastName" name="clientLastName" onChange={onFormInputChange} required />
          </div>
          <div className={`${styles.formGroup} form-group mb-3`}>
            <label htmlFor="clientCI" className="form-label">
              Cédula
            </label>
            <input type="text" value={formData.clientCI} className="form-control" id="clientCI" name="clientCI" onChange={onFormInputChange} required />
          </div>
          <div className={`${styles.formGroup} form-group mb-3`}>
            <label htmlFor="clientNumber" className="form-label">
              Número de teléfono
            </label>
            <input type="text" value={formData.clientNumber} className="form-control" id="clientNumber" name="clientNumber" onChange={onFormInputChange} required />
          </div>
        </fieldset>
        <fieldset className="col-12 col-md-6">
          <div className={`${styles.formGroup} form-group mb-3`}>
            <label htmlFor="country" className="form-label">
              País
            </label>
            <select className="form-control" name="country" value={formData.country} id="country" onChange={onFormInputChange} required>
              <option disabled>Selecciona una opción</option>
              <option value={"Paraguay"}>Paraguay</option>
            </select>
          </div>
          <div className={`${styles.formGroup} form-group mb-3`}>
            <label htmlFor="province" className="form-label">
              Departamento
            </label>
            <select className="form-control" name="province" value={formData.province.toUpperCase()} id="province" onChange={onFormInputChange} required>
              <option disabled>Selecciona un departamento</option>
              {departamentos.map((dpto) => {
                return (
                  <option key={dpto.codigo_dpto} value={dpto.descripcion_dpto}>
                    {nameFormat(dpto.descripcion_dpto)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={`${styles.formGroup} form-group mb-3`}>
            <label htmlFor="city" className="form-label">
              Ciudad
            </label>
            <select className="form-control" name="city" value={formData.city.toUpperCase()} id="city" onChange={onFormInputChange} required>
              <option disabled>Selecciona una ciudad</option>
              {!availableCities
                ? ""
                : availableCities.map((city) => (
                    <option key={city["Código de Distrito"]} value={city["Descripción de Distrito"]}>
                      {nameFormat(city["Descripción de Distrito"])}
                    </option>
                  ))}
            </select>
          </div>
          <div className={`${styles.formGroup} form-group mb-3`}>
            <label htmlFor="direction" className="form-label">
              Dirección
            </label>
            <input type="text" value={formData.direction} className="form-control" id="direction" name="direction" onChange={onFormInputChange} required />
          </div>
        </fieldset>
      </div>

      <button type="submit" className="btn button-color-primary mt-3">
        Guardar
      </button>
    </form>
  );
};
