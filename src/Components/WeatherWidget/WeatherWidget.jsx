import React from "react"

import Loader from "../../assets/imgs/loader.gif"

import './styles/weatherWidget.css'

const WEEKDAY_LITERAL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function WeatherWidget({date, max, min, icon, isLoading}) {
    return (
        <div className={!isLoading ? "weather_widget" : "weather_widget is_loading"}>
            {
                isLoading ?
                    <img src={Loader} alt="Loading..." />
                :
                    <div>
                        <div className="weekday">{WEEKDAY_LITERAL[date.getDay()]}</div>
                        <img className="weather_icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='Icon' />
                        <div className="temp">
                            <div>{`${max}°`}</div>
                            <div>{`${min}°`}</div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default WeatherWidget