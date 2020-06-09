//element
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//app data
const weather = {};

weather.temperature = {
  unit: "celsius"
}

//vars
const KELVIN = 273;
//api key
const key = "82005d27a116c2880c8f0fcb866998a0";

//control browser geolocal support
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

//> ******************
//Action OnClick Button "Search"
btnClick.onclick  = function() {
  let city = document.getElementById('weath').value;
  let api = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+key;

  fetch(api)
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function(){
      displayWeather();
    })
};
//< ******************

//set user position
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

//show error when geolocal doesn't work.
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p> ${error.message} </p>";
}

//weather from api
function getWeather(latitude, longitude){

  let api =  'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+key;

  fetch(api)
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function(){
      displayWeather();
    });
}

//display weather to ui
function displayWeather(){
  iconElement.innerHTML = "<img src=icons/" + weather.iconId +".png />";
  tempElement.innerHTML = weather.temperature.value +'°' + '<span>C</span>';
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = weather.city + ' - ' + weather.country;
}

//C to F conversion
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}

//when user clicks on the temp.
tempElement.addEventListener("click", function(){
  if(weather.temperature.value === undefined) return;

  if(weather.temperature.unit == "celsius"){
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    tempElement.innerHTML = fahrenheit +'°'+ '<span>F</span>';
    weather.temperature.unit = "fahrenheit";
  }else {
    tempElement.innerHTML = weather.temperature.value+'°'+'<span>C</span>';
    weather.temperature.unit = "celsius"
  }
});
