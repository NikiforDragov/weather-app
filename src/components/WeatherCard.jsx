import { useEffect, useState } from 'react';
import { getWeatherData } from '../services/api';
import dayjs from 'dayjs';
import '../css/WeatherCard.css';

function WeatherCard() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [showChangeLocation, setShowChangeLocation] = useState(false);

    const changeLocation = (e) => {
        e.preventDefault();
        if (!showChangeLocation) setShowChangeLocation(true);
        else setShowChangeLocation(false);
        return;
    };

    const searchLocation = async () => {
        const weatherData = await getWeatherData(location);
        setData(weatherData);
        setLocation('');
        setShowChangeLocation(false);
    };

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            ``;
            const weatherData = await getWeatherData('London');
            setData(weatherData);
        };

        if (Object.keys(data).length === 0) {
            fetchDefaultWeather();
        }
    }, [data]);

    return (
        <div className='weather-card'>
            <div className='left'>
                <div className='date-info'>
                    <h2>{dayjs().format('dddd')}</h2>
                    <p>{dayjs().format('DD MMM YYYY')}</p>
                    <p className='location'>
                        📍 {data.name}, {data.country}
                    </p>
                </div>

                <div className='temp-info'>
                    <div className='icon'>☀️</div>
                    <h1>{data.temperature}°C</h1>
                    <p>{data.weather}</p>
                </div>
            </div>

            <div className='right'>
                <div className='stats'>
                    <p>
                        <strong>HUMIDITY</strong> {data.humidity}%
                    </p>
                    <p>
                        <strong>WIND</strong> {data.wind} km/h
                    </p>
                </div>

                <div className='forecast'>
                    <div className='day active'>
                        <p>Tue</p>
                        <span>30°C</span>
                    </div>
                    <div className='day'>
                        <p>Wed</p>
                        <span>22°C</span>
                    </div>
                    <div className='day'>
                        <p>Thu</p>
                        <span>6°C</span>
                    </div>
                    <div className='day'>
                        <p>Fri</p>
                        <span>26°C</span>
                    </div>
                </div>

                <button className='change-location' onClick={changeLocation}>
                    📍 Change Location
                </button>
                {showChangeLocation && (
                    <div className='modal'>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder='Enter city...'
                        />
                        <button onClick={searchLocation}>Search</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherCard;
