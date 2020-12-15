function formattedDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let date = now.getDate();
  return `${day}, ${month} ${date}`;
}

function formattedTime() {
  let now = new Date();
  let hours = ("0" + now.getHours()).substr(-2);
  let minutes = ("0" + now.getMinutes()).substr(-2);

  return `${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city-input").value = response.data.name;

  celsiusTemperature = response.data.main.temp;
  maxTemperature = response.data.main.temp_max;
  minTemperature = response.data.main.temp_min;
  realFeel = response.data.main.feels_like;

  document.querySelector("#current-temp").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#sky").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formattedDate(
    response.data.dt * 1000
  );
  document.querySelector("#time").innerHTML = formattedTime(
    response.data.dt * 1000
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function forecastTime(timestamp) {
  let now = new Date(timestamp);
  let hours = ("0" + now.getHours()).substr(-2);
  let minutes = ("0" + now.getMinutes()).substr(-2);

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  document.querySelector("#temperature-forecast").innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    document.querySelector("#temperature-forecast").innerHTML += `
  <div class="col-2">
  <h6>${Math.round(forecast.main.temp)} <smaller> °C </smaller>
          </h6>
          <img src="https://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" alt="${forecast.weather[0].description}" />
          <div class="time-forecast">
            ${forecastTime(forecast.dt * 1000)} </div>
          </div>
          `;
  }
}

function search(city) {
  let apiKey = "7230f04fdbd28337f6f727ee7817218c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let apiKey = "7230f04fdbd28337f6f727ee7817218c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

function displayForecastFahrenheit(response) {
  document.querySelector("#temperature-forecast").innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    document.querySelector("#temperature-forecast").innerHTML += `
  <div class="col-2">
  <h6>${Math.round(forecast.main.temp)} <smaller> °F </smaller>
          </h6>
          <img src="https://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" alt="${forecast.weather[0].description}" />
          <div class="time-forecast">
            ${forecastTime(forecast.dt * 1000)} </div>
          </div>
          `;
  }
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector("#current-temp").innerHTML = Math.round(
    (celsiusTemperature * 9) / 5 + 32
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    (maxTemperature * 9) / 5 + 32
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    (minTemperature * 9) / 5 + 32
  );
  document.querySelector("#real-feel").innerHTML = Math.round(
    (realFeel * 9) / 5 + 32
  );

  let apiKey = "7230f04fdbd28337f6f727ee7817218c";

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${
    document.querySelector("#city-input").value
  }&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecastFahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-temp").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#max-temp").innerHTML = Math.round(maxTemperature);
  document.querySelector("#min-temp").innerHTML = Math.round(minTemperature);
  document.querySelector("#real-feel").innerHTML = Math.round(realFeel);

  handleSubmit(event);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", convertToCelsius);

search("Rome");

//FORECAST

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let otherDay1 = document.querySelector("#otherDays-1");
let nextDay1Start = days[now.getDay() - 6];
let nextDay1End = days[now.getDay() + 1];
if (day === days[6]) {
  otherDay1.innerHTML = `${nextDay1Start}`;
} else {
  otherDay1.innerHTML = `${nextDay1End}`;
}

let nextDay2Start = days[now.getDay() - 5];
let nextDay2End = days[now.getDay() + 2];
if (day === days[(6, 5)]) {
  document.querySelector("#otherDays-2").innerHTML = `${nextDay2Start}`;
} else {
  document.querySelector("#otherDays-2").innerHTML = `${nextDay2End}`;
}

let otherDay3 = document.querySelector("#otherDays-3");
let nextDay3Start = days[now.getDay() - 4];
let nextDay3End = days[now.getDay() + 3];
if (day === days[(6, 5, 4)]) {
  otherDay3.innerHTML = `${nextDay3Start}`;
} else {
  otherDay3.innerHTML = `${nextDay3End}`;
}

let nextDay4Start = days[now.getDay() - 3];
let nextDay4End = days[now.getDay() + 4];
if (day === days[(6, 5, 4, 3)]) {
  document.querySelector("#otherDays-4").innerHTML = `${nextDay4Start}`;
} else {
  document.querySelector("#otherDays-4").innerHTML = `${nextDay4End}`;
}

let otherDay5 = document.querySelector("#otherDays-5");
let nextDay5Start = days[now.getDay() - 2];
let nextDay5End = days[now.getDay() + 5];
if (day === days[(6, 5, 4, 3, 2)]) {
  otherDay5.innerHTML = `${nextDay5Start}`;
} else {
  otherDay5.innerHTML = `${nextDay5End}`;
}
