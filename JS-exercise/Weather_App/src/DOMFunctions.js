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

let data = await apiFunctions.getCoords(url(input.value));
console.log(data)
currentTemp()

//basic url for search. set for a city if local geolocation is off
function url(value) {
    value = value == undefined ? "Aci Castello" : value == "" ? "Aci Castello" : value;
    return `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=f01e320c417dd9583e7ed5e57fb13e71`;
}

//fetch a new set of data given the search value and populate the screen
async function search(value) {
    data = await apiFunctions.getCoords(url(value));
    console.log(data)
    currentTemp();
}

///populate the screen with information
function currentTemp() {
    city.textContent = data[0]
    country.textContent = `(${data[1]})`
    flag.src = 'https://flagcdn.com/w20/' + data[1].toLowerCase() + '.png';
    temp.textContent = (data[2].current.temp - 273.15).toFixed(1) + '°';
    description1.textContent = data[2].current.weather[0].main;
    description2.textContent = data[2].current.weather[0].description;
    icon.src = 'http://openweathermap.org/img/wn/' + data[2].current.weather[0].icon + '@2x.png'
    getTime();
}

//get time for the area selected
function getTime() {
    let timer = new Date()
    time.textContent = timer.toLocaleString("en-GB", { timeZone: data[2].timezone });
    setTimeout(getTime, 1000);
}



export { search }