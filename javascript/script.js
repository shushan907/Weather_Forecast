const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '40a3ab422b6c7446253471c3714edfb8';
const API_IMG = 'http://openweathermap.org/img/w/';
// Geolocation Cuurent data Weather
// `${API_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`; 
// Forecast
// `${API_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
//  Search City name
// `${API_URL}weather?q=${inputValue}&appid=${API_KEY}&units=metric`
// `${API_URL}forecast?q=${inputValue}&appid=${API_KEY}&units=metric`



const state = {
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
//---------------------Helping functions-----------------------------------------------
const setQS = (selector, value) => {
    document.querySelector(selector).innerText = value; 
};

byId = (id, value) => {
    document.getElementById(id).innerHTML = value
}
const renderData = (g) => {

    byId(`temp${g}`, `${state.temp}`);
    byId(`humidity${g}`, `${state.humidity}%`)
    byId(`description${g}`, `${state.description}`)
    const icon = document.getElementById(`icon${g}`).src = `${API_IMG}${state.icon}.png`
}
const setState = (data, i) => {
    state.icon = data.list[i].weather[0].icon;
    state.temp = data.list[i].main.temp;
    state.description = data.list[i].weather[0].description;
    state.humidity = data.list[i].main.humidity

}

//------------------------------------------------------------------------------

const gettingWeather = async () => {
    const inputValue = document.getElementById('input').value;
    if (inputValue) {
        setQS('#messageError', '');
        (async function () {
            const response = await fetch( `${API_URL}forecast?q=${inputValue}&APPID=${API_KEY}&units=metric` );
            if (response.status == 404) {
                setQS('#messageError', 'Please, enter the correct city name!');
            } else {
                const data = await response.json();
                setState(data, 7);
                renderData(2);
                setState(data, 15);
                renderData(3);
                setState(data, 23);
                renderData(4);
                setState(data, 31);
                renderData(5);
                setState(data, 39);
                renderData(6);
                setStateOne(data);
                renderOneData();

            }   
        })();
    } else setQS( '#messageError', 'Please, enter the city name!' );
}

//----------------input keyup ENTER-------------------------------------

const enter = (event) => {
    if (event.key === 'Enter') gettingWeather()  
};

//---------------------------Mouse------------------------------------------------
const mouse = (name) => {
    document.getElementById(name).addEventListener('mouseover', () => {
        document.getElementById('show').style.display = "grid";
    });
    document.getElementById(name).addEventListener('mouseout', () => {
        document.getElementById('show').style.display = "none";
    });
};

mouse('two');
mouse('three');
mouse('four');
mouse('five');
mouse('six')
