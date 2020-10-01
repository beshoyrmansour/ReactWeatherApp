import { LOC_IQ_REVERSE_API, OW_API, OW_FORECAST_API } from "../constants";
import ACTIONS from "./types";

export const fetchWeatherDatabyIP = () => (dispatch) => {
  fetch("https://ipapi.co/json/").then((r) => {
    console.log("r", r);
    r.json().then((res) => {
      console.log("res", res);
      dispatch({
        type: ACTIONS.SET_CURRENT_LOCATION,
        payload: [res.latitude, res.longitude],
      });
      // Fetch for user address

      // Fetch User's City Weather
      fetch(
        OW_API.replace("{QUERY}", res.city ? res.city : res.country_name)
      ).then((r) => {
        r.json().then((data) => {
          console.log("data", data);

          dispatch({
            type: ACTIONS.SET_SELECTED_CITY_WEATHER_DATA,
            payload: data,
          });
          dispatch({
            type: ACTIONS.SET_SEARSH_VALUE,
            payload: data.name,
          });
          dispatch({
            type: ACTIONS.SET_IS_FECHING,
            payload: {
              key: "isFechingLocation",
              value: false,
            },
          });
        });
      });
    });
  });
};

export const fetchWeatherDatabyGeolocation = (position) => (dispatch) => {
  const lon = position.coords.longitude;
  const lat = position.coords.latitude;
  dispatch({
    type: ACTIONS.SET_CURRENT_LOCATION,
    payload: [lat, lon],
  });
  // Fetch for user address
  fetch(LOC_IQ_REVERSE_API.replace("{LAT}", lat).replace("{LON}", lon)).then(
    (r) => {
      r.json().then((res) => {
        if ("address" in res)
          // Fetch City Weather Data
          fetch(
            OW_API.replace(
              "{QUERY}",
              res.address.city ? res.address.city : res.address.country
            )
          ).then((r) => {
            r.json().then((data) => {
              console.log("data", data);
              dispatch({
                type: ACTIONS.SET_SELECTED_CITY_WEATHER_DATA,
                payload: data,
              });
              dispatch({
                type: ACTIONS.SET_IS_FECHING,
                payload: {
                  key: "isFechingLocation",
                  value: false,
                },
              });
              dispatch({
                type: ACTIONS.SET_SEARSH_VALUE,
                payload: data.name,
              });
            });
          });
      });
    }
  );
};
export const searchForWeatherData = (state) => (dispatch) => {
  fetch(OW_API.replace("{QUERY}", state.searchValue)).then((r) => {
    r.json().then((data) => {
      if ("cod" in data && data.cod == "200") {
        dispatch({
          type: ACTIONS.SET_SELECTED_CITY_WEATHER_DATA,
          payload: data,
        });
        dispatch({
          type: ACTIONS.SET_CURRENT_LOCATION,
          payload: [data.coord.lat, data.coord.lon],
        });
        dispatch({
          type: ACTIONS.SET_SEARSH_VALUE,
          payload: data.name,
        });
      } else {
        dispatch({
          type: ACTIONS.SET_SELECTED_CITY_WEATHER_DATA,
          payload: {},
        });
      }
    });
  });
};

export const showMoreForcast = (state) => (dispatch) => {
    console.log(state.searchValue);
  if (!state.isShowMoreForcast) {
    fetch(OW_FORECAST_API.replace("{QUERY}", state.searchValue)).then((r) => {
      r.json().then((data) => {
        console.log("showMoreForcast DATA==>", data);
        if ("cod" in data && data.cod == "200") {
          //   dispatch({
          //     type: ACTIONS.SET_SELECTED_CITY_WEATHER_DATA,
          //     payload: data,
          //   });
          //   dispatch({
          //     type: ACTIONS.SET_CURRENT_LOCATION,
          //     payload: [data.coord.lat, data.coord.lon],
          //   });
          //   dispatch({
          //     type: ACTIONS.SET_SEARSH_VALUE,
          //     payload: data.name,
          //   });
        } else {
          //   dispatch({
          //     type: ACTIONS.SET_SELECTED_CITY_WEATHER_DATA,
          //     payload: {},
          //   });
        }
      });
    });
  }
  dispatch({
    type: ACTIONS.SET_IS_FECHING,
    payload: {
      key: "isShowMoreForcast",
      value: !state.isShowMoreForcast,
    },
  });
};
