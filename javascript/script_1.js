const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];
                
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
    nextDayInfo('#mwd2',7);
    nextDayInfo('#mwd3',15);
    nextDayInfo('#mwd4',23);
    nextDayInfo('#mwd5',31);
    nextDayInfo('#mwd6',39)
};

const setStateOne = (data) => {
    state.city = data.city.name;
    state.temp = data.list[0].main.temp;
    state.humidity = data.list[0].main.humidity;
    state.country = data.city.country;
    state.description = data.list[0].weather[0].description;
    state.lat = data.city.coord.lat;
    state.lon = data.city.coord.lon;
    state.icon = data.list[0].weather[0].icon;
    state.list = data.list;
};

const renderOneData = () => {
    setQS('.city', `${state.city}, ${state.country}`);
    setQS('.temp', `${Math.round(state.temp)} °C`);
    setQS('.humidityGet', `${state.humidity}%`);
    setQS('.cloud', `${state.description.charAt(0).toUpperCase() + state.description.slice(1)}`);
    document.querySelector('.icon').src = `${API_IMG}${state.icon}.png`;
    setQS('.long_lang', `[${state.lon.toFixed(2)}, ${state.lat.toFixed(2)}]`);
};

//---------------Get longitude and latitude------------------------------------

(function getDate() {
    window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQS('.long_lang', `[${longitude.toFixed(2)}, ${latitude.toFixed(2)}]`);
        (async function () {
            let response = await fetch( `${API_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            let data = await response.json();
            setStateOne(data);
            renderOneData();
            callNextDayInfo();
        })();
        thisDayInfo ();
    });
})();

//avartvac che
const setStateShow = (data, i) => {
    state.temp = data.list[i].main.temp;
    state.humidity = data.list[i].main.humidity;
    state.country = data.city.country;
    state.description = data.list[i].weather[i].description;
    state.icon = data.list[i].weather[i].icon;
    state.list = data.list;
};

const renderShowData = () => {
    setQS('.time', `${state.city}`);
    setQS('.temperature', `${Math.round(state.temp)} °C`);
    setQS('.humGet', `${state.humidity}%`);
    setQS('.desc', `${state.description.charAt(0).toUpperCase() + state.description.slice(1)}`);
    document.querySelector('.iconList').src = `${API_IMG}${state.icon}.png`;
};
