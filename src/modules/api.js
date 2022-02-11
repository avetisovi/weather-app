// eslint-disable-next-line import/no-cycle
import { addWeatherToPage } from './dom';

const c = document.querySelector('.metric');

async function getLocation() {
  const locationResponse = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=d9893f953afc47d1ab30975d389d8825');
  const locationData = await locationResponse.json();

  let weatherResponse;
  let weatherData;

  if (c.checked) {
    weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.latitude}&lon=${locationData.longitude}&units=metric&excludes=daily&appid=92868b7e928def68f77bb8e0423a850c`);
    weatherData = await weatherResponse.json();
    weatherData.units = 'metric';
  } else {
    weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.latitude}&lon=${locationData.longitude}&units=imperial&excludes=daily&appid=92868b7e928def68f77bb8e0423a850c`);
    weatherData = await weatherResponse.json();
    weatherData.units = 'imperial';
  }

  const nameResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${locationData.latitude}&lon=${locationData.longitude}&limit=1&appid=92868b7e928def68f77bb8e0423a850c`);
  const name = await nameResponse.json();
  weatherData.name = await name[0].name;
  localStorage.setItem('city', await name[0].name);

  addWeatherToPage(weatherData);
}

// eslint-disable-next-line consistent-return
async function cityToCords(city) {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=92868b7e928def68f77bb8e0423a850c`);
    const data = await response.json();
    return data[0];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error: ${err}`);
  }
}

async function getCityData(city) {
  try {
    const cords = await cityToCords(city);

    let response;
    let data;
    if (c.checked) {
      response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cords.lat}&lon=${cords.lon}&units=metric&excludes=daily&appid=92868b7e928def68f77bb8e0423a850c`);
      data = await response.json();
      data.units = 'metric';
    } else {
      response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cords.lat}&lon=${cords.lon}&units=imperial&excludes=daily&appid=92868b7e928def68f77bb8e0423a850c`);
      data = await response.json();
      data.units = 'imperial';
    }

    const nameResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${cords.lat}&lon=${cords.lon}&limit=1&appid=92868b7e928def68f77bb8e0423a850c`);
    const name = await nameResponse.json();
    data.name = await name[0].name;

    addWeatherToPage(data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error: ${err}`);
  }
}

export { getCityData, getLocation };
