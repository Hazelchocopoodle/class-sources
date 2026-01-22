const API_KEY = '6c07595ba9a70799b384b712d1145542'; // OpenWeatherMap API 키를 입력하세요
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');

async function searchWeather(city) {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=kr`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('도시를 찾을 수 없습니다');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError();
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temp.textContent = Math.round(data.main.temp);
    description.textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherResult.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function showError() {
    weatherResult.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}

function handleSearch() {
    const city = cityInput.value.trim();

    if (city) {
        searchWeather(city);
    }
}

searchBtn.addEventListener('click', handleSearch);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
