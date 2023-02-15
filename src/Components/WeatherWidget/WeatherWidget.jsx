import React, { useState } from "react";

import Loader from "../../assets/imgs/loader.gif";

import "./styles/weatherWidget.css";

const WEEKDAY_LITERAL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function WeatherWidget({
  date,
  max,
  min,
  icon,
  isLoading,
  description,
  windSpeed,
  humidity,
  pressure,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={!isLoading ? "weather_widget" : "weather_widget is_loading"}
    >
      {isLoading ? (
        <img src={Loader} alt="Loading..." />
      ) : (
        <div>
          <div
            className={`card ${isFlipped ? "is-flipped" : ""}`}
            // onMouseEnter={flipCard}
            // onMouseLeave={flipCard}
            onClick={flipCard}
          >
            <div
              className="card-front"
              style={{ display: `${isFlipped ? "none" : ""}` }}
            >
              <div className="weekday">{WEEKDAY_LITERAL[date.getDay()]}</div>
              <img
                className="weather_icon"
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="Icon"
              />
              <div className="description">{description}</div>
              <div className="temp">
                <div>{`${max}°`}</div>
                <div>{`${min}°`}</div>
              </div>
            </div>
            <div
              className="card-back"
              style={{ display: `${isFlipped ? "" : "none"}` }}
            >
              <p className="description">Wind Speed: {windSpeed} m/s</p>
              <p className="description">Humidity: {humidity}%</p>
              <p className="description">Pressure: {pressure} hPa</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
