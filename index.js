function currentWeather(response) {
  let temperature = document.querySelector("#weather-temp");
  let temp = response.data.temperature.current;
  temperature.innerHTML = Math.round(temp);
}
function weatherSearch(city) {
  let apiKey = "cat494bb9c91fa07d373647010ob64af";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  weatherSearch(searchInput.value);
}
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", search);
