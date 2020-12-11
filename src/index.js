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
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
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

//
let hours = now.getHours();

let nextHour1 = document.querySelector("#nextHour-1");
let nextHour1After = now.getHours() - 21;
let nextHour1Before = now.getHours() + 1;
if (hours === 23) {
  nextHour1.innerHTML = `${nextHour1After}:00`;
} else {
  nextHour1.innerHTML = `${nextHour1Before}:00`;
}

let nextHour2 = document.querySelector("#nextHour-2");
let nextHour2After = now.getHours() - 20;
let nextHour2Before = now.getHours() + 4;
if (hours >= 20) {
  nextHour2.innerHTML = `${nextHour2After}:00`;
} else {
  nextHour2.innerHTML = `${nextHour2Before}:00`;
}

let nextHour3 = document.querySelector("#nextHour-3");
let nextHour3After = now.getHours() - 17;
let nextHour3Before = now.getHours() + 7;
if (hours >= 17) {
  nextHour3.innerHTML = `${nextHour3After}:00`;
} else {
  nextHour3.innerHTML = `${nextHour3Before}:00`;
}

let nextHour4 = document.querySelector("#nextHour-4");
let nextHour4After = now.getHours() - 14;
let nextHour4Before = now.getHours() + 10;
if (hours >= 14) {
  nextHour4.innerHTML = `${nextHour4After}:00`;
} else {
  nextHour4.innerHTML = `${nextHour4Before}:00`;
}

let nextHour5 = document.querySelector("#nextHour-5");
let nextHour5After = now.getHours() - 11;
let nextHour5Before = now.getHours() + 13;
if (hours >= 11) {
  nextHour5.innerHTML = `${nextHour5After}:00`;
} else {
  nextHour5.innerHTML = `${nextHour5Before}:00`;
}

let nextHour6 = document.querySelector("#nextHour-6");
let nextHour6After = now.getHours() - 8;
let nextHour6Before = now.getHours() + 16;
if (hours >= 8) {
  nextHour6.innerHTML = `${nextHour6After}:00`;
} else {
  nextHour6.innerHTML = `${nextHour6Before}:00`;
}

let nextHour7 = document.querySelector("#nextHour-7");
let nextHour7After = now.getHours() - 5;
let nextHour7Before = now.getHours() + 19;
if (hours >= 5) {
  nextHour7.innerHTML = `${nextHour7After}:00`;
} else {
  nextHour7.innerHTML = `${nextHour7Before}:00`;
}

//SEARCH
function search(city) {
  let apiKey = "7230f04fdbd28337f6f727ee7817218c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//TEMPERATURE

function showPosition(position) {
  let apiKey = "7230f04fdbd28337f6f727ee7817218c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

search("Vienna");
