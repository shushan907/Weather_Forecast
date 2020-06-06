const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];
                
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
    document.querySelector('.icon').src = `${TEMP_URL}${state.icon}.png`;
    setQS('.long_lang', `[${state.lon.toFixed(2)}, ${state.lat.toFixed(2)}]`);
};

const setStateOne = (data) => {
    state.city = data.city.name;
    state.temp = data.list[0].main.temp;
    state.humidity = data.list[0].main.humidity;
    state.country = data.city.country;
    state.description = data.list[0].weather[0].description;
    state.lat = data.city.coord.lat;
    state.lon = data.city.coord.lon;
    state.icon = data.list[0].weather[0].icon
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
        })();
        thisDayInfo ();
    });
})();
