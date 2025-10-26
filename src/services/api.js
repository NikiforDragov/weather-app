const API_KEY = import.meta.env.VITE_API_KEY;

export const getWeatherData = async (city) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();

    const result = {
        name: data.name,
        temperature: data.main.temp,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        country: data.sys.country,
        weather: data.weather[0].main
    };
    return result;
};
