let now = new Date();
let date = document.querySelector("#date");

let hours = now.getHours();
let minutes = now.getMinutes();
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

date.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#weather").innerHTML =
    response.data.condition.description;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  let humid = response.data.temperature.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humid}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed} mph`;
  console.log(response);
}

function search(event) {
  event.preventDefault();
  let apiKey = "tb9021cb57677162636fa4a00f5o70a3";
  let units = "imperial";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
