import { useState, useEffect } from 'react';
import GetWeather from './GetWeather';

function WeatherList() {
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    function handleForecastLoaded(data) {
        setForecast(data.list);
        setError(null);
    }

    function handleError(error) {
        setError(error);
        setForecast([]);
    }

    function handlePositionSuccess(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    function handlePositionError(error) {
        setError(error.message);
        setForecast([]);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(handlePositionSuccess, handlePositionError);
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=e59db784e44b765380bb55091470c928&units=metric`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    handleForecastLoaded(data);
                })
                .catch((error) => {
                    handleError(error.message);
                });
        }
    }, [latitude, longitude]);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <ul>
                {forecast.map((item) => (
                    <li key={item.dt}>
                        <p>Date and Time: {new Date(item.dt * 1000).toLocaleString()}</p>
                        <p>Temperature: {item.main.temp}°C</p>
                        <p>Weather: {item.weather[0].description}</p>
                    </li>
                ))}
            </ul>

            <GetWeather latitude={latitude} longitude={longitude} />
        </div>
    );
}

export default WeatherList;
