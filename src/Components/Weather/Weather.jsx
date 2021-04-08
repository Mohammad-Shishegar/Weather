import React, { Component } from 'react'
import HourlyTemp from '../HourlyCurrentDay/HourlyTemp/HourlyTemp'
import {
  WiDayThunderstorm, WiDaySunny, WiNightClear, WiCloud, WiCloudy, WiRain,
  WiNightThunderstorm, WiLightning
} from "react-icons/wi"
import { IoIosSnow } from "react-icons/io"
import { RiMistFill } from "react-icons/ri"
import { getCurrentTime, getCurrentWeather, getDaysWeather } from "../../services/api/Server"
import "./WeatherStyle.scss"
import DaysWeatherForecast from '../DaysWeather/DaysWeatherForecast/DaysWeatherForecast'


export default class Weather extends Component {

  state = {
    cityName: "",
    temp: "",
    icon: "",
    minTemp: "",
    maxTemp: "",
    time: "",
    main: "",
    humidity: "",
    description: "",
    error: "",
    data_CityName: "",
  }

  currentWeather = {}
  daysWeather = {}
  currentTime = {}

  //get weather data and time from server "https://openweathermap.org/" and "https://ipgeolocation.io/timezone-api.html"
  getData = async () => {
    var { cityName } = this.state
    this.currentWeather = await getCurrentWeather(cityName)
    if (this.currentWeather !== "Not Found") {
      this.setState({ error: false })
      this.daysWeather = await getDaysWeather(cityName)
      this.currentTime = await getCurrentTime(cityName)
      this.matchState()
      this.changeBackground()
      this.startAnimation()
    }
    else
      this.setState({ error: true })
  }

  kelvinToCelsius = (temperature) => {
    return Math.floor(temperature - 273.15)
  }

  //match state with data that come from server
  matchState = () => {
    this.setState({
      temp: this.kelvinToCelsius(this.currentWeather.data.main.temp),
      icon: this.currentWeather.data.weather[0].icon,
      minTemp: this.kelvinToCelsius(this.currentWeather.data.main.temp_min),
      maxTemp: this.kelvinToCelsius(this.currentWeather.data.main.temp_max),
      time: this.currentTime.data.time_24,
      main: this.currentWeather.data.weather[0].main,
      humidity: this.currentWeather.data.main.humidity,
      description: this.currentWeather.data.weather[0].description,
      data_CityName: this.currentWeather.data.name
    })
  }

  handleWeatherIcon = (code, className) => {
    if (code === "01d")
      return <WiDaySunny className={className} />
    else if (code === "01n")
      return <WiNightClear className={className} />
    else if (code === "02d" || code === "02n" || code === "03d" || code === "03n")
      return <WiCloud className={className} />
    else if (code === "04d" || code === "04n")
      return <WiCloudy className={className} />
    else if (code === "09d" || code === "09n" || code === "10d" || code === "10n")
      return <WiRain className={className} />
    else if (code === "11d" || code === "11n")
      return <WiLightning className={className} />
    else if (code === "13d" || code === "13n")
      return <IoIosSnow className={className} />
    else if (code === "50d" || code === "50n")
      return <RiMistFill className={className} />
  }


  changeBackground = () => {
    var string = this.state.icon.slice(2)
    document.getElementById("hourly-days-weather").style.display = "flex"
    if (string == "n") {
      document.getElementById("body").className = "body night"
      document.getElementById("hourly-days-weather").className = "hourly-days-weather night"
    }
    else if (string == "d") {
      document.getElementById("body").className = "body day"
      document.getElementById("hourly-days-weather").className = "hourly-days-weather day"
    }
  }

  //start animation when data load
  startAnimation = () => {
    document.getElementById("current-temp").className = "current-temp animationRight"
    document.getElementById("degree").style.display = "inline"
    document.getElementById("current-information").className = "current-information animationLeft"
    document.getElementById("min-max-temp").style.display = "flex"
    document.getElementById("main").style.display = "flex"
  }


  render() {
    return (
      <div className="body default" id="body">
        {/* header */}
        <header className="header">
          <div className="header-input">
            <input
              className="input"
              placeholder="enter city name:"
              onChange={(text) => { this.setState({ cityName: text.target.value }) }}
            />
            {(this.state.error !== true) ? null : (<p>Invalid city name</p>)}
            <button className="search-btn" onClick={() => { this.getData() }}>Search</button>
          </div>
          {(this.state.error !== true) ? null : (<p>Invalid city name</p>)}
        </header>
        {/* current weather */}
        <div className="current-weather">
          <div className="current-temp" id="current-temp">
            {this.handleWeatherIcon(this.state.icon, "current-temp-icon")}
            <p className="temp" id="degree">{this.state.temp}&deg;</p>
            <p className="status">{this.state.description}</p>
          </div>
          <div className="current-information" id="current-information">
            <div className="current-time">
              <p>{this.state.data_CityName}</p>
              <p>{this.state.time}</p>
            </div>
            <div className="min-max-temp" id="min-max-temp">
              <p>Min temperature : {this.state.minTemp}&deg;</p>
              <p>Max temperature : {this.state.maxTemp}&deg;</p>
            </div>
            <div className="main" id="main">
              <p>Main : {this.state.main}</p>
              <p>Humidity : {this.state.humidity}%</p>
            </div>
          </div>
        </div>
        {/*hourly and  5 days weather */}
        <div className="hourly-days-weather default" id="hourly-days-weather">
          {/* hourly weather */}
          <div className="hourly-weather">
            <HourlyTemp
              daysWeather={this.daysWeather}
              handleWeatherIcon={this.handleWeatherIcon}
              currentTime={this.currentTime}
            />
          </div>
          {/* days-weather */}
          <div className="days-weather">
            <DaysWeatherForecast
              handleWeatherIcon={this.handleWeatherIcon}
              daysWeather={this.daysWeather} />
          </div>
        </div>
      </div>
    )
  }
}