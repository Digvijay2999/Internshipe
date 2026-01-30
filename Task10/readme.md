# Weather App Task10

A small, client-side weather demo that demonstrates two ways to fetch current weather data using Open-Meteo:

- Variant one (`Task10 using latitude and longitude`) Latitude & Longitude input (enter numerical coordinates).
- Variant two (`Task 10 using City or Country name/`) Search by city or country name (geocoding ? coordinates).

---

## Features
- Fetches current temperature, humidity, and a short weather description from Open-Meteo
- Supports both **latitude/longitude** and **city/country** search variants
- Input validation (numeric and range checks), loading indicator, and user-friendly error messages
- Responsive, accessible UI with a modern design (see `style.css`)

## Prerequisites
- Node.js (optional) or any static file server for local testing
- Internet connection (APIs are called client-side from the browser)

## Testing & Troubleshooting
- Manual tests: try valid coordinates, out-of-range values, and invalid input to verify validation and error messages.
- Geocoding notes: when a city name is not found, the app shows **"City not found."**; for lat/lon reverse-lookup missing a readable name the app falls back to showing the coordinates.
- Debugging: check the browser console for fetch/network errors and response payloads.


##  Contribution
- Small fixes and style improvements are welcome. Open a PR or ask here for help.

## Author
Created by Digvijay
