import * as DomFunctions from "./DOMFunctions"

async function geolocation() {
    const promise = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    let lat = promise.coords.latitude;
    let lon = promise.coords.longitude
    const data = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=f01e320c417dd9583e7ed5e57fb13e71`, { mode: "cors" })
    const geolocation = await data.json()
    DomFunctions.search(geolocation[0].name)
    return geolocation[0].name
}

//gets JSON data from operweathermap, 
//the first is the geolocation API which feeds information on the timezone and latitude
//the second is OneCallAPI which gives us current weather as well as more data(needs lat and lon from geolocation API) 
async function getCoords(url) {
    const response1 = await fetch(url, { mode: "cors" });
    const geoData = await response1.json();

    const name = geoData[0].name;
    const country = geoData[0].country;
    const lat = geoData[0].lat
    const lon = geoData[0].lon

    const response2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=standard&exclude=minutely&appid=f01e320c417dd9583e7ed5e57fb13e71`, { mode: "cors" })
    const weatherData = await response2.json();

    return [name, country, weatherData];
}


export { getCoords, geolocation }