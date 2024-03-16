function fetchWeather(city) {
  const apiKey = "98aae6a121a8ade5f2176f7b4b71a150";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  setLoadingState(true);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('No weather found.');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      alert('No weather found. Please try again.');
    })
    .finally(() => {
      setLoadingState(false);
    });
}

function setLoadingState(isLoading) {
  const weatherElement = document.querySelector(".weather");
  if (isLoading) {
    weatherElement.classList.add("loading");
  } else {
    weatherElement.classList.remove("loading");
  }
}

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  document.querySelector(".city").innerText = `Weather in ${name}`;
  document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = `${temp}°C`;
  document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
  document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
}

document.querySelector("#search-btn").addEventListener("click", function () {
  const city = document.querySelector(".search-bar").value;
  fetchWeather(city);
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const city = document.querySelector(".search-bar").value;
    fetchWeather(city);
  }
});


function fetchForecast(city) {
  const apiKey = "98aae6a121a8ade5f2176f7b4b71a150";
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  setLoadingState(true);

  fetch(forecastUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('No forecast found.');
      }
      return response.json();
    })
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.error('Error fetching forecast:', error);
      alert('No forecast found. Please try again.');
    })
    .finally(() => {
      setLoadingState(false);
    });
}

function displayForecast(data) {
  const forecastElement = document.getElementById("forecast");
  forecastElement.innerHTML = ""; 

  for (let i = 0; i < data.list.length; i += 8) {
    const forecastData = data.list[i];
    const { dt_txt } = forecastData;
    const { icon } = forecastData.weather[0];
    const { temp } = forecastData.main;

    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");

    const dateElement = document.createElement("div");
    dateElement.innerText = formatDate(dt_txt);
    forecastItem.appendChild(dateElement);

    const iconElement = document.createElement("img");
    iconElement.src = `https://openweathermap.org/img/wn/${icon}.png`;
    iconElement.alt = "";
    forecastItem.appendChild(iconElement);

    const tempElement = document.createElement("div");
    tempElement.innerText = `${temp}°C`;
    forecastItem.appendChild(tempElement);

    forecastElement.appendChild(forecastItem);
  }
}

function formatDate(dt_txt) {
  const date = new Date(dt_txt);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

fetchForecast("Lahore");