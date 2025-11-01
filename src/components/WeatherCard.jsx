import { useEffect, useState } from 'react';
import { getWeatherData } from '../services/api';
import dayjs from 'dayjs';
import '../css/WeatherCard.css';

function WeatherCard() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [showChangeLocation, setShowChangeLocation] = useState(false);
    const [error, setError] = useState('');

    const changeLocation = (e) => {
        e.preventDefault();
        if (!showChangeLocation) setShowChangeLocation(true);
        else setShowChangeLocation(false);
        return;
    };

    const searchLocation = async () => {
        setError('');
        const weatherData = await getWeatherData(location);
        if (weatherData.error) {
            setError(weatherData.error);
            setData({});
            setLocation('');
        } else {
            setData(weatherData);
            setLocation('');
            setShowChangeLocation(false);
        }
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
        <>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                        <h1>{data.temperature.toFixed(1)}°C</h1>
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

                    <button
                        className='change-location'
                        onClick={changeLocation}
                    >
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
        </>
    );
}

export default WeatherCard;
