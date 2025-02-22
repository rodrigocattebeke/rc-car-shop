export const setRandomId = () => {
  let timestampPart = Date.now().toString().slice(-4);
  let randomPart = Math.random().toString(36).slice(2, 9);
  let newId = timestampPart + randomPart;
  return newId;
};
