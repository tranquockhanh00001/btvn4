import { fetchDataSuccess } from "./index";

export const fetchWeather = () => async dispatch => {
  try {
    const url = "https://api.weatherapi.com/v1/forecast.json?key=f5ac4be4a19c47d8a3e42522222112&q=hanoi&days=10&aqi=no&alerts=yes";
    const response = await fetch(url);
    const responseBody = await response.json();
    
    dispatch(fetchDataSuccess(responseBody));
  } catch (error) {
    console.log(error);
  }
};
