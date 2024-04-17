function search(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  let city = citySearch.value;
  let apiKey = `cat494bb9c91fa07d373647010ob64af`;
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}
