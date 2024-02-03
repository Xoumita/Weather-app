const apiKey = '3dfaf5ed50aeb2ad4df31b5d00697fee';

async function fetchWeatherData(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    updateUI(data, city); // Pass the city name to updateUI
}

document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('search-bar').value;
    fetchWeatherData(city);
});

let cityName = document.querySelector("#location");
let temp = document.querySelector("#temp");
let minTemp = document.querySelector("#min-temp");
let maxTemp = document.querySelector("#max-temp");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let description = document.querySelector("#descrip");
let icon = document.querySelector("#icon");
let date = document.querySelector("#date");

function updateUI(data, city) {
    cityName.textContent = `${data.name}`;
    temp.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    minTemp.textContent = `${Math.round(data.main.temp_min - 273.15)}°C`;
    maxTemp.textContent = `${Math.round(data.main.temp_max - 273.15)}°C`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    humidity.textContent = ` ${data.main.humidity}%`;
    description.textContent = `${data.weather[0].description}`;

    let currentDate = new Date();
    date.textContent = currentDate.toDateString();

    // Set the icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    icon.src = iconUrl;
    icon.alt = data.weather[0].description;

    fetchForecastData(city); // Fetch forecast data for the selected city
}

// Fetch 5-day forecast data for the selected city
async function fetchForecastData(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    displayForecast(data);
}

// Display the 5-day forecast data
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast data

    // Loop through the forecast data and display information for each day
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000); // Convert timestamp to date object
        const day = date.toLocaleDateString('en-US', { weekday: 'short' }); // Get day of the week
        const temp = Math.round(item.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
        const description = item.weather[0].description;
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

        // Create HTML elements to display forecast information
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <div>${day}</div>
            <img src="${iconUrl}" alt="${description}">
            <div>${temp}°C</div>
            <div>${description}</div>
        `;

        // Append forecast item to the forecast container
        forecastContainer.appendChild(forecastItem);
    });
}
