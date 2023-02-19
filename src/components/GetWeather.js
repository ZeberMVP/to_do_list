import React, { useState, useEffect } from 'react';

function GetWeather() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                setError(error.message);
            }
        );
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e59db784e44b765380bb55091470c928`;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setWeather(data.weather[0].description);
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    }, [latitude, longitude]);

    return (
        <div className="container">
            <fieldset>
                {error && <p>{error}</p>}
                {weather && <p>{weather}</p>}
            </fieldset>
        </div>
    );
}

export default GetWeather;
