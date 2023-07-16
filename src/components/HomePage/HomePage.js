import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './HomePage.module.css';

export default function HomePage() {
  const weather = useSelector(state => state.weather.weather);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatDateTime = (dateTime) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <div className={styles.inputContainer}>
        Your city:
        <input/>
      </div>
      <h1 className={styles.titleTime}>{formatDateTime(currentDateTime)}</h1>
      <div className={styles.temp}>
        <img src={weather.current.condition.icon} alt="" />
        <h1>
          {weather.current.temp_c}
          <span>°C</span>
        </h1>
      </div>
      <h1 className={styles.cloud}>{weather.current.condition.text}</h1>
      <div className={styles.status}>
        <div className={styles.humidity}>
          <h1>Humidity</h1>
          <h2>{weather.current.humidity}%</h2>
        </div>
        <div className={styles.windSpeed}>
          <h1>Wind speed</h1>
          <h2>{weather.current.wind_kph} km/h</h2>
        </div>
      </div>
    </>
  );
}
