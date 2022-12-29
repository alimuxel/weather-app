function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#live-temperature");

  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#live-temperature");

  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let temperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperature);
}

function displaySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let searchOutput = document.querySelector("#search-location");
  searchOutput.innerHTML = searchInput.value;
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bb1f9632a7o1b3d205df30t734b8a4da";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  let locationName = document.querySelector("#search-location");
  document.querySelector("#search-location").innerHTML = response.data.city;
  let locationTemperature = document.querySelector("#live-temperature");
  let roundedTemp = Math.round(response.data.temperature.current);
  let weatherIcon = document.querySelector("#live-temperature-icon");
  let liveCondition = document.querySelector("#live-condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  locationTemperature.innerHTML = `${roundedTemp}`;
  locationName.innerHTML = `${response.data.city}, ${response.data.country}`;
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  liveCondition.innerHTML = `${response.data.condition.description}`;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} kmh`;
  celsiusTemperature = response.data.temperature.current;
}

function getSearchTemperature(city) {
  let apiKey = "bb1f9632a7o1b3d205df30t734b8a4da";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchTemperature);
}

function showSearchTemperature(response) {
  let searchName = document.querySelector("#search-location");
  let searchTemperature = document.querySelector("#live-temperature");
  let roundedTemp = Math.round(response.data.temperature.current);
  let weatherIcon = document.querySelector("#live-temperature-icon");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let liveCondition = document.querySelector("#live-condition");

  searchTemperature.innerHTML = `${roundedTemp}`;
  searchName.innerHTML = `${response.data.city}, ${response.data.country}`;
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  liveCondition.innerHTML = `${response.data.condition.description}`;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} kmh`;
  celsiusTemperature = response.data.temperature.current;
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getSearchTemperature(city);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col">
                <div class="row forecast-days">
                <div class="col">Friday</div>
                
              </div>
              <div class="row forecast-icon">
                <div class="col">🌤</div>
      
              </div>
              <div class="row forecast-temperature">
                <div class="col">9 | 24°C</div>
                </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let time = new Date();
let hours = time.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let celsiusTemperature = null;

let day = new Date();
day.getDay([weekdays]);
let weekday = document.querySelector("#weekday");
weekday.innerHTML = `${weekdays[day.getDay()]}`;

let liveTime = document.querySelector("#live-time");
liveTime.innerHTML = `${hours}:${minutes}`;

let search = document.querySelector("#search-field");
search.addEventListener("submit", searchSubmit);

let currentButton = document.querySelector("#current-Button");
currentButton.addEventListener("click", getCurrentLocation);

let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", convertToCelsius);

let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", convertToFahrenheit);

displayForecast();
