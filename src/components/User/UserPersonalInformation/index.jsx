import { useContext } from "react";
import { PageIndex } from "../../PageIndex";
import { AccountNavigationLinks } from "../AccountNavigationLinks";
import { ReturnToAccountButton } from "../ReturnToAccountButton";
import { UserContext } from "../../../contexts/UserContext";
import useFormDataRetriever from "../../../helpers/formDataRetriever";
import styles from "./styles.module.css";

export const UserPersonalInformation = () => {
  const { user } = useContext(UserContext);

  const initialForm = {
    name: user.name || "",
    lastName: user.lastName || "",
    email: user.email || "",
    changePassword: "",
  };

  const { formData, onFormInputChange } = useFormDataRetriever(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePassTogle = (e) => {
    if (e.target.dataset.isVisible == "false") {
      e.target.dataset.isVisible = true;
      document.querySelector(`.${styles.passwordToggle}`).textContent = "visibility_off";
      e.target.closest("form").changePassword.type = "text";
    } else if (e.target.dataset.isVisible == "true") {
      e.target.dataset.isVisible = false;
      document.querySelector(`.${styles.passwordToggle}`).textContent = "visibility";
      e.target.closest("form").changePassword.type = "password";
    }
  };

  return (
    <>
      <section className="container-fluid p-0">
        <PageIndex />
      </section>
      <section className="container-lg p-0 py-5">
        <div className="row m-0">
          <aside className="container col-4 d-none d-lg-block">
            <AccountNavigationLinks />
          </aside>
          <section className="container col-12 col-lg-8">
            <form className="row m-0" onChange={onFormInputChange}>
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="inputName" className="form-label">
                  Nombre
                </label>
                <input type="text" name="name" className="form-control" id="inputName" defaultValue={formData.name} />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="inputLastName" className="form-label">
                  Apellido
                </label>
                <input type="text" name="lastName" className="form-control" id="inputLastName" defaultValue={formData.lastName} placeholder="apellido" />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Correo electronico
                </label>
                <input type="email" name="email" className="form-control" id="inputEmail" defaultValue={formData.email} />
              </div>

              {/* force break line */}
              <div className="w-100"></div>

              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="inputChangePassword" className="form-label">
                  Cambiar contraseña
                </label>
                <div className={`${styles.passwordContainer}`}>
                  <input type="password" name="changePassword" className="form-control" id="inputChangePassword" defaultValue={formData.changePassword} />
                  <span className={`${styles.passwordToggle} material-symbols-outlined`} data-is-visible={"false"} onClick={handlePassTogle}>
                    visibility
                  </span>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn button-color-primary" onSubmit={(e) => handleSubmit(e)}>
                  Submit
                </button>
              </div>
            </form>
            <div className="container-fluid p-0 mt-5">
              <ReturnToAccountButton />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
