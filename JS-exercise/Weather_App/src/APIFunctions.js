const APIKEY = 'f01e320c417dd9583e7ed5e57fb13e71'

// function geolocation() {
//     const getUserGeolocation = () => {
//         return new Promise((resolve, reject) => {
//             navigator.geolocation.getCurrentPosition(resolve, reject);
//         });
//     }

//     getUserGeolocation()
//         .then((position) => {
//             let lat = position.coords.latitude
//             let lon = position.coords.longitude

//             fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIKEY}`, { mode: "cors" })
//                 .then((response) => { return response.json() })
//                 .then((response) => {
//                     console.log(response);
//                     userGeolocation(response)
//                 })
//                 .catch((err) => { console.log(err.message) });
//         }).catch((error) => console.log(error))
// }

//creates the url for OneCallAPI on openweathermap with custom latitude and longitude
function urlOneCall(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=standard&exclude=minutely&appid=${APIKEY}`
}

//gets JSON data from operweathermap, 
//the first is the geolocation API which feeds information on the timezone and latitude
//the second is OneCallAPI which gives us current weather as well as more data(needs lat and lon from geolocation API) 
async function getCoords(url) {
    const response1 = await fetch(url);
    const geoData = await response1.json();

    const name = geoData[0].name;
    const country = geoData[0].country;
    const lat = geoData[0].lat
    const lon = geoData[0].lon

    const response2 = await fetch(urlOneCall(lat, lon))
    const weatherData = await response2.json();

    return [name, country, weatherData];
}


export { getCoords }