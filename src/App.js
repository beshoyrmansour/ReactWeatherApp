import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./owlogo.png";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import useWindowDimensions from "./hooks/useWindowDimensions";
import Overlay from "pigeon-overlay";
function App() {
  const { height, width } = useWindowDimensions();
  const [currentLocation, setCurrentLocation] = useState([50.879, 4.6997]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    } else {
      console.log("Not Available");
    }
    return () => {};
  }, []);
  return (
    <div className="">
      <Map center={currentLocation} zoom={12} width={width} height={height}>
        <Marker
          anchor={currentLocation}
          payload={{ k: "1K" }}
          onClick={({ event, anchor, payload }) => {
            console.log({ event, anchor, payload });
            setShow(!show);
          }}
        />
        {show && (
          <Overlay anchor={currentLocation} offset={[20, 179]}>
            <img src={logo} width={240} height={158} alt="" />
          </Overlay>
        )}
      </Map>
    </div>
  );
}

export default App;
