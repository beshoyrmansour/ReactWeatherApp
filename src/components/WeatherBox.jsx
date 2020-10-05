import React, { useContext } from "react";
import { store } from "../contexts/store";
import ACTIONS from "../contexts/types";
import { searchForWeatherData } from "../contexts/actions";
import logo from "../owlogo.png";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Grow from "@material-ui/core/Grow";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { fade, makeStyles } from "@material-ui/core/styles";
import MainWeatherInfoCard from "./MainWeatherInfoCard";
import DayWeatherInfoCard from "./DayWeatherInfoCard";

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
      flexDirection: "column",
    },
  },
  gridList: {
    padding: "10px",
    margin: "10px",
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  gridListTile: {
    marginRight: "10px",
  },
  appBar: {
    position: "absolute",
    bottom: "auto",
    top: "15px",
    width: "100%",
  },
  showResultPaper: {
    position: "relative",
    bottom: "auto",
    top: "15px",
    width: "100%",
    paddingBottom: "20px",
    display: "flex",
    overflowX: "hidden",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    margin: 10,

    backgroundColor: fade(theme.palette.common.white, 0.25),
    width: "100%",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.35),
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
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },

  toolbar: {
    paddingRight: 0,
    width: "auto",
    backgroundColor: theme.palette.primary.dark,
    borderRadius: theme.shape.borderRadius,
  },
}));

const WeatherBox = () => {
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
      onSearch();
    }
  };
  const onSearch = () => {
    searchForWeatherData(state)(dispatch);
  };
  return (
    <div className={classes.appBar}>
      <Paper
        elevation={3}
        style={{ margin: "10px 10px 0px 20px", float: "left" }}
      >
        <Toolbar className={classes.toolbar}>
          <img src={logo} width="60" alt="openweathermap logo" />
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
          <MainWeatherInfoCard />
          {state.isShowMoreForcast && (
            <GridList className={classes.gridList} elevation={4}>
              {state.moreForcastList.map((dayData) => (
                <GridListTile
                  key={dayData.date}
                  className={classes.gridListTile}
                  style={{ height: "100%", width: "fit-content" }}
                >
                  <DayWeatherInfoCard dayData={dayData} />
                </GridListTile>
              ))}
            </GridList>
          )}
        </div>
      </Grow>
    </div>
  );
};

export default WeatherBox;
