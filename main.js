let appId = "2c4afa8f6625f3eaddee98cf9700328c";
let units = "imperial";
let searchMethod = "q";


function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`)
        .then(res => res.json())
        .then(data => {
            init(data);
        })
}

function init(responseFromServer) {
    // console.log(responseFromServer);
    switch (responseFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url(img/clear.jpeg)";
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = "url(img/rain.jpg)";
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url(img/storm.jpeg)";
            break;
        case 'Snow':
            document.body.style.backgroundImage = "url(img/snow.jpeg)";
            break;
        case 'Clouds':
            document.body.style.backgroundImage = "url(img/cloudy.jpeg)";
            break;
        default:
            document.body.style.backgroundImage = "url(img/defa.jpg)";
            break;
    }

    // let weatherDescription = document.getElementById('weatherDescription');
    let cityHeader = document.getElementById('cityHeader');
    let temperature = document.getElementById('temperature');
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let weatherIcon = document.getElementById("icon");
    let windSpeed = document.getElementById('windSpeed');
    let humidity = document.getElementById('humidity');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + responseFromServer.weather[0].icon + '.png';
    let resultDescription = responseFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperature.innerHTML = Math.floor(responseFromServer.main.temp) + "&#176";
    windSpeed.innerText = "winds at " + Math.floor(responseFromServer.wind.speed) + " m/s";
    cityHeader.innerText = responseFromServer.name;
    humidity.innerText = "Humidity at " + responseFromServer.main.humidity + " %";
}

document.getElementById('searchBtn').addEventListener('click', function () {
    document.getElementById('weatherContainer').style.visibility = "visible";
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
})