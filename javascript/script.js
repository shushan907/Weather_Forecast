const API_URL = 'https://api.openweathermap.org/data/2.5/';
const TEMP_URL = 'http://openweathermap.org/img/w/';
const API_KEY = '40a3ab422b6c7446253471c3714edfb8';

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];

const map = (lon, lat) => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1c2hhbjkwNyIsImEiOiJja2I2d3lnaDgwMDVzMnFueWp1N21mcTJxIn0.sa2X01ZgW8_r1In5A6sLFw';
        new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom: 7,
    });  
}

const setQS = (selector, value) => {
    document.querySelector(selector).innerText = value; 
};

const state = {
    mwd: null,
    icon: null,
    temp: null,
    humidity: null,
    description: null,
    city: null,
    country: null,
    lat: null,
    lon: null,
    list: null
};

const setState = (data, i) => {
    state.city = data.city.name;
    state.temp = data.list[i].main.temp;
    state.humidity = data.list[i].main.humidity;
    state.country = data.city.country;
    state.description = data.list[i].weather[0].description;
    state.lat = data.city.coord.lat;
    state.lon = data.city.coord.lon;
    state.icon = data.list[i].weather[0].icon;
    state.list = data.list;
    state.day = data.list[i].dt_txt;
};
  
const renderData = (g) => {
    setQS(`#temp${g}`, `${Math.round(state.temp)} °C`);
    setQS(`#humidity${g}`, `${state.humidity}%`)
    setQS(`#description${g}`, `${state.description.charAt(0).toUpperCase() + state.description.slice(1)}`)
    document.getElementById(`icon${g}`).src = `${TEMP_URL}${state.icon}.png`
};

const renderOneData = () => {
    setQS('.city', `${state.city}, ${state.country}`);
    setQS('.temp', `${Math.round(state.temp)} °C`);
    setQS('.humidityGet', `${state.humidity}%`);
    setQS('.cloud', `${state.description.charAt(0).toUpperCase() + state.description.slice(1)}`);
    document.querySelector('.icon').src = `${TEMP_URL}${state.icon}.png`;
    setQS('.long_lang', `[${state.lon.toFixed(2)}, ${state.lat.toFixed(2)}]`);
};

const renderShowData = (j) => {
    setQS(`.time${j}`, `${state.day}`);
    setQS(`.temperature${j}`, `${Math.round(state.temp)} °C`);
    setQS(`.humGet${j}`, `${state.humidity}%`);
    setQS(`.desc${j}`, `${state.description.charAt(0).toUpperCase() + state.description.slice(1)}`);
    document.querySelector(`.iconList${j}`).src = `${TEMP_URL}${state.icon}.png`;
};

const thisDayInfo = () => {
    const day = new Date();
    setQS('.weekDay', days[day.getDay()]);
    setQS('.monthDay', `${months[day.getMonth()]}, ${day.getDate()}`);
};

const nextDayInfo = (QS, i) => {
    const day = new Date(state.list[i].dt_txt.slice(0,10));
    setQS(QS,`${days[day.getDay()]} - ${months[day.getMonth()]} - ${day.getDate()}`);
};

const callNextDayInfo = () => {
    nextDayInfo('#mwd2', 0);
    nextDayInfo('#mwd3', 8);
    nextDayInfo('#mwd4', 16);
    nextDayInfo('#mwd5', 24);
    nextDayInfo('#mwd6', 32)
};

const renderAndStateCall = (data) => {
    setState(data, 0);
    renderOneData();
    setState(data, 0);
    renderData(2);
    setState(data, 8);
    renderData(3);
    setState(data, 16);
    renderData(4);
    setState(data, 24);
    renderData(5);
    setState(data, 32);
    renderData(6);
    callNextDayInfo();
};

const transformDataForShow = (data, i) => {
    data.list = data.list.slice (i, i + 8);
    i = 0;
    for (let n = 0; n < 8; n++) {
        data.list[n].dt_txt = data.list[n].dt_txt.slice(11,16).toString();
    }
    data.list.sort((a, b) => +(a.dt_txt.slice(0,2)) > +(b.dt_txt.slice(0,2)) ? 1 : -1);
    for (let j = 1; j < 9; j++) {
        setState(data, i);
        renderShowData(j);
        i++;
    }
};

const transformDataForShowLocation = (i) => {
    window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        (async function () {
            let response = await fetch( `${API_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            let data = await response.json();
            transformDataForShow(data, i);
        })();
    });
};

const transformDataForShowInputedCity = (i) => {
    (async function () {
        const inputValue = document.getElementById('input').value;
        let response = await fetch( `${API_URL}forecast?q=${inputValue}&APPID=${API_KEY}&units=metric` );
        let data = await response.json();
        transformDataForShow(data, i);
    })(); 
};
