const API_KEY = import.meta.env.VITE_API_KEY;

export const getWeatherData = async (city) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Failed to fetch weather data'
            );
        }

        const data = await response.json();

        const result = {
            name: data.name,
            temperature: data.main.temp,
            wind: data.wind.speed,
            humidity: data.main.humidity,
            country: data.sys.country,
            weather: data.weather[0].main,
        };
        return result;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return { error: error.message };
    }
};
