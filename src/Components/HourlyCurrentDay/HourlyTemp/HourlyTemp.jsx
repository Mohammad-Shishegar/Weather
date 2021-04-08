import React, { useState, useEffect } from "react"
import ShowHourlyTemp from "../ShowHourlyTemp/ShowHourlyTemp"
import "./HourlyTempStyle.scss"

const HourlyTemp = (props) => {

    const { currentTime, daysWeather, handleWeatherIcon } = props
    const [temperatures, setTemperatures] = useState([])
    
    useEffect(() => {
        prepareTemperature()
    }, [daysWeather])
    
    const prepareTemperature = () => {
        setTemperatures([])
        var array = []
        try {
            var date = currentTime.data.date
            for (var i=0; i < 5; i++) {
                if (date == daysWeather.data.list[i].dt_txt.slice(0, 10)) {
                    array.push(daysWeather.data.list[i])
                }
            }
            startAnimation()
        }
        catch (error) {
        }
        setTemperatures(array)
    }

    const startAnimation = () => {
        document.getElementById("hourly-temp").className = "hourly-temp hourly-animation-right"
    }
    
    return (
        <div className="hourly-temp" id="hourly-temp">
            {temperatures.map(item => <ShowHourlyTemp temp = {item} handleWeatherIcon= {handleWeatherIcon}/>)}
        </div>
    )
}

export default HourlyTemp