const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'fd48bdf8a8b87b3c140f17625f4e2d57'
// Geolocation Cuurent data Weather
// `${API_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`; 
// Forecast
// `${API_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
//  Search City name
// `${API_URL}weather?q=${inputValue}&appid=${API_KEY}&units=metric`
// `${API_URL}forecast?q=${inputValue}&appid=${API_KEY}&units=metric`
const icon2 = document.getElementById('icon2')
const iconTemp = (id) => {
    document.getElementById(id)
}
const byId = (id, value) => {
    document.getElementById(id).innerHTML = value;
}
const enter = (event) => {
    if (event.key === 'Enter') {
        gettingWeather()
    }
}
const state = {
    mwd: null,
    icon: null,
    temp: null,
    humidity: null,
    description: null
}
const renderData = () => {
    byId('mwd2',`${state.mwd}`);
    icon2.src = `http://openweathermap.org/img/w/${state.icon}.png`
    byId('temp2',`${state.temp}`)
    byId('humidity2',`${state.humidity} %`)
    byId('description2',`${state.description}`)
}
const setState = (data) => {
    console.log(data)
    state.mwd = data.list[7].dt_txt
    state.temp = data.list[7].main.temp
    state.icon = data.list[7].weather[0].icon
    state.description = data.list[7].weather[0].description
    state.humidity = data.list[7].main.humidity
    console.log(state)
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
    renderData()
}