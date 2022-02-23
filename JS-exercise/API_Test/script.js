const img = document.getElementById('img')
const weather = document.getElementById('showWeather')

async function getGif(key) { //async/await test// .catch is defined in index.html when calling the method
    document.getElementById("textGif").value = "";
    key = key == undefined ? "cats" : key == "" ? "cats" : key;
    try {
        const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=wJncfuRqT72B3z1QXtUwozPyGHRQ1YHG&s=' + key, {
            mode: "cors"
        });

        const dataJSON = await response.json();
        img.src = dataJSON.data.images.original.url;
    } catch (error) {
        console.log(error)
    }
}

function getWeather(key) { //promises test
    document.getElementById("textWeather").value = "";
    key = key == undefined ? "london" : key == "" ? "london" : key;

    fetch("http://api.openweathermap.org/data/2.5/find?q=" + key + "&appid=f01e320c417dd9583e7ed5e57fb13e71", {
        mode: "cors"
    }).then((response) => {
        return response.json();
    }).then((response) => {
        weather.textContent = "City: " + response.list[0].name + "  - Description:" + response.list[0].weather[0].description
        getGif(response.list[0].name);
    }).catch((error) => {
        console.log(error);
    })
}