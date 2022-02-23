const img = document.getElementById('img')
const weather = document.getElementById('showWeather')

function getGif(key) {
    document.getElementById("textGif").value = "";
    key = key == undefined ? "cats" : key == "" ? "cats" : key;
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=wJncfuRqT72B3z1QXtUwozPyGHRQ1YHG&s=' + key, {
        mode: "cors"
    }).then((response) => {
        return response.json()
    }).then((response) => {
        img.src = response.data.images.original.url
    }).catch((error) => {
        console.log(error)
    })
}

function getWeather(key) {
    document.getElementById("textWeather").value = "";
    key = key == undefined ? "london" : key == "" ? "london" : key;
    fetch("http://api.openweathermap.org/data/2.5/find?q=" + key + "&appid=f01e320c417dd9583e7ed5e57fb13e71", {
        mode: "cors"
    }).then((response) => {
        return response.json()
    }).then((response) => {
        weather.textContent = "City: " + response.list[0].name + "  - Description:" + response.list[0].weather[0].description
        getGif(response.list[0].name);
    }).catch((error) => {
        console.log(error)
    })
}