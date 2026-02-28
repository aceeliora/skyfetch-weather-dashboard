const apiKey = "d7387fa1909863eb4e714d320b7b518f";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

async function getWeather(city) {

    if (!city || city.trim() === "") {
        showError("Please enter a valid city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        showLoading();
        searchBtn.disabled = true;

        const response = await axios.get(url);
        displayWeather(response.data);

    } catch (error) {
        showError("City not found. Please try again.");
    } finally {
        searchBtn.disabled = false;
    }
}

function displayWeather(data) {
    const weatherCard = document.querySelector(".weather-card");

    weatherCard.innerHTML = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>${data.weather[0].description}</p>
    `;
}

function showError(message) {
    const weatherCard = document.querySelector(".weather-card");

    weatherCard.innerHTML = `
        <p class="error-message">${message}</p>
    `;
}

function showLoading() {
    const weatherCard = document.querySelector(".weather-card");

    weatherCard.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    getWeather(city);
    cityInput.value = "";
});

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather(cityInput.value.trim());
        cityInput.value = "";
    }
});
