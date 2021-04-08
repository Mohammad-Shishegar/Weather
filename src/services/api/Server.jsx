import axios from "axios"

URL = "https://api.openweathermap.org/data/2.5"

export async function getCurrentWeather(city) {
    try {
        const response = await axios.get(`${URL}/weather?q=${city}&appid=ce620025d33734fd3417ec6e04fbc691`)
        return response
    }
    catch (error) {
        return "Not Found"
    }
}

export async function getDaysWeather(city) {
    try {
        const response = await axios.get(`${URL}/forecast?q=${city}&mode=json&appid=ce620025d33734fd3417ec6e04fbc691`)
        return response
    }
    catch (error) {
        return "Not Found"
    }
}

export async function getCurrentTime(city) {
    try {
        const response = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=7e6e10aaf571468c96dc467e87736cfa&location=${city}`)
        return response
    }
    catch (error) {
        return "Not Found"
    }
}