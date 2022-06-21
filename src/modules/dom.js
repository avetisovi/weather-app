// eslint-disable-next-line import/no-cycle
import { getCityData, getLocation } from './api';
import { weatherType, formatDates, degToCompass } from './functions';

const openLeftsideMenu = document.querySelector('.leftside-menu__open');
const closeLeftsideMenu = document.querySelector('.leftside-menu__close');
const lefsideMenu = document.querySelector('.leftside-menu');
const leftsideMenuInput = document.querySelector('.leftside-menu__input');
const leftsideMenuForm = document.querySelector('.leftside-menu__form');

const locationBtn = document.querySelector('.map__btn');
const currentWeatherImg = document.querySelector('.current__weather-image').querySelector('img');
const currentWeatherTemperature = document.querySelector('.current__weather-temperature--text');
const currentWeatherType = document.querySelector('.current__weather-weather');
const currentDate = document.querySelector('.current__date');
const currentCity = document.querySelector('.current__city');
const currentCityLocation = document.querySelector('.current__weather-location');
const followingDaysDates = document.querySelectorAll('.following__days-title');
const followingDaysImages = document.querySelectorAll('.following__days-img');
const followingDaysTemperature = document.querySelectorAll('.following__day-temperature-number');
const followingNightsTemperature = document.querySelectorAll('.following__night-temperature-number');
const windSpeed = document.querySelector('.wind-speed');
const windDirectionImg = document.querySelector('.wind__direction-img');
const windDirectionText = document.querySelector('.wind__direction-text');
const humidityPercent = document.querySelector('.humidity-number');
const humidityProgressbar = document.querySelector('.humidity__progressbar-complete');
const visibility = document.querySelector('.visibility');
const pressure = document.querySelector('.pressure');
const currentWeatherTemperatureType = document.querySelector('.current__weather-temperature--type');
const followingDaysTemperatureType = document.querySelectorAll('.following__day-temperature-type');
const windUnit = document.querySelector('.wind-unit');
const visibilityUnit = document.querySelector('.visibility-unit');

// toggle leftside menu
openLeftsideMenu.addEventListener('click', () => {
  lefsideMenu.classList.remove('leftside-menu--closed');
});

closeLeftsideMenu.addEventListener('click', () => {
  lefsideMenu.classList.add('leftside-menu--closed');
});

// serach for entered city in leftside menu
leftsideMenuForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getCityData(leftsideMenuInput.value);
  localStorage.setItem('city', leftsideMenuInput.value);
  lefsideMenu.classList.add('leftside-menu--closed');
});

locationBtn.addEventListener('click', getLocation);

function addWeatherToPage(data) {
  // current weather
  currentWeatherImg.src = weatherType(data.current);
  currentWeatherImg.title = data.current.weather[0].description;
  currentWeatherImg.alt = data.current.weather[0].description;
  [currentDate.innerText] = formatDates();
  currentWeatherTemperature.innerText = data.current.temp.toFixed(1);
  currentWeatherType.innerText = data.current.weather[0].description;
  currentCity.innerText = data.name;
  currentCityLocation.href = `https://maps.google.com/?q=${data.lat},${data.lon}`;

  // following days
  followingDaysDates.forEach((elem, i) => {
    elem.innerText = formatDates()[i + 1];
  });
  followingDaysImages.forEach((elem, i) => {
    elem.src = weatherType(data.daily[i + 1]);
    elem.title = data.daily[i + 1].weather[0].description;
    elem.alt = data.daily[i + 1].weather[0].description;
  });

  followingDaysTemperature.forEach((elem, i) => {
    elem.innerText = data.daily[i + 1].temp.day.toFixed(1);
  });

  followingNightsTemperature.forEach((elem, i) => {
    elem.innerText = data.daily[i + 1].temp.night.toFixed(1);
  });

  // Highlights

  // speed comes in m/s
  windSpeed.innerText = data.current.wind_speed.toFixed(1);
  windDirectionImg.style.transform = `rotate(${data.current.wind_deg + 45}deg)`;
  windDirectionText.innerText = degToCompass(data.current.wind_deg);

  humidityPercent.innerText = data.current.humidity;
  humidityProgressbar.style.width = `${data.current.humidity}%`;
  pressure.innerText = data.current.pressure;

  // units
  if (data.units === 'metric') {
    currentWeatherTemperatureType.innerText = '°C';
    // eslint-disable-next-line no-return-assign
    followingDaysTemperatureType.forEach((elem) => elem.innerText = '°C');
    windUnit.innerText = 'm/s';
    visibility.innerText = (data.current.visibility / 1000).toFixed(1);
    visibilityUnit.innerText = 'km';
  } else {
    currentWeatherTemperatureType.innerText = '°F';
    // eslint-disable-next-line no-return-assign
    followingDaysTemperatureType.forEach((elem) => elem.innerText = '°F');
    windUnit.innerText = 'mph';
    visibility.innerText = (data.current.visibility * 0.000621).toFixed(1);
    visibilityUnit.innerText = 'miles';
  }
}

export default addWeatherToPage;
