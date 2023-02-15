import React, { useState, useEffect } from "react";
import axios from "axios";

import WeatherWidget from "./Components/WeatherWidget/WeatherWidget";

import "./App.css";

const API_URL =
  "https://api.openweathermap.org/data/2.5/onecall?lat=33.6844&lon=73.0479&exclude=minutely,hourly,alerts&units=metric&appid=d0b1e41aff3a154c86614b69e60faa39";

function App() {
  const [weatherData, setWeatherData] = useState([{}, {}, {}, {}, {}]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          const dailyTemp = res.data.daily;

          let weatherDataTemp = [];
          let minDays = Math.min(5, dailyTemp.length);
          for (let i = 0; i < minDays; i++) {
            let daily = dailyTemp[i];

            weatherDataTemp.push({
              date: new Date(daily["dt"] * 1000),
              max: Math.round(daily["temp"]["max"]),
              min: Math.round(daily["temp"]["min"]),
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
      <div id="weatherContainer">
        {weatherData.map((data, i) => (
          <WeatherWidget
            key={`weather_${i}`}
            {...data}
            isLoading={Object.keys(data).length === 0}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
