// import styles from "./errorScreen.module.css";

export const ErrorScreen = ({ errorMessage = "Error al cargar los productos" }) => {
  return (
    <div className="container d-flex align-center my-5">
      <h2>{errorMessage}</h2>
    </div>
  );
};
