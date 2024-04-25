function currentWeather(response) {
  let temperature = document.querySelector("#weather-temp");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let details = document.querySelector("#details");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);
  details.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  temperature.innerHTML = Math.round(temp);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function weatherSearch(city) {
  let apiKey = "cat494bb9c91fa07d373647010ob64af";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");

  weatherSearch(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "cat494bb9c91fa07d373647010ob64af";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(showForecast);
}
function showForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="forecast-icon" />
        <div class="forecast-temps">
          <div class="forecast-temp">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="forecast-temp">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", search);
