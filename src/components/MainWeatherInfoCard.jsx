import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { showMoreForcast } from "../contexts/actions";
import { store } from "../contexts/store";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "25px 20px 15px 20px",
    padding: 10,
    minWidth: 300,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 128,
    marginBottom: 20,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
const WeatherInfoCard = ({ isOverlay }) => {
  const classes = useStyles();
  const { dispatch, state } = useContext(store);
  const handleShowMoreForcast = () => {
    showMoreForcast(state)(dispatch);
  };
  return (
    <Card className={classes.root} raised>
      {state.selectedCityWeatherData && state.selectedCityWeatherData.main ? (
        <>
          <CardMedia
            className={classes.cover}
            image={`http://openweathermap.org/img/wn/${state.selectedCityWeatherData.weather[0].icon}@4x.png`}
            title="Weather icon"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {state.selectedCityWeatherData.name}
              </Typography>
              <Typography component="h5" variant="h5">
                {Math.round(state.selectedCityWeatherData.main.feels_like)}
                &#176; {state.selectedCityWeatherData.weather[0].main}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {Math.round(state.selectedCityWeatherData.main.temp_max)}&#176;{" "}
                / {Math.round(state.selectedCityWeatherData.main.temp_min)}
                &#176;
              </Typography>

              <Typography variant="subtitle2" color="textSecondary">
                {state.selectedCityWeatherData.weather[0].description}
              </Typography>
            </CardContent>
            {!isOverlay && (
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={handleShowMoreForcast}
                >
                  {state.isShowMoreForcast ? "Hide forcasts" : "Show more"}
                  <ChevronRightIcon />
                </Button>
              </CardActions>
            )}
          </div>
        </>
      ) : (
        <>
          <p>Can't Get Your Weather Data</p>
          <p>Please Select another City</p>
        </>
      )}
    </Card>
  );
};

export default WeatherInfoCard;
