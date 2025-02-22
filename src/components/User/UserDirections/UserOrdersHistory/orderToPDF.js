import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { logoSinFondoImg } from "../../../../assets/img";
import { moneyFormat } from "../../../../helpers/moneyFormat";
import { dolarToPYG } from "../../../../helpers/dolarToPYG";

export const orderToPDF = (order) => {
  if (typeof order !== "object" || Array.isArray(order)) console.warn("Las ordenes vienen en forma de objetos.");

  //create a new jsPDF
  const doc = new jsPDF();

  // const selectedOrder = orders.filter((order) => order.orderId == "3")[0];
  const selectedOrder = order;

  const tableHead = ["ID", "Nombre", "Precio", "Cant.", "Total"];
  const tableBody = selectedOrder.products.map((product) => {
    const row = [product.id, product.title, `Gs. ${moneyFormat(dolarToPYG(product.price))}`, product.quantity, `Gs. ${moneyFormat(dolarToPYG(product.totalPrice))}`];
    return row;
  });

  //This is the final information in the table, it is a summary of the cost of the order.
  const orderInfo = [
    ["", "", "Subtotal", "", `Gs. ${moneyFormat(selectedOrder.total)}`],
    ["", "", "Envío", "", `Gs. ${moneyFormat(selectedOrder.shipping.price)}`],
    ["", "", "Total a pagar", "", `Gs. ${moneyFormat(selectedOrder.total + selectedOrder.shipping.price)}`],
  ];

  const tableLength = tableBody.length - 1; //substract 1 because the init index is 0;

  //create a table for show order products info
  doc.autoTable({
    head: [tableHead],
    body: [...tableBody, ...orderInfo],
    headStyles: {
      fontSize: 14,
      fillColor: "rgb(227, 227, 227)",
      textColor: "#000000",
    },
    bodyStyles: {
      fontSize: 12,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: "wrap" },
      2: { cellWidth: "wrap" },
      3: { halign: "center" },
      4: { cellWidth: "wrap" },
    },
    theme: "striped",
    didParseCell: function (data) {
      // Change the row color for the tree last rows
      if (data.row.index === tableLength + 1 || data.row.index === tableLength + 2) {
        data.cell.styles.fillColor = [240, 240, 240]; // Light gray
        data.cell.styles.halign = "right";
      } else if (data.row.index === tableLength + 3) {
        data.cell.styles.fillColor = [240, 240, 240]; // Light gray
        data.cell.styles.halign = "right";
        data.cell.styles.fontStyle = "bold";
      }
    },
    margin: [35, 10, 20, 10],
  });
  doc.setTextColor("#9C9C9C");

  for (let i = 1; i <= doc.getNumberOfPages(); i++) {
    //insert order information and logo on the top of page
    doc.addImage(logoSinFondoImg, "png", 13, 4, 30, 30, "logo", "FAST");
    doc.setFontSize(23);
    doc.setPage(i);
    doc.text("PEDIDO", 155, 15);
    doc.setFontSize(17);
    doc.text(`${new Date(selectedOrder.date).toLocaleDateString()}`, 155, 21);
    doc.text(`N° ${selectedOrder.orderId}`, 155, 27);
  }

  doc.save(`FAC${order.orderId}`);
};
