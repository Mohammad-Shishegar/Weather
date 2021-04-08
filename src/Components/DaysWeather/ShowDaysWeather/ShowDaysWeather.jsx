import React, { } from "react"
import { WiHumidity, WiDirectionUp, WiDirectionDown } from "react-icons/wi"
import {FaLongArrowAltUp , FaLongArrowAltDown} from "react-icons/fa"
import "./ShowDaysWeatherStyle.scss"

const ShowDaysWeather = (props) => {

    const { handleWeatherIcon, temp } = props

    const kelvinToCelsius = (temperature) => {
        return Math.floor(temperature - 273.15)
    }

    return (
        <div className="show-days-weather">
            <p>{temp.dayName}</p>
            {handleWeatherIcon(temp.icon, "days-icon")}
            <div className="day-humidity">
                <p className="day-humidity">{temp.humidity}</p>
                <WiHumidity className="humidity-icon" />
            </div>
            <div className="days-min-max-temp">
                <div className="days-max-temp">
                    <FaLongArrowAltUp className="icon"/>
                    <p>{kelvinToCelsius(temp.max_temp)}&deg;</p>
                </div>
                <div className="days-min-temp">
                    <FaLongArrowAltDown className="icon"/>
                    <p>{kelvinToCelsius(temp.min_temp)}&deg;</p>
                </div>
            </div>
        </div>
    )
}

export default ShowDaysWeather