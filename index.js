const baseUrl = "https://api.openweathermap.org/data/2.5/";
const token ="ff08b20739421841cfa84120441cd29f";
const input =document.querySelector('input');
const pDate =document.querySelector ('.date');
const WeatherName =document.querySelector ('#Weather_name');
const Temp =document.querySelector("#temp");
const wind =document.querySelector ("#wind");
const senseTemp =document.querySelector ("#sense_temp");

input.addEventListener('keypress',setQuery);
function setQuery(event) {
    if (event.keyCode === 13) {  //нажатие на enter
        getResults(input.value);
    }
}

function getResults(city) {
    const encodedCity = encodeURIComponent(city); // Кодируем город для URL
    fetch(`${baseUrl}weather?q=${encodedCity}&units=metric&appid=${token}&lang=ru`)
        .then((response) => {
            if (!response.ok) throw new Error("Город не найден");
            return response.json();
        })
        .then(displayResults)
        .catch((error) => {
            console.error("Ошибка:", error);
            alert("Проверьте название города или подключение к интернету");
        });
}

function displayResults(weather) {
    let now = new Date();
    pDate.innerHTML=dateBuilder (now);


        // Обновляем температуру и описание погоды
        Temp.innerHTML = `${Math.round(weather.main.temp)}&#176;C`;
        WeatherName.innerHTML = weather.weather[0].description;
        
        // Обновляем температуру и ветер
        wind.innerHTML = `${Math.round(weather.wind.speed)} м/с`;
        senseTemp.innerHTML = `${Math.round(weather.main.feels_like)}&#176;C`;
    }
    
    function dateBuilder(d) {
        let day = d.getDate().toString().padStart(2, '0'); // Добавляем ведущий ноль, если число < 10
        let month = (d.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
        let year = d.getFullYear();
        
        return `${day}.${month}.${year}`; // Формат: 05.05.2025
    }



