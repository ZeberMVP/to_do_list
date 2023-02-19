const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = import('node-fetch');

// Configurar el middleware para parsear datos JSON y URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Manejar la petición POST a /weather
app.post('/weather', async (req, res) => {
    const { city } = req.body;

    try {
        // Obtener la información de clima utilizando la API de OpenWeatherMap
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid={API_KEY}&units=metric`);
        const data = await response.json();

        // Enviar la información de clima de vuelta al cliente como una respuesta JSON
        res.json({
            temperature: data.main.temp,
            description: data.weather[0].description,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener información de clima');
    }
});

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
});
