/**
 * Simple script to fetch and display temperature for a given city using Open-Meteo API.
 */

const cityCoordinates = {
    "London": { latitude: 51.5074, longitude: -0.1278 },
    "New York": { latitude: 40.7128, longitude: -74.0060 },
    "Tokyo": { latitude: 35.6895, longitude: 139.6917 },
    "Sydney": { latitude: -33.8688, longitude: 151.2093 },
};

function getCoordinates(city) {
    const normalizedCity = city.trim().toLowerCase();
    for (const key in cityCoordinates) {
        if (key.toLowerCase() === normalizedCity) {
            return cityCoordinates[key];
        }
    }
    // Default to London if city not found
    return cityCoordinates["London"];
}

async function fetchTemperature(city) {
    const { latitude, longitude } = getCoordinates(city);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.current_weather && typeof data.current_weather.temperature === 'number') {
            console.log(`Current temperature in ${city}: ${data.current_weather.temperature}°C`);
        } else {
            console.log('Temperature data not available');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}

// Example usage:
const cityName = process.argv[2] || 'London';
fetchTemperature(cityName);
