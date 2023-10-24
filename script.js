function getWeather() {
    const city = document.getElementById('city').value;
    const WEATHER_API_KEY = '2f9d433d813c4f7ebe763604232410';
    const UNSPLASH_API_KEY = 'yyrfKmr1SI8Wu6UKcKSMxA8Dl3ydorlY4cy9GJsojSk'; // Reemplaza con tu clave de API de Unsplash
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('weather-info').innerHTML = `
                <div>City: ${data.location.name}</div>
                <div>Country: ${data.location.country}</div>
                <div>Temperature: ${data.current.temp_c}°C</div>
                <div>Condition: ${data.current.condition.text}</div>
            `;

            // Obtener una imagen de Unsplash basada en la condición del clima
            const unsplashUrl = `https://api.unsplash.com/photos/random?query=${data.current.condition.text}&client_id=${UNSPLASH_API_KEY}`;
            return fetch(unsplashUrl);
        })
        .then(response => response.json())
        .then(unsplashData => {
            // Cambiar el fondo de la aplicación con la imagen obtenida de Unsplash
            document.body.style.backgroundImage = `url(${unsplashData.urls.full})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';

            // Muestra el div weather-info
            document.getElementById('weather-info').style.display = 'block';
        })
        .catch(error => {
            console.error("Hubo un error:", error);
        });
}
