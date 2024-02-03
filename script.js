const apiKey = '3dfaf5ed50aeb2ad4df31b5d00697fee';

async function fetchWeatherData(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    updateUI(data);
}

document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('search-bar').value;
    fetchWeatherData(city); // Pass the city name to the fetchWeatherData function
});

let cityName = document.querySelector("#location");
let temp = document.querySelector("#temp");
let minTemp = document.querySelector("#min-temp");
let maxTemp = document.querySelector("#max-temp");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let description = document.querySelector("#descrip");
let icon = document.querySelector("#icon");

function updateUI(data) {
    cityName.textContent = `${data.name}`;
    temp.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    minTemp.textContent = `${Math.round(data.main.temp_min - 273.15)}°C`;
    maxTemp.textContent = `${Math.round(data.main.temp_max - 273.15)}°C`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    humidity.textContent = ` ${data.main.humidity}%`;
    description.textContent = `${data.weather[0].description}`;

    // Set the icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    icon.src = iconUrl;
    icon.alt = data.weather[0].description;
}
