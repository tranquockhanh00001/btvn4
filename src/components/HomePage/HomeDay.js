import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './HomeDay.module.css'

export default function HomeDay() {
  const weather = useSelector(state => state.weather.weather.forecast.forecastday)

  const navigate = useNavigate();
  const handleDay = (dayEpoch) => {
    navigate(`/detail/${dayEpoch}`)
  }
  return (
    <>
      {
        weather.map((weatherDay, index) => {
          return (
            <div className={styles.container} key={weatherDay.date_epoch}>
              <div className={`${styles.content} ${index === 0 ? styles.today : ''}`} onClick={() => handleDay(weatherDay.date_epoch)} >
                <div>
                  {index === 0 ? 'Today' : weatherDay.date}
                </div>
                <img src={weatherDay.day.condition.icon} alt="" />
                <div>
                  {weatherDay.day.condition.text}
                </div>  
                <div>
                  {weatherDay.day.avghumidity}%
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}
