import { LooksOneOutlined } from "@material-ui/icons";
import moment from "moment";
import { groupBy, chain } from "underscore";

import {
  LOC_IQ_REVERSE_API,
  OW_API,
  OW_COORD_API,
  OW_FORECAST_API,
} from "../constants";
import ACTIONS from "./types";

export const fetchWeatherDatabyIP = () => (dispatch) => {
  console.log("fetchWeatherDatabyIP====>");
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
  console.log("fetchWeatherDatabyGeolocation====>", { lat, lon });
  // Fetch for weather data by user geographic coordinates
  fetch(OW_COORD_API.replace("{LAT}", lat).replace("{LON}", lon)).then((r) => {
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
};
export const searchForWeatherData = (state) => (dispatch) => {
  fetch(OW_API.replace("{QUERY}", state.searchValue)).then((r) => {
    r.json().then((data) => {
      if ("cod" in data && data.cod == 200) {
        console.log("searchForWeatherData====>", data);
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
        dispatch({
          type: ACTIONS.SET_IS_FECHING,
          payload: {
            key: "isFechingLocation",
            value: false,
          },
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
        if ("cod" in data && data.cod == 200) {
          // let groups = groupBy(data.list, function (date) {
          //   // console.log("date", date);
          //   return occurrenceDay(date.dt_txt);
          // });

          var occurrenceDay = function (occurrence) {
            return moment(occurrence.dt_txt).startOf("day").format();
          };

          var groupToDay = function (group, day) {
            return {
              day: day,
              times: group,
            };
          };

          var result = chain(data.list)
            .groupBy(occurrenceDay)
            .map(groupToDay)
            .sortBy("day")
            .value();

          console.log("result", result);
          dispatch({
            type: ACTIONS.SHOW_MORE_FORCAST,
            payload: [...result],
          });
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
