import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { icons } from '../utils/WeatherIcons'
import { days } from '../utils/days-sk'

const location = process.env.REACT_APP_LOCATION || 'Bratislava'

export default function Weather() {
    return (
        <div>
            <ActualWeather />
            <WeatherForecast />
        </div>
    )
}

function ActualWeather() {
    const [weatherObject, setWeatherObject] = useState(null)
    const refreshRate = 180

    useEffect(() => {
        //funkcia na ziskanie aktualnych dat o pocasi z API
        const fetchActualWeather = () => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_APIKEY}&units=metric&lang=sk`).then(weather => {
                setWeatherObject(weather.data)
            }, (error) => {
                console.log(error)
                setWeatherObject(null)
            })
        }

        //zavola sa kazdych x sekund
        let actualWeatherInterval = setInterval(() => {
            fetchActualWeather()
        }, refreshRate * (1000))

        //zavolam metodu
        fetchActualWeather()

        return () => clearInterval(actualWeatherInterval)
    }, []) //prazdny array, useEffect sa vykona len raz

    return (
        weatherObject ? //ak je fetchnute pocasie
            <div className="actualWeather">
                <div className="icon-temperature">
                    <span className="weatherIcon">
                        {icons[weatherObject.weather[0].icon]}
                    </span>
                    <div className="temp">
                        <div>
                            <span className="actualTemperature">
                                {`${weatherObject.main.temp.toFixed(1)}`}
                            </span>
                            <span className="celsius">°C</span>
                        </div>
                        <span className="feelsLike">Pocitovo: <b>{weatherObject.main.feels_like.toFixed(1)} °C</b></span>
                    </div>
                </div>
                <span className="actualLocation">{`${weatherObject.name}, ${weatherObject.sys.country}`}</span>
                <span className="actualDescription">{weatherObject.weather[0].description}</span>
            </div>
            : //ak nie je
            <></>
    )
}

function WeatherForecast() {
    const [forecastObject, setForecastObject] = useState(null)
    const refreshRate = 60
    const lon = 19.3833
    const lat = 49.4667

    useEffect(() => {
        const fetchForecast = () => {
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_APIKEY}&units=metric`).then(forecast => {
                //odstranim dnesny den    
                forecast.data.daily.shift()
                setForecastObject(forecast.data)
            }, (error) => {
                console.log(error)
                setForecastObject(null)
            })
        }

        let forecastInterval = setInterval(() => {
            fetchForecast()
        }, refreshRate * (1000))

        fetchForecast()

        return () => clearInterval(forecastInterval)
    }, [])

    return (
        forecastObject ?
            <div className="forecast">
                <h2>Predpoveď počasia na 7 dní</h2>
                <span className="forecastHeader">
                    <span>Deň</span>
                    <span></span>
                    <span>Min</span>
                    <span>Max</span>
                </span>
                <div className="forecastContainer">
                    {forecastObject.daily.map(forecastRow =>
                        <div className="forecastRow" key={forecastRow.dt}>
                            <span className="forecastDay">{days[new Date(forecastRow.dt * 1000).getDay()]}</span>
                            <span className="forecastIcon">{icons[forecastRow.weather[0].icon]}</span>
                            <span className="forecastMin">{forecastRow.temp.min.toFixed(1)} °C</span>
                            <span className="forecastMax">{forecastRow.temp.max.toFixed(1)} °C</span>
                        </div>
                    )}
                </div>
            </div> :
            <></>
    )
}

