const form = document.querySelector('form')
const input = document.querySelector('input')

const key = '0769b40458fa1a591e60df90958579d0'

function promtValue () {
    let value = prompt('введи город на английском')
    const cityname = value
    return cityname
}

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    cityname = promtValue()
    console.log(prompt)
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=metric&lang=ru&appid=${key}`

    fetch(url)
        .then(function (response) { return response.json() })
        .then(function (data) {
            render(data)
        })
        .catch(function () {
            'ошибка'
        })
})


function currentCity(data) {
    const cityAdd = document.querySelector(".current__city")
    cityAdd.innerHTML = data.city.name
}

function description(data) {
    const description = document.querySelector('.current__description')
    description.innerHTML = data.list[0].weather[0].description
}

function temp(data) {
    let temperatura = document.querySelector('.current__temperature')
    let currentTemp = data.list[0].main.temp
    let conversionToCelsium = (currentTemp).toFixed();
    temperatura.innerHTML = conversionToCelsium + '˚'
}

function addTime(dateTime) {
    let date = new Date(dateTime)
    let hours = date.getHours()
    return hours
}

function Forecast(data) {
    let forecastData = document.querySelector('.forecast')
    let forecast = ''

    for (let i = 0; i < 6; i++) {
        let item = data.list[i]
        let icon = item.weather[0].icon
        let temp = (item.main.temp).toFixed()
        let hours = (i == 0 ? 'сейчас' : addTime(item.dt * 1000))

        let template = `
            <div class="forecast__item">
            <div class="forecast__time">${hours}</div>
            <div class="forecast__icon icon__${icon}"></div>
            <div class="forecast__temperature">${temp + "˚"}</div>
            </div>
        `
        forecast += template;
    }
    forecastData.innerHTML = forecast
}
function convertPressure(value) {
    return (value / 1.33)
}
function renderDetails(className, value) {
    let conteiner = document.querySelector(`.${className}`).querySelector(".details__value")
    conteiner.innerHTML = value;
}
function getDetails(data) {
    let item = data.list[0]
    let felt = item.main.feels_like.toFixed()
    let windSpeed = item.wind.speed.toFixed()
    let humidity = item.main.humidity.toFixed()
    let pressure = convertPressure(item.main.pressure).toFixed()

    renderDetails('wind', windSpeed + ' м/с')
    renderDetails('feelslike', felt + '˚')
    renderDetails("humidity", humidity + ' %')
    renderDetails('pressure', pressure + ' мм. рт. ст.')
}
function render(data) {
    currentCity(data)
    description(data)
    temp(data)
    Forecast(data)
    getDetails(data)
}