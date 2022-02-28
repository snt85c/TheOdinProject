class weatherData {
    constructor(data) {
        this.data = data
    }

    consolelog() {
        console.log(this.data)
    }

    getName() {
        return this.data.name
    }

    getCountry() {
        return this.data.country;
    }

    getIcon() {
        return this.data.weatherData.current.weather[0].icon
    }

    getData() {
        return this.data.weatherData
    }

    getCurrentTemp() {
        return this.data.weatherData.current.temp
    }

    getDescription1() {
        return this.data.weatherData.current.weather[0].main;
    }

    getDescription2() {
        return this.data.weatherData.current.weather[0].description
    }

    getFeelsLike() {
        return this.data.weatherData.current.feels_like
    }

    getHumidity() {
        return this.data.weatherData.current.humidity
    }

    getProbabilityOfRain() {
        return this.data.weatherData.hourly[0].pop
    }

    getWindSpeed() {
        return this.data.weatherData.current.wind_speed
    }

    getTimezone() {
        return this.data.timezone
    }

    getWeeklyDescr(i) {
        return this.data.weatherData.daily[i].weather[0].main
    }

    getWeeklyTemp(i) {
        return this.data.weatherData.daily[i].temp.day
    }

    getWeeklyTempMin(i) {
        return this.data.weatherData.daily[i].temp.min
    }

    getWeeklyIcon(i) {
        return this.data.weatherData.daily[i].weather[0].icon
    }

}

export { weatherData }