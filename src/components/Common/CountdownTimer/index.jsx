import { PropTypes } from "prop-types";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { timestampToDate } from "../../../helpers/timestampToDate";

/**
 * @param {{
 * limitTime: { hour: [number, number, number], //[hours, minutes, seconds]
 * day: number,
 * month: number,
 * year: number } }} props
 */

export const CountdownTimer = ({ limitTime = { hour: [0, 0, 0], day: null, month: null, year: null } }) => {
  //Destructuring limit time
  let { hour, day, month, year } = limitTime;

  //limit time validations
  if (year == null) year = new Date().getFullYear();
  month == null ? (month = new Date().getMonth()) : (month -= 1);
  if (day == null) day = new Date().getDay() + 1;

  //Create a new date for the time left
  const timestampLimit = new Date(year, month, day, hour[0], hour[1], hour[2]).getTime();

  //Create a useState for time left
  const [timeLimit, setTimeLimit] = useState(null);

  // Create useEffect to calculate time left
  useEffect(() => {
    let timeleftInterval = setInterval(() => {
      const timestampNow = new Date().getTime();
      const timestampDifference = timestampLimit - timestampNow; //Calculate the difference between timeLimit and time now
      setTimeLimit(timestampToDate(timestampDifference));
    }, 1000);
    return () => clearInterval(timeleftInterval);
  }, [timestampLimit]);

  return !timeLimit ? (
    ""
  ) : (
    <div className={`${styles.countdownContainer}`}>
      <div className={`${styles.timeContainer}`}>
        <p>{timeLimit.days}</p>
        <span className={`${styles.timeName}`}>Dias</span>
      </div>
      <div className={`${styles.timeContainer}`}>
        <p>{timeLimit.hours}</p>
        <span className={`${styles.timeName}`}>Horas</span>
      </div>
      <div className={`${styles.timeContainer}`}>
        <p>{timeLimit.minutes}</p>
        <span className={`${styles.timeName}`}>Mins.</span>
      </div>
      <div className={`${styles.timeContainer}`}>
        <p>{timeLimit.seconds}</p>
        <span className={`${styles.timeName}`}>Segs.</span>
      </div>
    </div>
  );
};

CountdownTimer.propTypes = {
  limitTime: PropTypes.shape({
    hour: PropTypes.arrayOf(PropTypes.number),
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
};
