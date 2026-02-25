const apiKey = "YOUR_API_KEY_HERE";
const city = "London";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(url)
    .then(function (response) {
        console.log("Weather Data:", response.data);
        displayWeather(response.data);
    })
    .catch(function (error) {
        console.error("Error fetching weather:", error);
    });

function displayWeather(data) {

    const cityName = document.getElementById("city");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const icon = document.getElementById("weather-icon");

    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
