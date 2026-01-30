# Weather App — City or Country Search

A small client-side weather app that accepts a city or country name, resolves it to coordinates via Open-Meteo geocoding, and displays current temperature, humidity, and weather condition using the Open-Meteo forecast API.

##  Features
- Search by **city or country name** (single-result geocoding)
- Displays **temperature**, **humidity**, and **weather condition** with an icon
- Graceful error handling and clear loading / disabled states
- Responsive, accessible UI with keyboard-friendly inputs

##  Prerequisites
- Node.js (optional, for running a local static server) or any static server
- Internet access (APIs are called client-side)

#### Note: 
The app is pure front-end and can be served by any static file server (VS Code Live Server, Python http.server, etc.).

##  API & Privacy
- Uses Open-Meteo **geocoding** (`/v1/search`) to translate names into coordinates
- Uses Open-Meteo **forecast** (`/v1/forecast`) for current weather information
- No API keys are required; requests are made directly from the browser

##  Behavior & Troubleshooting
- If a city is not found, an error message appears: **"City not found."**
- If geocoding succeeds but reverse lookup returns no readable place, the UI shows the coordinates instead of an ambiguous label
- Check the browser console for network/response details when debugging

##  Files
- `index.html` — UI and markup
- `style.css` — visual styles and responsive rules
- `script.js` — app logic (geocoding + weather fetch + rendering)


## Author

Created by Digvijay