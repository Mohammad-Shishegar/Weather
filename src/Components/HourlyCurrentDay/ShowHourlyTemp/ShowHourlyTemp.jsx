import { WiHumidity } from "react-icons/wi"
import "./ShowHourlyTempStyle.scss"

const ShowHourlyTemp = (props) => {
    const { temp, handleWeatherIcon } = props
    const kelvinToCelsius = (temperature) => {
        return Math.floor(temperature - 273.15)
    }
    return (
        <div className="show-temp">
            <p>{kelvinToCelsius(temp.main.temp)}&deg;</p>
            {handleWeatherIcon(temp.weather[0].icon, "hourly-temp-icon")}
            <div className="humidity">
                <p className="humidity">{temp.main.humidity}</p>
                <WiHumidity className="humidity-icon" />
            </div>
            <p>{temp.dt_txt.slice(11, 19)}</p>
        </div>
    )
}

export default ShowHourlyTemp