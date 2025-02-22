import { useEffect, useState } from "react";
import "./login.css";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useLocation } from "react-router-dom";
import { Loader } from "../Common/Loader";

export const LoginAndRegisterForm = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isLoginActive, setisLoginActive] = useState(true);
  const [isRegisterActive, setisRegisterActive] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const location = useLocation();

  const loginActive = () => {
    window.location.hash = "login";
    setisLoginActive(true);
    setShowRegisterForm(false);
    setTimeout(() => {
      setShowLoginForm(true);
      setisRegisterActive(false);
    }, 500);
  };

  const registerActive = () => {
    window.location.hash = "register";
    setisRegisterActive(true);
    setShowLoginForm(false);
    setTimeout(() => {
      setShowRegisterForm(true);
      setisLoginActive(false);
    }, 500);
  };

  useEffect(() => {
    if (location.hash == "#login") {
      setisLoginActive(true);
      setShowRegisterForm(false);
      setTimeout(() => {
        setShowLoginForm(true);
        setisRegisterActive(false);
      }, 500);
    } else if (location.hash == "#register") {
      setisRegisterActive(true);
      setShowLoginForm(false);
      setTimeout(() => {
        setShowRegisterForm(true);
        setisLoginActive(false);
      }, 500);
    }
  }, [location]);

  return (
    <>
      {isLoaderActive && (
        <div className="w-100 h-100 position-absolute z-1 bg-transparent">
          <Loader fullscreen={false} bgTransparent={true} />
        </div>
      )}
      <div className="loginBody">
        <section className="login-container">
          <div className="login-header mb-2">
            <p className={`link linkLeft ${isLoginActive ? "active" : ""}`} onClick={loginActive}>
              Iniciar Sesión
            </p>
            <p className={`link linkRight ${isRegisterActive ? "active" : ""}`} onClick={registerActive}>
              Registrarse
            </p>
          </div>
          <div className={`${isRegisterActive ? "registerFormActive" : ""} formContainer`}>
            {isLoginActive && <LoginForm setIsLoaderActive={setIsLoaderActive} showFormClass={showLoginForm ? "active" : ""}></LoginForm>}
            {isRegisterActive && <RegisterForm setIsLoaderActive={setIsLoaderActive} showFormClass={showRegisterForm ? "active" : ""}></RegisterForm>}
          </div>
        </section>
      </div>
    </>
  );
};
