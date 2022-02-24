//ONECALL API
//https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&units=standard&exclude=minutely&appid=f01e320c417dd9583e7ed5e57fb13e71

//GEOCODING API
//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=f01e320c417dd9583e7ed5e57fb13e71

//GET THE ICON FOR THE WEATHER
//'http://openweathermap.org/img/wn/' + 10d + '@2x.png'

//GET A FLAG
//https://flagcdn.com/16x12/za.png

const APIKEY = 'f01e320c417dd9583e7ed5e57fb13e71'

const input = document.getElementById("input")
const city = document.getElementById("city")
const flag = document.getElementById("flag")
const country = document.getElementById("country")
const temp = document.getElementById("temperature")
const description1 = document.getElementById("description1")
const description2 = document.getElementById("description2")
const icon = document.getElementById("icon")


function geolocation() {
    const getUserGeolocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    getUserGeolocation()
        .then((position) => {
            let lat = position.coords.latitude
            let lon = position.coords.longitude

            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIKEY}`, { mode: "cors" }).then((response) => { return response.json() })
                .then((response) => {
                    city.textContent = response[0].name;
                    country.textContent = `(${response[0].country})`
                    flag.src = 'https://flagcdn.com/w20/' + response[0].country.toLowerCase() + '.png';
                }).catch((error) => console.log(error))
            onecallAPI(lat, lon)
        })
        .catch((err) => { console.log(err.message) });

}

function search() {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=5&appid=${APIKEY}`, { mode: "cors" })
        .then((response) => { return response.json() })
        .then((response) => {
            city.textContent = response[0].name;
            country.textContent = `(${response[0].country})`
            flag.src = 'https://flagcdn.com/w20/' + response[0].country.toLowerCase() + '.png';
            onecallAPI(response[0].lat, response[0].lon);
        })
        .catch((error) => { console.log(error) })

}

function onecallAPI(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=standard&exclude=minutely&appid=${APIKEY}`, { mode: "cors" })
        .then((response) => { return response.json() })
        .then((response) => {
            temp.textContent = (response.current.temp - 273.15).toFixed(1) + '°';
            description1.textContent = response.current.weather[0].main;
            description2.textContent = response.current.weather[0].description;
            icon.src = 'http://openweathermap.org/img/wn/' + response.current.weather[0].icon + '@2x.png'
            input.value = "";
        })
        .catch((error) => { console.log(error) })
}