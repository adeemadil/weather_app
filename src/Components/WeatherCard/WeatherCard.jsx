import React, { useState } from 'react';
import "./styles/WeatherCard.css";

const WeatherCard = ({ day, temperature, description, windSpeed, humidity, pressure }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? 'is-flipped' : ''}`} onMouseEnter={flipCard} onMouseLeave={flipCard}>
      <div className="card-front">
        <h3>{day}</h3>
        <p>Temperature: {temperature}°C</p>
        <p>Description: {description}</p>
      </div>
      <div className="card-back">
        <p>Wind Speed: {windSpeed} m/s</p>
        <p>Humidity: {humidity}%</p>
        <p>Pressure: {pressure} hPa</p>
      </div>
    </div>
  );
};

export default WeatherCard;
