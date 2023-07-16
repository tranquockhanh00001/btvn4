import * as Types from "../constants";

export const fetchDataRequest = () => ({
  type: Types.FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (weather) => ({
  type: Types.FETCH_DATA_SUCCESS,
  weather
});
