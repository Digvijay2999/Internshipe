const cityInput = document.getElementById("cityInput");
const button = document.getElementById("getWeather");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

button.addEventListener("click", getCityWeather);

// Allow Enter key to trigger weather search
cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission / page reload
        getCityWeather();
    }
});


function getCityWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        error.textContent = "Please enter a city or country name.";
        return;
    }

    error.textContent = "";
    result.innerHTML = "";
    loading.classList.remove("hidden");
    button.disabled = true;

    // 1️⃣ Geocoding API (City → Lat/Lon)
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    fetch(geoURL)
        .then(response => response.json())
        .then(geoData => {
            if (!geoData.results || geoData.results.length === 0) {
                throw new Error("City not found");
            }

            const { latitude, longitude, name, country } = geoData.results[0];
            fetchWeather(latitude, longitude, name, country);
        })
        .catch((err) => {
            console.error('Geocoding error:', err);
            error.textContent = "City not found.";
            loading.classList.add("hidden");
            button.disabled = false;
        });
}

// 2️⃣ Weather API (Lat/Lon → Weather)
function fetchWeather(lat, lon, city, country) {
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;

    fetch(weatherURL)
        .then(response => response.json())
        .then(weatherData => {
            displayWeather(weatherData, city, country);
        })
        .catch(() => {
            error.textContent = "Failed to fetch weather data.";
        })
        .finally(() => {
            loading.classList.add("hidden");
            button.disabled = false;
        });
}

// 3️⃣ Weather code → Text + Icon
function getWeatherInfo(code) {
    const map = {
        0: ["Clear Sky", "☀️"],
        1: ["Mainly Clear", "🌤️"],
        2: ["Partly Cloudy", "⛅"],
        3: ["Overcast", "☁️"],
        45: ["Fog", "🌫️"],
        61: ["Rain", "🌧️"],
        71: ["Snow", "❄️"],
        95: ["Thunderstorm", "⛈️"]
    };

    return map[code] || ["Unknown", "❓"];
}

// 4️⃣ Display result
function displayWeather(data, city, country) {
    const temp = data.current.temperature_2m;
    const humidity = data.current.relative_humidity_2m;
    const code = data.current.weather_code;

    const [text, icon] = getWeatherInfo(code);

    result.innerHTML = `
        <h3>${city}, ${country}</h3>
        <div style="font-size:2rem">${icon}</div>
        <p><strong>${text}</strong></p>
        <p>🌡 ${temp} °C</p>
        <p>💧 Humidity: ${humidity}%</p>
    `;
}
