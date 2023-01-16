function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function updateWeather(response) {
  let cityName = document.querySelector(".cityname");
  let temperature = document.querySelector(".temperature");

  farenheitTemperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}&units=imperial`;

  axios.get(url).then(updateWeather);
}

function showPosition(position) {
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=imperial`;

  axios.get(url).then(updateWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// convert temperature to F
function changeTemptoF(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(farenheitTemperature);
}

// convert temperature to C
function changeTemptoC(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  tempElement.innerHTML = Math.round((farenheitTemperature * 9) / 5 + 32);
}

let farenheitTemperature = null;

// when current location is called
let button = document.querySelector(".current");
button.addEventListener("click", getCurrentPosition);

//  feature 1
let form = document.querySelector(".search-bar");
form.addEventListener("submit", search);

// feature 3
let dateElement = document.querySelector(".date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// feature 3
let elementF = document.querySelector("#farenheit-link");
elementF.addEventListener("click", changeTemptoF);

let elementC = document.querySelector("#celcius-link");
elementC.addEventListener("click", changeTemptoC);
