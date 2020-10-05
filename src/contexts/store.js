import React, { createContext, useReducer } from "react";
import ACTIONS from "./types";
const initialState = {
  currentLocation: [5.8364, 5.8364],
  selectedCityWeatherData: {},
  isFechingLocation: true,
  showResultCard: false,
  isShowMoreForcast: false,
  searchValue: "",
  moreForcastList: [],
};
const store = createContext({});
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      
      case ACTIONS.SET_CURRENT_LOCATION:
        return {
          ...state,
          currentLocation: action.payload,
        };
      case ACTIONS.SET_IS_FECHING:
        return {
          ...state,
          [action.payload.key]: action.payload.value,
        };

      case ACTIONS.SET_SELECTED_CITY_WEATHER_DATA:
        return {
          ...state,
          selectedCityWeatherData: action.payload,
          showResultCard: true,
        };

      case ACTIONS.SET_IS_FECHING_LOCATION:
        return {
          ...state,
          isFechingLocation: action.payload,
        };

      case ACTIONS.SET_SEARSH_VALUE:
        return {
          ...state,
          searchValue: action.payload,
        };
        
      case ACTIONS.SHOW_MORE_FORCAST:
        return {
          ...state,
          moreForcastList: [...action.payload],
        };

      default:
        return { ...state };
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
