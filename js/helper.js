// ELEMENTS
const section = document.getElementById("app-sec");
const appContianer = document.querySelector(".weather-app");
const app = document.querySelector(".weather");
const form = document.querySelector(".search-location");
const searchInp = document.getElementById("search");
const submitBtn = document.querySelector(".submit");
const cloud = document.querySelector(".cloud");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const cities = document.querySelectorAll(".city");
const msg = document.querySelector(".msg");
const defaultErrorMsg = "No location found";

// weather api
const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=e1a52c16ced44c42a2130208221904&q=`;

// variables
const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

// weather condition codes
const thunderyCodes = [1087, 1273, 1276, 1279, 1282];

const cloudyCodes = [1003, 1006, 1009, 1030, 1135];

const rainyCodes = [
    1063, 1150, 1153, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246, 1249,
    1252,
];

const snowyCodes = [
    1066, 1069, 1072, 1114, 1117, 1147, 1168, 1171, 1198, 1201, 1204, 1207,
    1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264,
];

// Functions

function setBtnBackground(color1, color2, timeOfDay) {
    if (timeOfDay === "night") submitBtn.style.backgroundColor = color2;
    else submitBtn.style.backgroundColor = color1;
}

function setAppBackground(condition, timeOfDay) {
    section.style.backgroundImage = `url(../images/${timeOfDay}/${condition}.jpg)`;
}

// check weather codition & update ui
function checkThunder(thunderyCodes, condCode, timeOfDay) {
    const thunder = thunderyCodes.some((code) => condCode === code);
    if (!thunder) return;
    setAppBackground("thundery", timeOfDay);
    setBtnBackground("#3e3e3e", "#1a0213", timeOfDay);
}

function checkRain(rainyCodes, condCode, timeOfDay) {
    const rain = rainyCodes.some((code) => condCode === code);
    if (!rain) return;
    setAppBackground("rainy", timeOfDay);
    setBtnBackground("#0c443ce0", "#181e27", timeOfDay);
}

function checkSnow(snowyCodes, condCode, timeOfDay) {
    const snow = snowyCodes.some((code) => condCode === code);
    if (!snow) return;
    setAppBackground("snowy", timeOfDay);
    setBtnBackground("#182232", "#181e27", timeOfDay);
}

function checkCloud(cloudyCodes, condCode, timeOfDay) {
    const cloud = cloudyCodes.some((code) => condCode === code);
    if (!cloud) return;
    setAppBackground("cloudy", timeOfDay);
    setBtnBackground("#ffa900", "#002839", timeOfDay);
}

function checkClear(condCode, timeOfDay) {
    if (condCode !== 1000) return;
    timeOfDay === "night"
        ? setAppBackground("clear", timeOfDay)
        : setAppBackground("sunny", timeOfDay);
    setBtnBackground("#ffb700", "#000220d7", timeOfDay);
}

// generate weather markup
function weatherMarkup() {
    const markup = `
    <h2 class="temp"></h2>
    <div class="info">
        <h2 class="current-city"></h2>
        <small class="time"></small>
    </div>
    <div class="desc">
        <div class="weather-icon">
            <img src="" alt="weather-condition" class="icon">
        </div>
        <small class="condition"></small>
    </div>
    `;
    return markup;
}

function setInnerContent(ele, content) {
    ele.innerHTML = "";
    ele.innerHTML = content;
}

function updateUI(weatherData) {
    checkClear(weatherData.code, weatherData.timeOfDay);
    checkCloud(cloudyCodes, weatherData.code, weatherData.timeOfDay);
    checkRain(rainyCodes, weatherData.code, weatherData.timeOfDay);
    checkSnow(snowyCodes, weatherData.code, weatherData.timeOfDay);
    checkThunder(thunderyCodes, weatherData.code, weatherData.timeOfDay);
    app.innerHTML = weatherMarkup();
    const temp = document.querySelector(".temp");
    const city = document.querySelector(".current-city");
    const time = document.querySelector(".time");
    const condition = document.querySelector(".condition");
    const icon = document.querySelector(".icon");
    const currentTime = `${weatherData.hours}:${weatherData.minutes} - ${weatherData.day} ${weatherData.month} ${weatherData.dayDate}`;
    icon.src = weatherData.icon;
    setInnerContent(temp, `${weatherData.temperature}°`);
    setInnerContent(city, weatherData.city);
    setInnerContent(time, currentTime);
    setInnerContent(condition, weatherData.condition);
    setInnerContent(cloud, `${weatherData.cloud}%`);
    setInnerContent(humidity, `${weatherData.humidity}%`);
    setInnerContent(wind, `${weatherData.wind}km/h`);
    app.style.opacity = "1";
}

function errorHandler(message) {
    app.innerHTML = `<div class="msg">${message}</div>`;
    app.style.opacity = "1";
}
