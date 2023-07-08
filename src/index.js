//Current date & time display
let currentTime = new Date();

let displayDate = document.querySelector("#display-date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
displayDate.innerHTML = `${day}`;

let displayTime = document.querySelector("#display-time");

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
displayTime.innerHTML = `${hours}:${minutes}`;
//main homepage miami search
function displayTemperature(response) {
  celciusTemperature = response.data.main.temp;

  let miaDisplay = document.querySelector("#temp-display");
  miaDisplay.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
  let miaDisplayname = document.querySelector("#city-heading");
  miaDisplayname.innerHTML = response.data.name;
  let miaDisplaydescrip = document.querySelector("#display-description");
  miaDisplaydescrip.innerHTML = response.data.weather[0].description;

  let miaHumidity = document.querySelector("#humidity");
  miaHumidity.innerHTML = response.data.main.humidity;
  let miamiWind = document.querySelector("#windspeed");
  miamiWind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let cloudyIcon = document.querySelector("#cloudy-icon");
  cloudyIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//form
function search(citySearch) {
  let apiKey = "17bdca836095d7c1bad24c5c24dff182";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCityName(results) {
  results.preventDefault();
  let cityName = document.querySelector("#city-input");
  search(cityName.value);
}
function fahrenheitDisplay(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temp-display");
  temperatureDisplay.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}

let fahrenheitClick = document.querySelector("#far-display");
fahrenheitClick.addEventListener("click", fahrenheitDisplay);

function celciusDisplay(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temp-display");
  fahrClick.classList.remove("active");
  celciusClick.classList.add("active");
  let celciusResults = celciusTemperature;
  temperatureDisplay.innerHTML = Math.round(celciusResults);
}
function fahrDisplay(event) {
  event.preventDefault();
  fahrClick.classList.add("active");
  celciusClick.classList.remove("active");
  let temperatureDisplay = document.querySelector("#temp-display");
  temperatureDisplay.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}

let celciusTemperature = null;

let celciusClick = document.querySelector("#cel-display");
celciusClick.addEventListener("click", celciusDisplay);

let fahrClick = document.querySelector("#far-display");
fahrClick.addEventListener("click", fahrDisplay);

let cityForm = document.querySelector("#search-button");
cityForm.addEventListener("submit", getCityName);

search("Miami");
