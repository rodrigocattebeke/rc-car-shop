import { useContext } from "react";
import useFormDataRetriever from "../../helpers/formDataRetriever";
import { UserContext } from "../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

export const RegisterForm = ({ setIsLoaderActive, showFormClass = "" }) => {
  const initialForm = { user: "", email: "", name: "", lastName: "", password: "" };
  const { formData, onFormInputChange } = useFormDataRetriever(initialForm);

  const { register } = useContext(UserContext);

  const location = useLocation();

  const navigate = useNavigate();

  const handleRegister = (e, userObj) => {
    e.preventDefault();
    if (!userObj.user || !userObj.email || !userObj.name || !userObj.lastName || !userObj.password) return;
    const res = register(userObj);
    const redirectTo = decodeURIComponent(new URLSearchParams(location.search).get("redirect"));

    if (res.success) {
      return navigate(redirectTo == "null" ? "/" : `${redirectTo}`);
    } else {
      alert(res.message);
    }
  };

  return (
    <form className={`registerForm ${showFormClass} `} onSubmit={(e) => handleRegister(e, formData)}>
      <input type="text" name="user" placeholder="Nombre de usuario" id="user" title="user" className="login-input" minLength={"5"} maxLength={"20"} onChange={onFormInputChange} value={formData.user} required />
      <input type="text" name="name" placeholder="Nombre" id="name" title="name" className="login-input" minLength={"2"} maxLength={"45"} onChange={onFormInputChange} value={formData.name} required />
      <input type="text" name="lastName" placeholder="Apellido" id="lastName" title="lastName" className="login-input" minLength={"2"} maxLength={"45"} onChange={onFormInputChange} value={formData.lastName} required />
      <input type="email" name="email" placeholder="Correo electrónico" id="email" title="email" className="login-input" onChange={onFormInputChange} value={formData.email} required />
      <input type="password" name="password" placeholder="Contraseña" id="password" title="password" className="login-input" minLength={"7"} maxLength={"45"} onChange={onFormInputChange} value={formData.password} required />
      <button className="btn button-color-primary register-submit">Registrarse</button>
    </form>
  );
};
