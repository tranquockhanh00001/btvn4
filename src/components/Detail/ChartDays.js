import styles from './ChartDays.module.css';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, Title, CategoryScale, LinearScale, PointElement, LineElement, Filler, Legend, Tooltip } from 'chart.js';

Chart.register(Title, CategoryScale, LinearScale, PointElement, LineElement, Filler, Legend, Tooltip);

export default function ChartDay(props) {
  const [time, setTime] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [uv, setUv] = useState([]);
  const [temp, setTemp] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Temperature');

  useEffect(() => {
    const newTime = [];
    const newTemp = [];
    const newUv = [];
    const newHumidity = [];

    props.weatherDay.hour.forEach((hour) => {
      if (hour.temp_c) {
        newTemp.push(hour.temp_c);
      }
      if (hour.uv) {
        newUv.push(hour.uv);
      }
      if (hour.humidity) {
        newHumidity.push(hour.humidity);
      }
      if (hour.time) {
        const timeSplit = hour.time.split(' ')[1];
        newTime.push(timeSplit);
      }
    });

    setHumidity(newHumidity);
    setTemp(newTemp);
    setUv(newUv);
    setTime(newTime);
  }, [props.weatherDay.hour]);

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const getSelectedDataset = () => {
    switch (selectedOption) {
      case 'Temperature':
        return [
          {
            fill: true,
            label: 'Temperature',
            data: temp,
            borderColor: '#ff8800',
            backgroundColor: '#fec256',
            pointRadius: 0,
          },
        ];
      case 'UV':
        return [
          {
            fill: true,
            label: 'UV',
            data: uv,
            borderColor: '#800080d9',
            backgroundColor: '#80008082',
            pointRadius: 0,
          },
        ];
      case 'Humidity':
        return [
          {
            fill: true,
            label: 'Humidity',
            data: humidity,
            borderColor: '#023e8a',
            backgroundColor: '#5bbddc',
            pointRadius: 0,
          },
        ];
      default:
        return [];
    }
  };

  const data = {
    labels: time,
    datasets: getSelectedDataset(),
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className={styles.containerInput}>
        <label>
          <input
            type="radio"
            value="Temperature"
            checked={selectedOption === 'Temperature'}
            onChange={() => handleOptionChange('Temperature')}
          />
          Temperature
        </label>
        <label>
          <input
            type="radio"
            value="UV"
            checked={selectedOption === 'UV'}
            onChange={() => handleOptionChange('UV')}
          />
          UV
        </label>
        <label>
          <input
            type="radio"
            value="Humidity"
            checked={selectedOption === 'Humidity'}
            onChange={() => handleOptionChange('Humidity')}
          />
          Humidity
        </label>
      </div>
      <div className="chart-container" style={{ maxWidth: "800px", maxHeight: "800px", margin: "0 auto" }}>
        <Line options={options} data={data} />
      </div>
    </>
  );
}
