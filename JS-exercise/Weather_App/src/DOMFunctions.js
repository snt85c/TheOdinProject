import * as apiFunctions from "./APIFunctions"
import { weatherData } from "../dist/weatherData"

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

let data

//basic url for search. set for "london" if geolocation is off
function url(inputValue) {
    inputValue = inputValue == false ? "london" : inputValue;
    return `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=f01e320c417dd9583e7ed5e57fb13e71`;
}

//fetch a new set of data given the search value and populate the screen
async function search(inputValue) {
    data = new weatherData(await apiFunctions.getCoords(url(inputValue)));
    data.consolelog()
    currentTemp();
    input.value = "";
}

///populate the screen with information
function currentTemp() {
    try {
        city.textContent = data.getName()
        country.textContent = `(${data.getCountry()})`
        flag.src = `https://flagcdn.com/w20/${data.getCountry().toLowerCase()}.png`;
        temp.textContent = (data.getCurrentTemp() - 273.15).toFixed(1) + '°C';
        description1.textContent = data.getDescription1();
        description2.textContent = data.getDescription2();
        icon.src = `https://openweathermap.org/img/wn/${data.getIcon()}@4x.png`
        getTime();
        feelsLike.textContent = (data.getFeelsLike() - 273.15).toFixed(1) + '°C';
        humidity.textContent = data.getHumidity() + "%"
        pop.textContent = data.getProbabilityOfRain() + "%"
        windSpeed.textContent = data.getWindSpeed() + "km/h"
        dailyTemp()
        console.log(`${temp.textContent} updated page for ${city.textContent} at ${new Date()}`)
    } catch (e) {
        city.textContent = country.textContent = flag.src = "";
        description1.textContent = "Ooops! Something went wrong!"
        description1.style.fontWeight = "bolder"
        document.getElementById("right").style.display = "none"
        document.getElementById("submit").style.display = "none"
        console.log(e)
    }
}

function dailyTemp() {
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = new Date().getDay() + 1;
    for (let i = 0; i < weekDaysDiv.length; i++) {

        if (day > 6) day = 0;
        let weekday = document.createElement("div");
        weekday.setAttribute("id", "weekday");
        weekday.textContent = DAYS[day];
        day++

        let descr = document.createElement("div")
        descr.setAttribute("id", "descrBottom");
        descr.textContent = data.getWeeklyDescr(i);

        let temp = document.createElement("div");
        temp.setAttribute("id", "tempBottom")
        temp.textContent = (data.getWeeklyTemp(i) - 273.15).toFixed(1) + '°C';

        let minTemp = document.createElement("div");
        minTemp.setAttribute("id", "minTempBottom");
        minTemp.textContent = (data.getWeeklyTempMin(i) - 273.15).toFixed(1) + '°C';

        let icon = document.createElement("img")
        icon.src = `http://openweathermap.org/img/wn/${data.getWeeklyIcon(i)}@4x.png`
        icon.setAttribute("id", "iconWeek")

        weekDaysDiv[i].appendChild(weekday)
        weekDaysDiv[i].appendChild(descr)
        weekDaysDiv[i].appendChild(temp)
        weekDaysDiv[i].appendChild(minTemp)
        weekDaysDiv[i].appendChild(icon)
    }
}

//get time for the area selected
function getTime() {
    let timer = new Date()
    time.textContent = timer.toLocaleTimeString("en-GB", { timeZone: data.getTimezone() });
    setTimeout(getTime, 1000);
}

export { search }