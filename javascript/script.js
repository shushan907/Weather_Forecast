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


const enter = (event) => {
    if (event.key === 'Enter') {
        gettingWeather()
    }
}

const state = {
    mwd: null,
    icon: null,
    temp: null,
    percent: null,
    descripton: null

}

const setState = (data) =>{
    // state.mwd = 
    console.log(data)
}

const gettingWeather = async () => {
    const inputValue = document.getElementById('input').value;
    if (inputValue) {
        document.getElementById('messageError').innerHTML = '';

    } else {
        document.getElementById('messageError').innerHTML = 'Please write city or country name';
    }
    const response = await fetch(`${API_URL}forecast?q=${inputValue}&appid=${API_KEY}&units=metric`)
    const data = await response.json()
    setState(data)
}