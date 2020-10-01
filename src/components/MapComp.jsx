import React, { useContext, useEffect, useState } from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import Overlay from "pigeon-overlay";
import useWindowDimensions from "../hooks/useWindowDimensions";
import WeatherInfoCard from "./WeatherInfoCard";
import { store } from "../contexts/store";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",

    top: "50%",
    left: "50%",
    overflow: "hidden",
  },
}));

const MapComp = () => {
  const { dispatch, state } = useContext(store);
  const classes = useStyles();

  const { height, width } = useWindowDimensions();
  const [showInfoCard, setShowInfoCard] = useState(false);
  return (
    <>
      {state.isFechingLocation ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <Map
          center={state.currentLocation}
          zoom={12}
          width={width - 2}
          height={height - 7}
        >
          <Marker
            anchor={state.currentLocation}
            payload={state.selectedCityWeatherData}
            onClick={({ event, anchor, payload }) => {
              setShowInfoCard(!showInfoCard);
            }}
          />
          {showInfoCard && (
            <Overlay anchor={state.currentLocation}>
              <WeatherInfoCard />
            </Overlay>
          )}
        </Map>
      )}
    </>
  );
};

export default MapComp;
