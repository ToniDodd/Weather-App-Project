function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecasts = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                  <div class="d-flex weather-temperature">
                    <ul>
                    <li id="forecast-day">${formatDay(forecastDay.time)}</li>
                      <div class="forecast-icon"><img  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                        forecastDay.condition.icon
                      }.png" alt="broken-clouds" id="forecast-icon"></div>
                      <li> <span id="forecast-temp-max">${Math.round(
                        forecastDay.temperature.maximum
                      )}°</span>
                      <span id="forecast-temp-min">${Math.round(
                        forecastDay.temperature.minimum
                      )}°</span></li>
                    </ul>
                  </div>
                </div>
                
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecasts.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `tb9021cb57677162636fa4a00f5o70a3`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#weather").innerHTML =
    response.data.condition.description;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  let humid = response.data.temperature.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humid}%`;
  let date = document.querySelector("#date");
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed} mph`;
  let icon = document.querySelector("#icon");
  date.innerHTML = formatDate(response.data.time * 1000);
  icon.innerHTML = response.data.condition.icon;

  fahrenheitTemperature = response.data.temperature.current;

  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  icon.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "tb9021cb57677162636fa4a00f5o70a3";
  let units = "imperial";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  search(cityInput.value);
}

function celsiusConvert(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let unitTemperature = document.querySelector("#temp");
  unitTemperature.innerHTML = Math.round(celsiusTemperature);
}
function fahrenheitConvert(event) {
  event.preventDefault();
  let unitTemperature = document.querySelector("#temp");
  unitTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusConvert);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConvert);

search("Eugene");
