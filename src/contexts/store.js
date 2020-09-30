import React, { createContext, useReducer } from "react";
import ACTIONS from "./types";
const initialState = { currentLocation: [5.8364, 5.8364], selectedCityWeatherData: {} };
const store = createContext({});
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ACTIONS.SET_CURRENT_LOCATION:
        return { ...state, currentLocation: action.payload };

      case ACTIONS.SET_SELECTED_CITY_WEATHER_DATA:
        return { ...state, selectedCityWeatherData: action.payload };

      default:
        console.log("default", state);
        return { ...state };
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
