console.log("Connected")

function windSpeed(speed) {
    var windDescription;

    switch (true) {
        case(speed >= 0 && speed <= 0.5):
            windDescription = "Calm";
            break;
        case(speed > 0.5 && speed <= 1.5):
            windDescription = "Light air";
            break;
        case(speed > 1.5 && speed <= 3.3):
            windDescription = "Light breeze";
            break;
        case(speed > 3.3 && speed <= 5.5):
            windDescription = "Gentle breeze";
            break;
        case(speed > 5.5 && speed <= 7.9):
            windDescription = "Moderate breeze";
            break;
        case(speed > 7.9 && speed <= 10.7):
            windDescription = "Fresh breeze";
            break;
        case(speed > 10.7 && speed <= 13.8):
            windDescription = "Strong breeze";
            break;
        case(speed > 13.8 && speed <= 17.1):
            windDescription = "Moderate gale";
            break;
        case(speed > 17.1 && speed <= 20.7):
            windDescription = "Fresh gale";
            break;
        case(speed > 20.8 && speed <= 24.4):
            windDescription = "Strong gale";
            break;
        case(speed > 24.4 && speed <= 28.4):
            windDescription = "Whole gale";
            break;
        case(speed > 28.4 && speed <= 32.6):
            windDescription = "Storm";
            break;
        case(speed > 32.6):
            windDescription = "Hurricane over";
            break;
    }
    return windDescription;
}

function windDirection(degree) {
    var direction;
    switch (true) {
        case(degree >= 348.75 && degree < 11.25):
            direction = "North";
            break;
        case(degree >= 11.25 && degree < 33.75):
            direction = "North-northeast";
            break;
        case(degree >= 33.75 && degree < 56.25):
            direction = "Northeast";
            break;
        case(degree >= 56.25 && degree < 78.75):
            direction = "East-northeast";
            break;
        case(degree >= 78.75 && degree < 101.25):
            direction = "East";
            break;
        case(degree >= 101.25 && degree < 123.75):
            direction = "East-southeast";
            break;
        case(degree >= 123.75 && degree < 146.25):
            direction = "Southeast";
            break;
        case(degree >= 146.25 && degree < 168.75):
            direction = "South-southeast";
            break;
        case(degree >= 168.75 && degree < 191.25):
            direction = "South";
            break;
        case(degree >= 191.25 && degree < 213.75):
            direction = "South-southwest";
            break;
        case(degree >= 213.75 && degree < 236.25):
            direction = "Southwest";
            break;
        case(degree >= 236.25 && degree < 258.75):
            direction = "West-southwest";
            break;
        case(degree >= 258.75 && degree < 281.25):
            direction = "West";
            break;
        case(degree >= 281.25 && degree < 303.75):
            direction = "West-northwest";
            break;
        case(degree >= 303.75 && degree < 326.25):
            direction = "Northwest";
            break;
        case(degree >= 326.25 && degree < 348.75):
            direction = "North-northwest";
            break;
    }
    return direction
}

function cloudsType(percent) {
    var type;
    switch (true) {
        case(percent <= 10):
            type = 'Clear sky';
            break;
        case (percent > 10 && percent <= 50):
            type = 'Scattered clouds';
            break
        case (percent > 50 && percent <= 90):
            type = 'Broken clouds';
            break;
        case (percent > 90):
            type = 'Overcast';
            break;
    }
    return type;
}

function fillContent(b, p, data, i, h3, temp) {
    h3.textContent = data.name;
    temp.textContent = Math.round(data.main['temp']) + '\u00B0';

    b[0].textContent = "Ветер";
    b[1].textContent = "Облачность";
    b[2].textContent = "Давление";
    b[3].textContent = "Влажность";
    b[4].textContent = "Координаты";

    p[i].textContent = windSpeed(data.wind['speed']) + ', ' + data.wind['speed'] + ' m/s, ' + windDirection(data.wind['deg']);
    p[i + 1].textContent = cloudsType(data.clouds['all']);
    p[i + 2].textContent = data.main['pressure'] + ' hpa';
    p[i + 3].textContent = data.main['humidity'] + ' %';
    p[i + 4].textContent = '[' + data.coord['lon'] + ', ' + data.coord['lat'] + ']';
}



function gettingJSONbyCoord(lat, lon) {
    const api_key = '52fd465732929bce2b208cdcf6b2c155'

    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric' + '&appid=' + api_key).then(function (resp) {
        return resp.json()
    }).then(function (data) {
        // //Добавляем иконку погоды
        // document.querySelector('.weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        fillingInfo(data)
    })
}

function gettingJSONbyCity(city) {
    const api_key = '52fd465732929bce2b208cdcf6b2c155'

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&appid=' + api_key).then(function (resp) {
        return resp.json()
    }).then(function (data) {
        // //Добавляем иконку погоды
        // document.querySelector('.weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;

        fillingInfoCity(data, city)

    }).catch(err => {
        deleteCity(city);
        alert("Введенный город не найден");
    })
}

function fillingInfoCity(data, city) {
    if ('content' in document.createElement('template')) {
        localStorage.setItem(city, data.name);
        console.log(city)
        var t1 = document.querySelector('#fav-city'),
            temp = t1.content.querySelector("p"),
            p = t1.content.querySelectorAll("p"),
            b = t1.content.querySelectorAll("b"),
            h3 = t1.content.querySelector("h3"),
            icon = t1.content.querySelector("#imgcity");

        fillContent(b, p, data, 1, h3, temp);
        console.log(data)
        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png " width="48" height="48" alt="${data.weather[0]['main']}">`;

        var tb = document.getElementsByTagName("ulcity");
        var clone = document.importNode(t1.content, true);
        tb[0].appendChild(clone);
    }
}

function fillingInfo(data) {
    let i = 0;
    if ('content' in document.createElement('template')) {

        var t2 = document.querySelector('#info-cur'),
            h3 = t2.content.querySelector("h3"),
            temp = t2.content.querySelector("p"),
            icon = t2.content.querySelector("div");

        var t1 = document.querySelector('#content-cur'),
            p = t1.content.querySelectorAll("p"),
            b = t1.content.querySelectorAll("b");

        fillContent(b, p, data, 0, h3, temp);


        icon.removeChild(icon.firstChild);
        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png ">` + icon.innerHTML;


        var tb = document.getElementsByTagName("uldata");
        if (tb[i].childElementCount > 0) {
            while (tb[i].firstChild) {
                tb[i].removeChild(tb[i].firstChild);
            }
        }

        var clone = document.importNode(t1.content, true);
        tb[i].appendChild(clone);

        var tb2 = document.getElementsByTagName("citydata");
        if (tb2[i].childElementCount > 0) {
            // icon.innerHTML = ""
            while (tb2[i].firstChild) {
                tb2[i].removeChild(tb2[i].firstChild);
            }
        }
        var clone2 = document.importNode(t2.content, true);
        tb2[i].appendChild(clone2);
    }
}

function getCurrentCity() {
    // const cityName = document.querySelector('#city-name');
    // const status = document.querySelector('#status');

    // cityName.textContent = '';

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        gettingJSONbyCoord(Math.round(latitude * 1000) / 1000, Math.round(longitude * 1000) / 1000)
    }

    function error() {
        gettingJSONbyCoord(-8.669786, 115.213571)
    }

    if (!navigator.geolocation) {
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function addCity() {
    let city = document.getElementById('new-city-input').value;
    let flag = true;
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (city === localStorage.getItem(key)){
            flag = false;
        }
    }
    if (localStorage.getItem(city) === null && flag)  {
        gettingJSONbyCity(city)
    }
    document.getElementById('new-city-input').value = "";
}

function deleteCity(a){
    var cityName;
    var b;
    var c;
    if (typeof a === 'string'){
        cityName = a
    } else {
        b = a.parentNode;
        cityName = b.childNodes[1].textContent;
        c = b.parentNode;
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (cityName === localStorage.getItem(key)){
                localStorage.removeItem(key)
            }
        }
        c.parentNode.removeChild(c);
    }
    localStorage.removeItem(cityName)

    // for (let i = 0; i < localStorage.length; i++) {
    //     console.log(localStorage.key(i));
    // }

}

function parsing() {
    // localStorage.clear()
    for (let i = 0; i < localStorage.length; i++) {
        let city = localStorage.key(i);
        gettingJSONbyCity(city)
    }
}
getCurrentCity()
document.querySelector('#find-me').addEventListener('click', getCurrentCity);
document.querySelector('#new-city').addEventListener('click', addCity);
// document.querySelector('#delete').addEventListener('click', deleteCity);
parsing()


// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
// api.openweathermap.org/data/2.5/forecast?id=524901&appid={$api_key}