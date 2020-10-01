import React, { useContext, useEffect, useState } from "react";
import { store } from "../contexts/store";
import ACTIONS from "../contexts/types";
import { searchForWeatherData } from "../contexts/actions";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Grow from "@material-ui/core/Grow";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { fade, makeStyles } from "@material-ui/core/styles";
import WeatherInfoCard from "./WeatherInfoCard";
import SmallWeatherInfoCard from "./SmallWeatherInfoCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflowX: "hidden",
    overflowY: "visible",
    marginTop: "1rem",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      width: "90vw",
      flexDirection: "column",
    },
  },
  gridList: {
    padding: "10px",
    margin: "10px",
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  gridListTile: {
    width: "300px",
    backgroundColor: "black",
    marginRight: "10px",
  },
  appBar: {
    position: "absolute",
    bottom: "auto",
    top: "15px",
    left: "5%",
    width: "300px",

    // right: "auto",
  },
  showResultPaper: {
    position: "relative",
    bottom: "auto",
    top: "15px",
    width: "90vw",
    // left: "5%",
    // right: "auto",
    display: "flex",
    overflowX: "hidden",

    // maxWidth: "300px",
    [theme.breakpoints.down("sm")]: {
      // width: "90vw",
      maxWidth: "auto",
      flexDirection: "column",
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    width: "100%",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(1),
      width: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between",
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
    backgroundColor: fade(theme.palette.secondary.main, 1),
    Color: fade(theme.palette.secondary.main, 1),
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 1),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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

const SearchBox = () => {
  const { dispatch, state } = useContext(store);
  const classes = useStyles();

  const onChangeSearchValue = (v) => {
    dispatch({
      type: ACTIONS.SET_SEARSH_VALUE,
      payload: v.target.value,
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
      onSearch();
    }
  };
  const onSearch = () => {
    searchForWeatherData(state)(dispatch);
  };
  return (
    <div className={classes.appBar}>
      <Paper elevation={3}>
        <Toolbar style={{ paddingRight: 0 }}>
          <div className={classes.search}>
            <InputBase
              placeholder="City Name…"
              type="search"
              value={state.searchValue}
              autoFocus
              fullWidth
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyPress={handleKeyPress}
              onChange={(v) => onChangeSearchValue(v)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <IconButton color="secondary" aria-label="search" onClick={onSearch}>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </Paper>
      <Grow in={state.showResultCard}>
        <div className={classes.showResultPaper}>
          <WeatherInfoCard />
          {state.isShowMoreForcast && <GridList className={classes.gridList} cols={4} elevation={4}>
            <GridListTile
              key={1}
              className={classes.gridListTile}
              style={{ height: "100%", width: "250px" }}
            >
              <Paper elevation={4}>
                <SmallWeatherInfoCard />
              </Paper>
            </GridListTile>

            <GridListTile
              key={2}
              className={classes.gridListTile}
              style={{ height: "100%", width: "250px" }}
            >
              <Paper elevation={4}>
                <SmallWeatherInfoCard />
              </Paper>
            </GridListTile>

            <GridListTile
              key={3}
              className={classes.gridListTile}
              style={{ height: "100%", width: "250px" }}
            >
              <Paper elevation={4}>
                <SmallWeatherInfoCard />
              </Paper>
            </GridListTile>

            <GridListTile
              key={4}
              className={classes.gridListTile}
              style={{ height: "100%", width: "250px" }}
            >
              <Paper elevation={4}>
                <SmallWeatherInfoCard />
              </Paper>
            </GridListTile>
          </GridList>}
        </div>
      </Grow>
    </div>
  );
};

export default SearchBox;
