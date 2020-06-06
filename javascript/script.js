const API_URL = 'https://api.openweathermap.org/data/2.5/';
const FLAG_URL = 'https://countryflags.io/';
const TEMP_URL = 'http://openweathermap.org/img/w/';
const API_KEY = '40a3ab422b6c7446253471c3714edfb8';

function setQS(selector, value) {
    document.querySelector(selector).innerText = value; 
}

//---------------Get longitude and latitude------------------------------------

(function () {
    window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQS('.long_lang', `[${longitude.toFixed(2)}, ${latitude.toFixed(2)}]`)
    });
})()

