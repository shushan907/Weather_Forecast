const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '40a3ab422b6c7446253471c3714edfb8';

// Geolocation Cuurent data Weather
// `${API_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`; 
// Forecast
// `${API_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
//  Search City name
// `${API_URL}weather?q=${inputValue}&appid=${API_KEY}&units=metric`
// `${API_URL}forecast?q=${inputValue}&appid=${API_KEY}&units=metric`

const icon2 = document.getElementById('icon2');

const iconTemp = (id) => {
    document.getElementById(id)
};

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];

const state = {
    mwd: null,
    icon: null,
    temp: null,
    humidity: null,
    description: null,
    city: null,
    country: null
};
//---------------------Helping functions-----------------------------------------------
const setQS = (selector, value) => {
    document.querySelector(selector).innerText = value; 
};
const byId = (id, value) => {
    document.getElementById(id).innerHTML = value;
}

const thisDayInfo = () => {
    const day = new Date();
    setQS('.weekDay', days[day.getDay()]);
    setQS('.monthDay', `${months[day.getMonth()]}, ${day.getDate()}`);
};

const renderOneData = () => {
    setQS('.city', `${state.city}, ${state.country}`);
    setQS('.temp', `${Math.round(state.temp)} °C`);
    setQS('.humidityGet', `${state.humidity}%`);
    setQS('.cloud', `${state.description.charAt(0).toUpperCase() + state.description.slice(1)}`);
};

const renderData = () => {
    byId('mwd2',`${state.mwd}`);
    icon2.src = `http://openweathermap.org/img/w/${state.icon}.png`
    byId('temp2',`${state.temp}`)
    byId('humidity2',`${state.humidity} %`)
    byId('description2',`${state.description}`)
};

const setStateOne = (data) => {
    state.city = data.name;
    state.temp = data.main.temp;
    state.humidity = data.main.humidity;
    state.country = data.sys.country;
    state.description = data.weather[0].description;
};

const setState = (data) => {
    console.log(data)
    state.mwd = data.list[7].dt_txt
    state.temp = data.list[7].main.temp
    state.icon = data.list[7].weather[0].icon
    state.description = data.list[7].weather[0].description
    state.humidity = data.list[7].main.humidity
    console.log(state)
}; 

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

const gettingWeather = async () => {
    const inputValue = document.getElementById('input').value;
    if (inputValue) {
        document.getElementById('messageError').innerHTML = '';
    } else {
        document.getElementById('messageError').innerHTML = 'Please write city or country name';
    }
    const response = await fetch(`${API_URL}forecast?q=${inputValue}&appid=${API_KEY}&units=metric`)
    const data = await response.json();
    setState(data);
    renderData();
}

const enter = (event) => {
    if (event.key === 'Enter') {
        gettingWeather()
    }
}

//---------------Get longitude and latitude------------------------------------

(function getDate() {
    window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQS('.long_lang', `[${longitude.toFixed(2)}, ${latitude.toFixed(2)}]`);
        (async function () {
            let response = await fetch( `${API_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            let data = await response.json();
            setStateOne(data);
            renderOneData();
        })();
        thisDayInfo ();
    });
})();
//-------------------Change input style ------------------------------------
(function(){
    const inputValue = document.getElementById('input').value;
    if (inputValue) {
        document.getElementById('input').style.backgroundColor = "white";
        document.getElementById('input').style.color = "black";
    } 
})()