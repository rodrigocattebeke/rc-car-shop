export const moneyFormat = (number = 0) => {
  if (!number) return 0;

  const formattedNumber = new Intl.NumberFormat("es-PY", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(number);
  return `Gs. ${formattedNumber}`;
};
