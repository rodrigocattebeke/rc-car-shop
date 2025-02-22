export const timestampToDate = (timestamp = null) => {
  if (!timestamp) {
    console.warn("No se especificó ningun timestamp");
    return null;
  }
  if (timestamp < 0) {
    console.warn("El timestamp es menor a 0");
    return 0;
  }

  let days = Math.floor(timestamp / (1000 * 60 * 60 * 24)),
    remainingDays = timestamp % (1000 * 60 * 60 * 24),
    hours = Math.floor(remainingDays / (1000 * 60 * 60)),
    remainingHours = remainingDays % (1000 * 60 * 60),
    minutes = Math.floor(remainingHours / (1000 * 60)),
    remainingMinutes = remainingHours % (1000 * 60),
    seconds = Math.floor(remainingMinutes / 1000);

  return {
    days: days < 10 ? `0${days}` : days,
    hours: hours < 10 ? `0${hours}` : hours,
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: seconds < 10 ? `0${seconds}` : seconds,
  };
};
