import React, { useState, useEffect } from "react";
import axios from "axios";

import WeatherWidget from "./Components/WeatherWidget/WeatherWidget";

import "./App.css";

const lat = 33.6844;
const lon = 73.0479;

const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

function App() {
  const [weatherData, setWeatherData] = useState([{}, {}, {}, {}, {}]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <section>Map</section>
      <section>Search</section>
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
