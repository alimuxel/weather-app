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
  locationTemperature.innerHTML = `${roundedTemp} °C`;
  locationName.innerHTML = `${response.data.city}, ${response.data.country}`;
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  liveCondition.innerHTML = `${response.data.condition.description}`;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} kmh`;
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
  searchTemperature.innerHTML = `${roundedTemp} °C`;
  searchName.innerHTML = `${response.data.city}, ${response.data.country}`;
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  liveCondition.innerHTML = `${response.data.condition.description}`;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} kmh`;
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
