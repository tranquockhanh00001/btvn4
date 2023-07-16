import * as types from '../constants';

const initialState = {
  weather: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DATA_SUCCESS:
      return {
        ...state,
        weather: action.weather,
      };
    default:
      return state;
  }
};

export default reducer;
