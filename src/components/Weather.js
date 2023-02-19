import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import WeatherList from './WeatherList';

function Weather() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [cityData, setCityData] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                if (cityData) {
                    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityData.name}&appid=e59db784e44b765380bb55091470c928&units=metric`);
                    const data = await response.json();
                    setWeather(data.weather[0].description);
                }
            } catch (err) {
                setError('Error fetching weather data');
            }
        };

        getWeather();
    }, [cityData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCityData({ name: event.target.elements.city.value });
    };

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Nav />
            <div className="container">
                <fieldset>
                    <form onSubmit={handleSubmit}>
                        <input name="city" type="text" className="ghost-input" placeholder="Enter a City" required />
                        <input type="submit" className="ghost-button" value="Get Weather" />
                    </form>
                    {cityData !== null && (
                        <p>
                            The current weather in {cityData.name} is {weather}.
                        </p>
                    )}
                    {error !== null && (
                        <p>
                            {error}
                        </p>
                    )}
                </fieldset>
            </div>
            <WeatherList />
        </div>
    );
}

export default Weather;
