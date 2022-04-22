// create object with weather details
function weatherDetails(data) {
    const currentWeather = data.current;
    const date = new Date(data.location.localtime);
    const day = weekDays[date.getDay() - 1];
    const month = months[date.getMonth()];
    const dateOfDay =
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hours =
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const timeOfDay = currentWeather.is_day === 1 ? "day" : "night";
    const weather = {
        hours: hours,
        minutes: minutes,
        day: day,
        month: month,
        dayDate: dateOfDay,
        city: data.location.name,
        temperature: currentWeather.temp_c,
        cloud: currentWeather.cloud,
        condition: currentWeather.condition.text,
        icon: currentWeather.condition.icon,
        humidity: currentWeather.humidity,
        wind: currentWeather.wind_kph,
        code: currentWeather.condition.code,
        timeOfDay: timeOfDay,
    };
    console.log(weather);
    return weather;
}

// get object data from api
async function getWeatherData(url, errorMsg = defaultErrorMsg) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(errorMsg);
        const data = await response.json();
        console.log(data);
        const weatherData = weatherDetails(data);
        updateUI(weatherData);
    } catch (err) {
        errorHandler(`${err} ❗`);
    }
}

// get location & update ui with weather information

function getCurrentCity(position) {
    // get current location coords
    const { latitude: lat } = position.coords;
    const { longitude: lng } = position.coords;
    // get weather by coords
    getWeatherData(`${API_URL}${lat},${lng}&`);
}

// show error message if no location found
function showMessage() {
    const message = `❗ ${defaultErrorMsg}, turn on the location service <br> to obtain weather information for your current location <br> or search by city name.`;
    errorHandler(message);
}

// get current location
function getLocation() {
    // geolocation API
    if (navigator.geolocation) {
        // get the current position
        navigator.geolocation.getCurrentPosition(getCurrentCity, showMessage);
    }
}
getLocation();

// serach event handler
function searchHandler(e) {
    e.preventDefault();
    if (!searchInp.value) {
        errorHandler(`${defaultErrorMsg} ❗`);
        return;
    }
    const query = searchInp.value;
    getWeatherData(`${API_URL}${query}`);
    searchInp.value = "";
}

// search event
form.addEventListener("submit", searchHandler);
submitBtn.addEventListener("click", searchHandler);

// on click one of recommended cities
function showCityWeather(e) {
    if (!e.target.classList.contains("city")) return;
    const query = e.target.textContent;
    getWeatherData(`${API_URL}${query}`);
}
document.addEventListener("click", showCityWeather);
