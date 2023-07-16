import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoArrowBackOutline } from 'react-icons/io5'; 
import { useNavigate, useParams } from 'react-router-dom';
import ChartDay from './ChartDays';
import SliderDays from './SliderDays';

export default function Day() {
  const weatherDay = useSelector(state => state.weather.weather.forecast.forecastday);
  const navigate = useNavigate();
  const { epoch } = useParams();
  const [selectedWeatherDay, setSelectedWeatherDay] = useState(null);

  useEffect(() => {
    const filteredWeather = weatherDay.filter(weather => weather.date_epoch === Number(epoch));
    setSelectedWeatherDay(filteredWeather[0]);
  }, [epoch, weatherDay]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      {selectedWeatherDay && (
        <div style={
          {
            maxWidth: '1000px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: "#f8f9fa",
          }
        }>
          <div>
            <IoArrowBackOutline onClick={handleBack} 
            style={{
              float: "left",
              fontSize: "30px",
              cursor: "pointer",
            }}
            />
            <h1
              style={{
                paddingTop: "30px",
              }}
            >Ha Noi - Viet Nam</h1>
            <h2>{selectedWeatherDay.date}</h2>
            <ChartDay weatherDay={selectedWeatherDay} />
            <SliderDays />
          </div>
        </div>
      )}
    </>
  );
}
