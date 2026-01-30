// Selecting DOM elements
const latInput = document.getElementById("latitude");
const lonInput = document.getElementById("longitude");
const button = document.getElementById("getWeather");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const inputs = [
    latInput,
    lonInput
];

// Button click
button.addEventListener("click", fetchWeather);

// Allow Enter key to trigger weather search
inputs.forEach((input, index) => {
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Stop default Enter behavior

            // If NOT last input → move focus
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } 
            // If last input → attempt weather fetch
            else {
                fetchWeather();
            }
        }
    });
});


// Fetch weather + location
function fetchWeather() {
    const latitude = latInput.value.trim();
    const longitude = lonInput.value.trim();

    if (latitude === "" || longitude === "") {
        error.textContent = "Please enter both latitude and longitude.";
        return;
    }

    const latNum = parseFloat(latitude);
    const lonNum = parseFloat(longitude);

    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
        error.textContent = "Latitude and longitude must be numeric values.";
        return;
    }

    if (latNum < -90 || latNum > 90) {
        error.textContent = "Latitude must be between -90 and 90.";
        return;
    }

    if (lonNum < -180 || lonNum > 180) {
        error.textContent = "Longitude must be between -180 and 180.";
        return;
    }

    error.textContent = "";
    result.innerHTML = "";
    loading.classList.remove("hidden");
    button.disabled = true;

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latNum}&longitude=${lonNum}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;

    // Fetch weather data
    fetch(weatherURL)
        .then(response => {
            if (!response.ok) throw new Error("Weather fetch failed");
            return response.json();
        })
        .then(weatherData => {
            // Fetch city name after weather data
            fetchCityName(latNum, lonNum, weatherData);
        })
        .catch(err => {
            console.error('Weather fetch error:', err);
            error.textContent = "Failed to fetch weather data.";
        })
        .finally(() => {
            loading.classList.add("hidden");
            button.disabled = false;
        });
}

// Reverse geocoding → city name
function fetchCityName(lat, lon, weatherData) {
    // Add count=1 and language to improve consistency of results
    const geoURL = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1&language=en`;

    fetch(geoURL)
        .then(response => {
            if (!response.ok) throw new Error('Geocoding fetch failed');
            return response.json();
        })
        .then(geoData => {
            const city =
                geoData && geoData.results && geoData.results.length > 0 && geoData.results[0].name
                    ? geoData.results[0].name
                    : `${lat.toFixed(4)}, ${lon.toFixed(4)}`; // fallback to coordinates

            displayWeather(weatherData, city);
        })
        .catch(err => {
            console.error('Geocoding error:', err);
            displayWeather(weatherData, `${lat.toFixed(4)}, ${lon.toFixed(4)}`);
        });
}

// Convert weather code to text + icon
function getWeatherInfo(code) {
    const weatherMap = {
        0: { text: "Clear Sky", icon: "☀️" },
        1: { text: "Mainly Clear", icon: "🌤️" },
        2: { text: "Partly Cloudy", icon: "⛅" },
        3: { text: "Overcast", icon: "☁️" },
        45: { text: "Fog", icon: "🌫️" },
        48: { text: "Depositing Rime Fog", icon: "🌫️" },
        51: { text: "Light Drizzle", icon: "🌦️" },
        61: { text: "Rain", icon: "🌧️" },
        71: { text: "Snow", icon: "❄️" },
        95: { text: "Thunderstorm", icon: "⛈️" }
    };

    return weatherMap[code] || { text: "Unknown", icon: "❓" };
}

// Display result
function displayWeather(data, city) {
    const temp = data.current.temperature_2m;
    const humidity = data.current.relative_humidity_2m;
    const code = data.current.weather_code;

    const weather = getWeatherInfo(code);

    result.innerHTML = `
        <h3>📍 ${city}</h3>
        <p style="font-size:2rem">${weather.icon}</p>
        <p><strong>${weather.text}</strong></p>
        <p>🌡 Temperature: ${temp} °C</p>
        <p>💧 Humidity: ${humidity}%</p>
    `;
}
