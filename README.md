# ReactWeatherApp

This app was initiated as assessment form company to test my react and UI/UX skills
and this is the instructions I received from the company:

> "The task is to create a web app that has a search bar where you can write a city (e.g. Cairo) and then it would show the weather for that city (like temperature, wind, etc..) for today, past few days, maybe next few days. Let me know if you have any questions.
> You can use any service for weather as long as it is REST with json."

I added the map view to give the user more sense of the weather changes and also to introduce a different perspective on the idea

## Demo

Before Dive deep into the code above you can see the execution here: https://brmreactweather.netlify.app/

## Thirdparties

- [pigeon-maps](https://pigeon-maps.js.org/)
  - Provide the map view
- [openweathermap](https://openweathermap.org/)
  - Provide the weather data and weather status icons
- [locationiq](https://locationiq.com/)
  - Provide user location by using IP in case geolocation API is not available or blocked by the browser
- [material-ui](https://material-ui.com/)
  - Provide UI components to accelerate the development process
- [bootstrap](https://getbootstrap.com/)
  - Provide css helper classes and some utilities
- [moment](https://momentjs.com/)
  - Used to manage and display dates and times
- [underscore](https://underscorejs.org/)
  - Used to manage manipulate arraies

## Available Scripts

In the project directory, you can run:

### `yarn start`

#### Runs the app in the development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

#### Builds the app for production to the `build` folder.<br />

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
