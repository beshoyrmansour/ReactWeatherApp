import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import MapComp from "./components/MapComp";

import { LOC_IQ_REVERSE_API, OW_API } from "./constants";
import { store } from "./contexts/store";
import ACTIONS from "./contexts/types";

function App() {

  const { dispatch, state } = useContext(store);

  useEffect(() => {
    // Check user geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        dispatch({
          type: ACTIONS.SET_CURRENT_LOCATION,
          payload: [lat, lon],
        });
        // Fetch for user address
        fetch(
          LOC_IQ_REVERSE_API.replace("{LAT}", lat).replace("{LON}", lon)
        ).then((r) => {
          r.json().then((res) => {
            if ("address" in res)
              // Fetch User's City Weather
              fetch(
                OW_API.replace(
                  "{QUERY}",

                  res.address.city ? res.address.city : res.address.country
                )
              ).then((r) => {
                r.json().then((weather) => {
                  dispatch({
                    type: ACTIONS.SET_SELECTED_CITY_WEATHER_DATA,
                    payload: weather,
                  });
                });
              });
          });
        });
      });
    } else {
      console.log("Not Available");
    }
    return () => {};
  }, []);
  return (
    <>
      {state && (
        <MapComp/>
        
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
