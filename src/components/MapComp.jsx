import React, { useContext, useEffect, useState } from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import Overlay from "pigeon-overlay";
import useWindowDimensions from "../hooks/useWindowDimensions";
import WeatherInfoCard from "./WeatherInfoCard";
import { store } from "../contexts/store";


const MapComp = () => {

  const { dispatch, state } = useContext(store);

  const { height, width } = useWindowDimensions();
  const [showInfoCard, setShowInfoCard] = useState(false);
  return (
    <Map
      center={state.currentLocation}
      zoom={12}
      width={width-2}
      height={height-7}
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
          <WeatherInfoCard city={state.selectedCityWeatherData} />
        </Overlay>
      )}
    </Map>
  );
};

export default MapComp;
