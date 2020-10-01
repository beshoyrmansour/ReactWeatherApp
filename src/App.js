import React, { useContext, useEffect, useState } from "react";
import { store } from "./contexts/store";

import MapComp from "./components/MapComp";
import "./App.css";
import SearchBox from "./components/SearchBox";
import {
  fetchWeatherDatabyGeolocation,
  fetchWeatherDatabyIP,
} from "./contexts/actions";

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
      console.log("Not Available =====");
      fetchWeatherDatabyIP()(dispatch)
    }
    return () => {};
  }, []);
  return (
    <>
      {state && (
        <>
          <MapComp />
          <SearchBox />
        </>
      )}
    </>
  );
}

export default App;
const ress = {
  place_id: "76188747",
  licence: "https://locationiq.com/attribution",
  osm_type: "node",
  osm_id: "6815783187",
  lat: "30.0012598",
  lon: "31.1595829",
  display_name:
    "30, The Mosque Street, Kom al Akhdar, Giza, Giza Governorate, 12814, Egypt",
  address: {
    house_number: "30",
    road: "The Mosque Street",
    suburb: "Kom al Akhdar",
    city: "Giza",
    state: "Giza Governorate",
    postcode: "12814",
    country: "Egypt",
    country_code: "eg",
  },
  boundingbox: ["30.0011598", "30.0013598", "31.1594829", "31.1596829"],
};
