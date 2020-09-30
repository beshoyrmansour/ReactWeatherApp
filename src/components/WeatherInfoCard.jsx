import React from "react";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

const WeatherInfoCard = ({ city }) => {
  return (
    <div>
      <Paper component="span" m={1} elevation={3} variant="outlined">
        <Card>
          <CardContent>
            {city && city.main ? (
              <>
                <p>Name: {city.name}</p>
                <p>feels Like: {city.main.feels_like}</p>
                <p>Temp max: {city.main.temp_max}</p>
                <p>Temp min: {city.main.temp_min}</p>
              </>
            ) : (
              <>
              <p>Can't Get Your Weather Data</p>
              <p>Please Select a City</p>
              </>
            )}
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
};

export default WeatherInfoCard;
