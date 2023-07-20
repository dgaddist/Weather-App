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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
//forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
   <div class="weather-forecast" id="weather-forecast">
                <div class="weekday">${formatDay(forecastDay.time)}</div>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastDay.condition.icon
                }.png" width="40px" /> <br />
                <span class="weektemp">
                 ${Math.round(forecastDay.temperature.maximum)}
                °</span>
                <span class="weekcelcius">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
              </div>
              </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//main homepage miami search
function getForecast(coordinates) {
  let apiKey = "bec44c2o3f75134a454be6e601b6f1td";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  console.log(response.data);
  celciusTemperature = response.data.temperature.current;

  let miaDisplay = document.querySelector("#temp-display");
  miaDisplay.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
  let miaDisplayname = document.querySelector("#city-heading");
  miaDisplayname.innerHTML = response.data.city;
  let miaDisplaydescrip = document.querySelector("#display-description");
  miaDisplaydescrip.innerHTML = response.data.condition.description;

  let miaHumidity = document.querySelector("#humidity");
  miaHumidity.innerHTML = response.data.temperature.humidity;
  let miamiWind = document.querySelector("#windspeed");
  miamiWind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let cloudyIcon = document.querySelector("#cloudy-icon");
  cloudyIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}
//form
function search(citySearch) {
  let apiKey = "bec44c2o3f75134a454be6e601b6f1td";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${citySearch}&key=bec44c2o3f75134a454be6e601b6f1td&units=metric`;
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

//fahr & celcius button

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
let fahrClick = document.querySelector("#far-display");
fahrClick.addEventListener("click", fahrDisplay);

let cityForm = document.querySelector("#search-button");
cityForm.addEventListener("submit", getCityName);

search("Miami");

//current location
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cb286bad3607984b41ed10c8de5cf00e&units=imperial`;
  axios.get(apiUrlLocation).then(locationSearch);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationbutton = document.querySelector("#current-button");
locationbutton.addEventListener("click", currentLocation);

function locationSearch(response) {
  let currentlocationTemperature = document.querySelector("#temp-display");
  currentlocationTemperature.innerHTML = Math.round(
    (response.data.main.temp * 9) / 5 + 32
  );
  let currentLocationName = document.querySelector("#city-heading");
  currentLocationName = response.data.name;
}
