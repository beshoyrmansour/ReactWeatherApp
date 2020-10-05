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
import moment from "moment";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",

    margin: "15px",
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      // flexDirection: "column",
      //   width: "80vw",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
  },
  content: {
    flex: "1 0 auto",
  },
  timeContent: {
    flex: "1 0 auto",
    paddingTop: 0,
  },
  weatherIcon: {
    height: 100,
    width: "fit-content",
    objectFit: "contain",
  },
  timeWeatherIcon: {
    height: 60,
    backgroundSize: "contain",
    backgroundPosition: "center",
  },

  grid: {
    width: "fit-content",
    display: "flex",
    // border: `1px solid ${theme.palette.divider}`,
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
  },
}));

const DayWeatherInfoCard = ({ dayData }) => {
  const classes = useStyles();
  const { dispatch, state } = useContext(store);
  const handleShowMoreForcast = () => {
    showMoreForcast(state)(dispatch);
  };
  console.log("weatherData", dayData);
  return (
    <Card className={classes.root} raised>
      {dayData && "times" in dayData ? (
        <>
          <div className="d-flex w-100 justify-content-start align-items-center">
            <img
              className={classes.weatherIcon}
              src={`http://openweathermap.org/img/wn/${
                dayData.times[Math.round(dayData.times.length / 2)].weather[0]
                  .icon
              }@2x.png`}
              title="Weather icon"
            />
            <div>
              <Typography component="p" variant="p">
                <strong>
                  {Math.round(
                    dayData.times[Math.round(dayData.times.length / 2)].main
                      .feels_like
                  )}
                  &#176;
                </strong>{" "}
                {
                  dayData.times[Math.round(dayData.times.length / 2)].weather[0]
                    .main
                }
              </Typography>
              <Typography component="h5" variant="h5">
                {moment(dayData.day).format("DD, MMM YYYY")}
              </Typography>
            </div>
          </div>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Grid container alignItems="center" className={classes.grid}>
                {dayData.times.map((time) => (
                  <div className={classes.gridItem}>
                    <CardMedia
                      className={classes.timeWeatherIcon}
                      image={`http://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png`}
                      title="Weather icon"
                    />
                    <CardContent className={classes.timeContent}>
                      <Typography component="p" variant="p">
                        <strong>
                          {Math.round(time.main.feels_like)}
                          &#176;{" "}
                        </strong>
                        {time.weather[0].main}
                      </Typography>
                      <Typography component="p" variant="p">
                        {moment(time.dt_txt).format("hh:mm A")}
                      </Typography>
                    </CardContent>
                  </div>
                ))}
              </Grid>
              {/* <Typography component="h5" variant="h5">
                {Math.round(dayData.main.feels_like)}
                &#176; {dayData.weather[0].main}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {Math.round(dayData.main.temp_max)}&#176; /{" "}
                {Math.round(dayData.main.temp_min)}
                &#176;
              </Typography>

              <Typography variant="subtitle2" color="textSecondary">
                {dayData.weather[0].description}
              </Typography> */}
            </CardContent>
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

export default DayWeatherInfoCard;
