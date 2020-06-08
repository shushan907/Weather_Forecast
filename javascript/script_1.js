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

// const eventLis = (divName, i) => {
//     document.querySelector(divName).addEventListener('mouseover', () => {
//         document.querySelector('.show').style.display = "grid";
//         (async function () {
//             const inputValue = document.getElementById('input').value;
//             let response = await fetch( `${API_URL}forecast?q=${inputValue}&APPID=${API_KEY}&units=metric` );
//             let data = await response.json();
//             setStateShow(data, i);
//             renderShowData();
//         })();
//     });
//     document.querySelector(divName).addEventListener('mouseout', () => {
//         document.querySelector('.show').style.display = "none";
//     });
// };

// eventLis('.two', 0);
// eventLis('.three');
// eventLis('.four');
// eventLis('.five');
// eventLis('.six');
//**********************************************************************
//   const time1 = async () =>{
//         const inputValue = document.getElementById('input').value;
//         const response = await fetch( `${API_URL}forecast?q=${inputValue}&APPID=${API_KEY}&units=metric` );
//         const data = await response.json();
//         console.log(data)
//         setState(data,4);
//         renderData(7) ; 
//         setState(data,5);
//         renderData(8) ; 
//         setState(data,6);
//         renderData(9) ; 
//         setState(data,7);
//         renderData(10) ; 
//         setState(data,8);
//         renderData(11) ; 
//         setState(data,9);
//         renderData(12) ; 
//         setState(data,10);
//         renderData(13) ; 
//         setState(data,11);
//         renderData(14) ; 
//         }
        // const time2 = async (data) =>{
        //     const inputValue = document.getElementById('input').value;
        //     const response = await fetch( `${API_URL}forecast?q=${inputValue}&APPID=${API_KEY}&units=metric` );
        //     const data = await response.json();
        //     setState(data,12);
        //     renderData(7) ; 
        //     setState(data,13);
        //     renderData(8) ; 
        //     setState(data,14);
        //     renderData(9) ; 
        //     setState(data,15);
        //     renderData(10) ; 
        //     setState(data,16);
        //     renderData(11) ; 
        //     setState(data,17);
        //     renderData(12) ; 
        //     setState(data,18);
        //     renderData(13) ; 
        //     setState(data,19);
        //     renderData(14) ; 
        //     }
        //     const time3 = async (data) =>{
        //         const inputValue = document.getElementById('input').value;
        //         const response = await fetch( `${API_URL}forecast?q=${inputValue}&APPID=${API_KEY}&units=metric` );
        //         const data = await response.json();
        //         setState(data,20);
        //         renderData(7) ; 
        //         setState(data,21);
        //         renderData(8) ; 
        //         setState(data,22);
        //         renderData(9) ; 
        //         setState(data,23);
        //         renderData(10) ; 
        //         setState(data,24);
        //         renderData(11) ; 
        //         setState(data,25);
        //         renderData(12) ; 
        //         setState(data,26);
        //         renderData(13) ; 
        //         setState(data,27);
        //         renderData(14) ; 
        //         }
        //         const time4 = async (data) =>{
        //             const inputValue = document.getElementById('input').value;
        //             const response = await fetch( `${API_URL}forecast?q=${inputValue}&APPID=${API_KEY}&units=metric` );
        //             const data = await response.json();
        //             setState(data,28);
        //             renderData(7) ; 
        //             setState(data,29);
        //             renderData(8) ; 
        //             setState(data,30);
        //             renderData(9) ; 
        //             setState(data,31);
        //             renderData(10) ; 
        //             setState(data,32);
        //             renderData(11) ; 
        //             setState(data,33);
        //             renderData(12) ; 
        //             setState(data,34);
        //             renderData(13) ; 
        //             setState(data,35);
        //             renderData(14) ; 
        //             }
        //             const time5 = async (data) =>{
        //                 const inputValue = document.getElementById('input').value;
        //                 const response = await fetch( `${API_URL}forecast?q=${inputValue}&APPID=${API_KEY}&units=metric` );
        //                 const data = await response.json();
        //                 setState(data,36);
        //                 renderData(7) ; 
        //                 setState(data,37);
        //                 renderData(8) ; 
        //                 setState(data,38);
        //                 renderData(9) ; 
        //                 setState(data,39);
        //                 renderData(10) ; 
        //                 setState(data,40);
        //                 renderData(11) ; 
        //                 // setState(data,9);
        //                 // renderData(12) ; 
        //                 // setState(data,10);
        //                 // renderData(13) ; 
        //                 // setState(data,11);
        //                 // renderData(14) ; 
        //                 }