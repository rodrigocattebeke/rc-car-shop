import React, { useContext, useEffect, useState } from "react";
import { bankTransfer, creditCard, gpay } from "../../../assets/icons";
import styles from "./styles.module.css";
import { CheckoutContext } from "../../../contexts/CheckoutContext";

//payments methods indexes for methodsInfo object.
//G Pay = 1,
//Bank Transfer = 2,
// Credit Card = 3

const methodsInfo = {
  1: "G Pay",
  2: "IMPORTANTE: Indicar el número de pedido en el concepto de su transferencia. <br><br>El pedido estará vigente durante 24 horas para realizar el depósito/transferencia.<br><br> El SISTEMA NACIONAL DE PAGOS no opera sábados, domingos ni feriados.<br><br>Tenga en cuenta que el horario para TRANSFERENCIA INTERBANCARIA es: 08:00hs a 20:00hs.<br><br>Datos para depósito o transferencia <br> Titular: JC Emprendimientos S.A <br>RUC: 80091613-1 <br> - Banco Ueno Cta. Guaranies: 123456798 <br>- Banco Familiar: Cta. Guaranies: 03-12334567 <br> <br>Una vez realizado el deposito o la transferencia, enviar una FOTO o CAPTURA DE PANTALLA del comprobante en el siguiente numero de Whatsapp +595 980 123 456<br>Pagos confirmados después de las 15:00 tendrán un retraso de un día hábil adicional para la entrega del producto.",
  3: "Tarjeta de credito",
};

export const PaymentMethod = () => {
  const { updatePayment } = useContext(CheckoutContext);
  const [payMethodSelected, setPayMethodSelected] = useState(null);

  const stringFormater = (string) => {
    if (!string) return;
    const lines = string.split("<br>");

    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleSelectedMethod = (e) => {
    const methodIndex = e.target.closest(`.${styles.methodCard}`).dataset.paymethod;
    setPayMethodSelected(methodIndex);

    let methodSelected;

    switch (methodIndex) {
      case "1":
        methodSelected = "G Pay";
        break;
      case "2":
        methodSelected = "Depósito o transferencia bancaria";
        break;
      case "3":
        methodSelected = "Tarjeta de crédito";
        break;
      default:
        methodSelected = null;
    }
    updatePayment(methodSelected);
  };

  useEffect(() => {
    setPayMethodSelected("2");
    updatePayment("Depósito o transferencia bancaria");
  }, []);

  return (
    <section className="container-fluid p-0">
      <div className={`${styles.paymentMethodsContainer}`}>
        <div className={`${styles.methodCard} ${payMethodSelected == "1" ? styles.active : ""}`} data-paymethod="1" onClick={handleSelectedMethod}>
          <img src={gpay}></img>
          <p>G Pay</p>
        </div>
        <div className={`${styles.methodCard} ${payMethodSelected == "2" ? styles.active : ""}`} data-paymethod="2" onClick={handleSelectedMethod}>
          <img src={bankTransfer}></img>
          <p>Depósito o transferencia bancaria</p>
        </div>
        <div className={`${styles.methodCard} ${payMethodSelected == "3" ? styles.active : ""}`} data-paymethod="3" onClick={handleSelectedMethod}>
          <img src={creditCard}></img>
          <p>Tarjeta de crédito</p>
        </div>
      </div>
      <div className={`${styles.infoContainer} container-fluid `}>
        <p>{stringFormater(methodsInfo[payMethodSelected])}</p>
      </div>
    </section>
  );
};
