//---------------Get information for each city------------------------------------
const gettingWeather = async () => {
    const inputValue = document.getElementById('input').value;
    if (inputValue) {
        setQS('#messageError', '');
        (async function () {
            let response = await fetch( `${API_URL}forecast?q=${inputValue}&APPID=${API_KEY}&units=metric` );
            if (response.status == 404) {
                setQS('#messageError', 'Please, enter the correct city name!');
            } else {
                let data = await response.json();
                renderAndStateCall(data);
                map(data.city.coord.lon, data.city.coord.lat) 
            }   
        })();
    } else setQS( '#messageError', 'Please, enter the city name!' );
};

//---------------Get longitude and latitude------------------------------------

(function getDate() {
    window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQS('.long_lang', `[${longitude.toFixed(2)}, ${latitude.toFixed(2)}]`);
        (async function () {
            let response = await fetch( `${API_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            let data = await response.json();
            renderAndStateCall(data);
            map(longitude, latitude);
        })();
        thisDayInfo ();
    });
})();

//-------------------function for show weather information for each 3 hours-------

const showInfoEach3hours = (divName, i) => {
    document.querySelector(divName).addEventListener('mouseover', () => {
        document.querySelector('.show').style.display = "grid";
        const inputValue = document.getElementById('input').value;
        inputValue ? transformDataForShowInputedCity(i) : transformDataForShowLocation(i)
    });

    document.querySelector(divName).addEventListener('mouseout', () => {
        document.querySelector('.show').style.display = "none";
    });

};

//----------Call functions for show weather information for each 3 hours----

showInfoEach3hours('.two', 0);
showInfoEach3hours('.three', 8);
showInfoEach3hours('.four', 16);
showInfoEach3hours('.five', 24);
showInfoEach3hours('.six', 32);

//----------------input keyup ENTER-----------------------------------------

const enter = (event) => {
    if (event.key === 'Enter') {
        gettingWeather();
    }
};

//-------------------Change input style ------------------------------------
(function(){
    const inputValue = document.getElementById('input').value;
    if (inputValue) {
        document.getElementById('input').style.cssText = 'background-color: "white"; color:"black"';
    } 
})();