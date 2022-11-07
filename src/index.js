function displaySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let searchOutput = document.querySelector("#search-location");
  searchOutput.innerHTML = searchInput.value;
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  let locationName = document.querySelector("#search-location");
  document.querySelector("#search-location").innerHTML = response.data.name;
  let locationTemperature = document.querySelector("#live-temperature");
  let roundedTemp = Math.round(response.data.main.temp);
  locationTemperature.innerHTML = `${roundedTemp} °C`;
  locationName.innerHTML = response.data.name;
}

function getSearchTemperature(city) {
  let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchTemperature);
}

function showSearchTemperature(response) {
  let searchName = document.querySelector("#search-location");
  let searchTemperature = document.querySelector("#live-temperature");
  let roundedTemp = Math.round(response.data.main.temp);
  searchTemperature.innerHTML = `${roundedTemp} °C`;
  searchName.innerHTML = response.data.name;
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
  "Saturday"
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
