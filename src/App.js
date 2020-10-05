import React, { useContext, useEffect } from "react";
import { store } from "./contexts/store";

import MapComp from "./components/MapComp";
import WeatherBox from "./components/WeatherBox";
import {
  fetchWeatherDatabyGeolocation,
  fetchWeatherDatabyIP,
} from "./contexts/actions";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import deepOrange from "@material-ui/core/colors/deepOrange";
import blueGrey from "@material-ui/core/colors/blueGrey";

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: deepOrange,
  },
});
function App() {
  const { dispatch, state } = useContext(store);

  useEffect(() => {
    // Check user geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherDatabyGeolocation(position)(dispatch);
        },
        () => fetchWeatherDatabyIP()(dispatch)
      );
    } else {
      fetchWeatherDatabyIP()(dispatch);
    }
    return () => {};
  }, []);
  return (
    <>
      {state && (
        <ThemeProvider theme={theme}>
          <MapComp />
          <WeatherBox />
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
