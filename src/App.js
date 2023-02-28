import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import WeatherMap from "./Components/WeatherMap/WeatherMap";
import WeatherWidget from "./Components/WeatherWidget/WeatherWidget";

import "./App.css";

//Islamabad Coordinates

function App() {
  const [weatherData, setWeatherData] = useState([{}, {}, {}, {}, {}]);
  const [location, setLocations] = useState({ lat: 33.6844, lon: 73.0479 });

  const locationChangeHandler = (lat, lon) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    axios
      .get(API_URL)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          const dailyTemp = res.data.daily;

          let weatherDataTemp = [];
          let minDays = Math.min(5, dailyTemp.length);
          for (let i = 0; i < minDays; i++) {
            let daily = dailyTemp[i];

            weatherDataTemp.push({
              date: new Date(daily["dt"] * 1000),
              max: Math.round(daily["temp"]["max"]),
              min: Math.round(daily["temp"]["min"]),
              description: daily["weather"][0]["description"],
              windSpeed: daily["wind_speed"],
              humidity: daily["humidity"],
              pressure: daily["pressure"],
              icon: daily["weather"][0]["icon"],
            });
          }

          console.log(weatherDataTemp);

          setWeatherData(weatherDataTemp);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Some Error Occurred!");
      });
  };

  useEffect(() => {
    locationChangeHandler(location.lat, location.lon);
  }, [location]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="map-container">
        <section>
          <WeatherMap
            location={location}
            setLocations={setLocations}
          />
        </section>
      </div>
      <div className="weather-cards-container">
        <div id="weatherContainer">
          {weatherData.map((data, i) => (
            <WeatherWidget
              key={`weather_${i}`}
              id={`weather_widget_${i}`}
              {...data}
              isLoading={Object.keys(data).length === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
