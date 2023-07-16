import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './SliderDays.module.css';

function SliderDays() {
    const weatherDay = useSelector(state => state.weather.weather.forecast.forecastday);
    const [selectedWeatherDay, setSelectedWeatherDay] = useState(null);
    const param = useParams();
    const containerRef = useRef(null); 
    const isDraggingRef = useRef(false); 

    useEffect(() => {
        const filteredWeather = weatherDay.filter(weather => weather.date_epoch === Number(param.epoch));
        setSelectedWeatherDay(filteredWeather[0]);
    }, [param.epoch, weatherDay]);

    useEffect(() => {
        const container = containerRef.current;

        const handleMouseDown = () => {
            isDraggingRef.current = true; 
            container.style.cursor = 'grabbing'; 
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false; 
            container.style.cursor = 'grab'; 
        };

        const handleMouseMove = e => {
            if (!isDraggingRef.current) return; 

            const delta = e.movementX;

            const scrollLeft = container.scrollLeft;

            container.scrollLeft = scrollLeft - delta;
        };

        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.content}>
                {selectedWeatherDay?.hour.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <div>
                            <p>{item.time.split(" ")[1]}</p>
                            <img src={item.condition.icon} alt="" />
                            <p>{item.condition.text}</p>
                            <p>{item.humidity}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SliderDays;
