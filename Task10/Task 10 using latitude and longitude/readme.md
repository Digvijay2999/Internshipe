# Weather App - Latitude and Longitude Search
A simple client-side weather fetcher using Open-Meteo and reverse geocoding to show current temperature, humidity, and an approximate location.

## Features
- Enter latitude & longitude to fetch current weather
- Reverse-geocoding (Open-Meteo) to show city name (falls back to coordinates if not found)
- Validates numeric and range inputs, shows loading and error states
- Responsive, modern UI (styles in `style.css`)

## Prerequisites
- Node.js (for running a local static server with `http-server`) or any static file server
- Internet access for Open-Meteo API

## Notes
- Reverse geocoding uses `count=1&language=en`; if no place is returned, the app displays the coordinates instead of "Unknown location"
- API calls are made client-side (no API key required)

## Development
- Files:
  - `index.html`  UI markup
  - `style.css`  stylesheet
  - `script.js`  main logic

## Author

Created by Digvijay
