import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import MapComp from "./components/MapComp";

import { LOC_IQ_REVERSE_API, OW_API } from "./constants";
import { store } from "./contexts/store";
import ACTIONS from "./contexts/types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import InputBase from "@material-ui/core/InputBase";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";

function App() {
  const classes = useStyles();

  const { dispatch, state } = useContext(store);

  const getCityWeather = (location) => {
    console.log("location", location);
    location.json().then((weather) => {
      dispatch({
        type: ACTIONS.SET_SELECTED_CITY_WEATHER_DATA,
        payload: weather,
      });
    });
  };

  useEffect(() => {
    // Check user geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
        },
        (error) => {
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
                OW_API.replace(
                  "{QUERY}",
                  res.city ? res.city : res.country_name
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
        }
      );
    } else {
      console.log("Not Available =====");
    }
    return () => {};
  }, []);
  return (
    <>
      {state && (
        <>
          <MapComp />
          <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  );
}

export default App;
const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    bottom: "auto",
    top: "15px",
    width: "90%",
    left: "5%",
    // right: "auto",
  },
  grow: {
    flexGrow: 1,
  },
  // fabButton: {
  //   position: "absolute",
  //   zIndex: 1,
  //   top: -30,
  //   left: 0,
  //   right: 0,
  //   margin: "0 auto",
  // },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
