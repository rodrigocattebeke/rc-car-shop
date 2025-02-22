import { FormAdress } from "../../FormAdress";
import { PageIndex } from "../../PageIndex";
import styles from "./styles.module.css";

export const NewUserDirection = () => {
  return (
    <>
      <section className="container-fluid p-0">
        <PageIndex />
      </section>
      <section className={`container mt-3 mb-5`}>
        <div className={`${styles.title}`}>
          <p>Actualizar su dirección</p>
        </div>
        <FormAdress mode="add" />
      </section>
    </>
  );
};
