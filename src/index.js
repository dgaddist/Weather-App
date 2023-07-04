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
let minutes = currentTime.getMinutes();

displayTime.innerHTML = `${hours}:${minutes}`;

//degree celcius click
function showCelcius() {
  let h2 = document.querySelector("#temp-display");
  h2.innerHTML = "23";
}

let celciusLink = document.querySelector("#cel-display");
celciusLink.addEventListener("click", showCelcius);

function showFahrenheit() {
  let h2 = document.querySelector("#temp-display");
  h2.innerHTML = "75";
}

let fahrenheitLink = document.querySelector("#far-display");
fahrenheitLink.addEventListener("click", showFahrenheit);
//When user searches for a city display temp and city name
//Fahrenheit response
function getCityName(results) {
  results.preventDefault();
  let cityName = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=17bdca836095d7c1bad24c5c24dff182&units=metric`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName.value}`;
  axios.get(apiUrl).then(showTemp);
}
let city = document.querySelector("#search-button");
city.addEventListener("submit", getCityName);

function showTemp(response, response3) {
  let displaytemp = document.querySelector("#temp-display");
  displaytemp.innerHTML = Math.round((response.data.main.temp * 9) / 5 + 32);
}
let apiKey = "17bdca836095d7c1bad24c5c24dff182";

//Celcius response on searched city ((I feel like i can shorten these two))
function getCel(results2) {
  results2.preventDefault();
  let cityName2 = document.querySelector("#city-input");
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName2.value}&appid=17bdca836095d7c1bad24c5c24dff182&units=metric`;
  axios.get(apiUrl2).then(showCityCelcius);
}

let celciusClick = document.querySelector("#cel-display");
celciusClick.addEventListener("click", getCel);

function showCityCelcius(response2) {
  let displayCel = document.querySelector("#temp-display");
  displayCel.innerHTML = Math.round(response2.data.main.temp);
}
//Switch to Farh response on searched city
function getFar(results3) {
  results3.preventDefault();
  let cityName3 = document.querySelector("#city-input");
  let apiUrl3 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName3.value}&appid=17bdca836095d7c1bad24c5c24dff182&units=metric`;
  axios.get(apiUrl3).then(showCityFar);
}

let farClick = document.querySelector("#far-display");
farClick.addEventListener("click", getFar);

function showCityFar(response3) {
  let displayFar = document.querySelector("#temp-display");
  displayFar.innerHTML = Math.round((response3.data.main.temp * 9) / 5 + 32);
}

//Current location button & response
let locationResponse = document.querySelector("#current-button");
function getLocation(locresults) {
  locresults.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
locationResponse.addEventListener("click", getLocation);

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cb286bad3607984b41ed10c8de5cf00e&units=metric`;
  axios.get(apiUrlLocation).then(finalLocation);
}

function finalLocation(finalResponse) {
  let cityLocationTemp = document.querySelector("#temp-display");
  cityLocationTemp.innerHTML = Math.round(
    (finalResponse.data.main.temp * 9) / 5 + 32
  );
  let cityLocationName = document.querySelector("#city-heading");
  cityLocationName.innerHTML = finalResponse.data.name;
}
