import styles from "./styles.module.css";

export const Loader = ({ fullscreen = true, bgTransparent = false }) => {
  //ADD "column[i]" IN THE CLASS FOR EDITING THE LOADER COLUMN COLOR (MAX 3), AND GO TO THE GLOBAL STYLES FOR CHANGE COLORS

  return (
    <section className={`${styles.loaderContainer} ${fullscreen ? styles.fullscreen : ""} ${bgTransparent ? styles.bgDarkTransparent : ""}`}>
      <svg className={`${styles.loader}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect className={`spinner_GmWz ${styles.column1}`} x="1" y="4" width="6" height="14" />
        <rect className={`spinner_GmWz ${styles.column2}`} x="9" y="4" width="6" height="14" />
        <rect className={`spinner_GmWz ${styles.column3}`} x="17" y="4" width="6" height="14" />
      </svg>
    </section>
  );
};
