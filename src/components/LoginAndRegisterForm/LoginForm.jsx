import useFormDataRetriever from "../../helpers/formDataRetriever";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginForm = ({ setIsLoaderActive, showFormClass = "" }) => {
  const initialForm = { user: "", password: "" };
  const { formData, onFormInputChange } = useFormDataRetriever(initialForm);
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.user) return alert("Debes de ingresar un nombre de usuario");
    if (!formData.password) return alert("Debes de ingresar una contraseña");
    setIsLoaderActive(true);
    const response = await logIn(formData);

    const redirectTo = decodeURIComponent(new URLSearchParams(location.search).get("redirect"));

    if (response.logged) {
      setTimeout(() => {
        navigate(redirectTo == "null" ? "/" : `${redirectTo}`);
      }, 500);
      setIsLoaderActive(false);
    } else {
      setIsLoaderActive(false);
      alert(response.message);
    }
  };

  return (
    <form className={`loginForm ${showFormClass}`}>
      <input type="text" name="user" placeholder="Usuario" id="user" title="user" className="login-input" onChange={onFormInputChange} required />
      <input type="password" name="password" placeholder="Contraseña" id="password" title="password" className="login-input" onChange={onFormInputChange} required />
      <button className="btn button-color-primary login-submit" onClick={handleLogin}>
        Iniciar Sesión
      </button>
    </form>
  );
};
