import * as apiFunctions from "./APIFunctions"

const input = document.getElementById("input")
const city = document.getElementById("city")
const flag = document.getElementById("flag")
const country = document.getElementById("country")
const temp = document.getElementById("temperature")
const description1 = document.getElementById("description1")
const description2 = document.getElementById("description2")
const icon = document.getElementById("icon")
const time = document.getElementById("time")
const feelsLike = document.getElementById("feelsLike")
const humidity = document.getElementById("humidity")
const pop = document.getElementById("chanceOfPrecipitation")
const windSpeed = document.getElementById("windSpeed")
const weekDaysDiv = document.querySelectorAll("#weekday")

let data = ""

//basic url for search. set for "london" if geolocation is off
function url(value) {
    value = value == false ? "london" : value;
    return `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=f01e320c417dd9583e7ed5e57fb13e71`;
}

//fetch a new set of data given the search value and populate the screen
async function search(value) {
    data = await apiFunctions.getCoords(url(value));
    currentTemp();
    input.value = "";
}

///populate the screen with information
function currentTemp() {
    city.textContent = data[0]
    country.textContent = `(${data[1]})`
    flag.src = `https://flagcdn.com/w20/${data[1].toLowerCase()}.png`;
    temp.textContent = (data[2].current.temp - 273.15).toFixed(1) + '°C';
    description1.textContent = data[2].current.weather[0].main;
    description2.textContent = data[2].current.weather[0].description;
    icon.src = `http://openweathermap.org/img/wn/${data[2].current.weather[0].icon}@4x.png`
    getTime();
    feelsLike.textContent = (data[2].current.feels_like - 273.15).toFixed(1) + '°C';
    humidity.textContent = data[2].current.humidity + "%"
    pop.textContent = data[2].hourly[0].pop + "%"
    windSpeed.textContent = data[2].current.wind_speed + "km/h"
    dailyTemp()
    console.log(`${temp.textContent} updated page for ${city.textContent} at ${new Date()}`)
}

function dailyTemp() {
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = new Date().getDay();
    for (let i = 0; i < weekDaysDiv.length; i++) {
        if (day > 6) day = 0;
        weekDaysDiv[i].textContent = DAYS[day]
        day++

        let descr = document.createElement("div")
        descr.setAttribute("id", "descrBottom");
        descr.textContent = data[2].daily[i].weather[0].main;

        let temp = document.createElement("div");
        temp.setAttribute("id", "tempBottom")
        temp.textContent = (data[2].daily[i].temp.day - 273.15).toFixed(1) + '°C';

        let minTemp = document.createElement("div");
        minTemp.setAttribute("id", "minTempBottom");
        minTemp.textContent = (data[2].daily[i].temp.min - 273.15).toFixed(1) + '°C';

        let icon = document.createElement("img")
        icon.src = `http://openweathermap.org/img/wn/${data[2].daily[i].weather[0].icon}@4x.png`
        icon.setAttribute("id", "iconWeek")

        weekDaysDiv[i].appendChild(descr)
        weekDaysDiv[i].appendChild(temp)
        weekDaysDiv[i].appendChild(minTemp)
        weekDaysDiv[i].appendChild(icon)
    }
}

//get time for the area selected
function getTime() {
    let timer = new Date()
    time.textContent = timer.toLocaleTimeString("en-GB", { timeZone: data[2].timezone });
    setTimeout(getTime, 1000);
}

export { search }