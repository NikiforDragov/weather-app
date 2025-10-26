import { useState } from 'react';
import { getWeatherData } from '../services/api';
import '../css/WeatherCard.css';

function WeatherCard() {
    const [showChangeLocation, setShowChangeLocation] = useState(false);
    const [city, setCity] = useState('');

    const changeLocation = (e) => {
        e.preventDefault();
        if (!showChangeLocation) setShowChangeLocation(true);
        else setShowChangeLocation(false);
        return;
    };

    return (
        <div className='weather-card'>
            <div className='left'>
                <div className='date-info'>
                    <h2>Tuesday</h2>
                    <p>20 Jun 2022</p>
                    <p className='location'>📍 Biarritz, FR</p>
                </div>

                <div className='temp-info'>
                    <div className='icon'>☀️</div>
                    <h1>29°C</h1>
                    <p>Sunny</p>
                </div>
            </div>

            <div className='right'>
                <div className='stats'>
                    <p>
                        <strong>PRECIPITATION</strong> 0%
                    </p>
                    <p>
                        <strong>HUMIDITY</strong> 42%
                    </p>
                    <p>
                        <strong>WIND</strong> 3 km/h
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
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='Enter city...'
                        />
                        <button
                            onClick={() => {
                                getWeatherData(city);
                            }}
                        >
                            Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherCard;
