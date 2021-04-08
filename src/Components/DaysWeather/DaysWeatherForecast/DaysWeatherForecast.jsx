import React, { useEffect, useState } from "react"
import ShowDaysWeather from "../ShowDaysWeather/ShowDaysWeather"
import "./DaysWeatherForecastStyle.scss"

const DaysWeatherForecast = (props) => {

    const { daysWeather, handleWeatherIcon } = props
    const [daysWeatherData, setDaysWeatherData] = useState([])
    var hourly = []
    var temp = [
        {
            dayName: "",
            max_temp: 0,
            min_temp: 0,
            icon: "",
            humidity: 0
        },
        {
            dayName: "",
            max_temp: 0,
            min_temp: 0,
            icon: "",
            humidity: 0
        },
        {
            dayName: "",
            max_temp: 0,
            min_temp: 0,
            icon: "",
            humidity: 0
        },
        {
            dayName: "",
            max_temp: 0,
            min_temp: 0,
            icon: "",
            humidity: 0
        },
        {
            dayName: "",
            max_temp: 0,
            min_temp: 0,
            icon: "",
            humidity: 0
        },
    ]

    useEffect(() => {
        prepareDays()
    }, [daysWeather])

    //create list of days 
    const prepareDays = () => {
        try {
            var date = parseInt(daysWeather.data.list[0].dt_txt.slice(8, 10)) + 1
            for (var j = 0; j < 5; j++) {
                for (var i = 0; i < 40; i++) {
                    if (date == parseInt(daysWeather.data.list[i].dt_txt.slice(8, 10))) {
                        hourly.push(daysWeather.data.list[i])
                    }
                }
                prepareTemp(j)
                date++
                hourly = []
            }
            if (temp[4].humidity == 0)
                temp.pop() //there is one problem so it fix in here
            setDaysWeatherData(temp)
            startAnimation()
        }
        catch (error) {
        }
    }

    //find min temp and max temp and icon and 
    const prepareTemp = (j) => {
        try {
            var min = hourly[0].main.temp_min
            var max = hourly[0].main.temp_min, icon = ""
            var humidity = 0
            for (var i = 0; i < hourly.length; i++) {
                if (min > hourly[i].main.temp_min)
                    min = hourly[i].main.temp_min
                if (max < hourly[i].main.temp_max)
                    max = hourly[i].main.temp_max
                if (humidity < hourly[i].main.humidity) {
                    humidity = hourly[i].main.humidity
                    icon = hourly[i].weather[0].icon
                }
            }
            temp[j].min_temp = min
            temp[j].max_temp = max
            temp[j].icon = icon
            temp[j].humidity = humidity
            dayName(hourly[0].dt_txt.slice(0, 10), j)
            min = hourly[0].main.temp_min
            max = hourly[0].main.temp_min
            icon = ""
            humidity = 0
        }
        catch (error) {
        }
    }

    //find day name
    const dayName = (date, j) => {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(date);
        var check = new Date().getDate()
        switch (check) {
            case 26:
                temp.pop()
            case 27:
                temp.pop()
                temp.pop()
            case 28:
                for(var i = 0 ; i<3 ; i++)
                    temp.pop()
            case 29:
                for(var i = 0 ; i<5 ; i++)
                    temp.pop()
            case 30:
                for(var i = 0 ; i<5 ; i++)
                    temp.pop()
            case 31:
                for(var i = 0 ; i<5 ; i++)
                    temp.pop()
        }
        var dayName = days[d.getDay()];
        temp[j].dayName = dayName
    }

    const startAnimation = () => {
        document.getElementById("days-weather-forecast").className = "days-weather-forecast days-weather-animation-left"
    }

    return (
        <div className="days-weather-forecast" id="days-weather-forecast">
            {daysWeatherData.map(item => <ShowDaysWeather temp={item} handleWeatherIcon={handleWeatherIcon} />)}
        </div>
    )
}

export default DaysWeatherForecast