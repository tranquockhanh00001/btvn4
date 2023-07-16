import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './redux/actions/Fetching';
import { Route, Routes } from 'react-router-dom';
import HomeChart from './components/HomePage/HomeChart';
import HomeDay from './components/HomePage/HomeDay';
import HomePage from './components/HomePage/HomePage';
import SubPage from './components/Detail/SubPage';
import styles from './App.module.css';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  const weather = useSelector(state => state.weather.weather);

  const RenderWeather = () => {
    return (
      <>
        {weather ? (
          <div className={styles.container}>
            <div className={styles.leftContainer}>  
              <HomePage />
            </div>
            <div className={styles.rightContainer}>
              <h1 style={{
                fontSize: "50px",
              }}>Ha Noi</h1>
              <div className={styles.homeChart}>
                <h3>Temperature Chart</h3>
                <HomeChart />
              </div>
              <HomeDay />
            </div>
          </div>
        ) : null}
      </>
    );
  };

  const sleep = (ms) => {
    return new Promise((res) => setTimeout(res, ms));
  };

  const LoadComponent = lazy(async () => {
    await sleep(300);
    return {
      default: RenderWeather,
    };
  });

  const LoadDay = lazy(async () => {
    await sleep(300);
    return {
      default: SubPage,
    };
  });

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<LoadComponent />} />
        <Route path="/detail/:epoch" element={<LoadDay />} />
      </Routes>
    </Suspense>
  );
}

export default App;
