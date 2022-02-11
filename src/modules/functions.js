/* eslint-disable import/no-unresolved */
import lightClouds from '@images/lightCloud.png';
import heavyClouds from '@images/heavyCloud.png';
import thunderstorm from '@images/Thunderstorm.png';
import shower from '@images/Shower.png';
import clear from '@images/Clear.png';
import lightRain from '@images/LightRain.png';
import heavyRain from '@images/HeavyRain.png';
import sleet from '@images/Sleet.png';
import snow from '@images/Snow.png';

function weatherType(obj) {
  // eslint-disable-next-line default-case
  switch (obj.weather[0].description) {
    case 'light rain':
      return lightRain;
    case 'moderate rain':
      return lightRain;
    case 'shower rain':
      return shower;
    case 'light intensity shower rain':
      return shower;
    case 'heavy intensity shower rain':
      return shower;
    case 'ragged shower rain':
      return shower;
    case 'Sleet':
      return sleet;
    case 'few clouds':
      return lightClouds;
    case 'scattered clouds':
      return lightClouds;
  }

  switch (obj.weather[0].main) {
    case 'ThunderStorm':
      return thunderstorm;
    case 'Drizzle':
      return shower;
    case 'Rain':
      return heavyRain;
    case 'Snow':
      return snow;
    case 'Clear':
      return clear;
    case 'Clouds':
      return heavyClouds;
    default:
      return '';
  }
}

function formatDates() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const todayDate = new Date();

  const twoDayAfDate = new Date(todayDate);
  twoDayAfDate.setDate(twoDayAfDate.getDate() + 2);

  const threeDayAfDate = new Date(todayDate);
  threeDayAfDate.setDate(threeDayAfDate.getDate() + 3);

  const fourDayAfDate = new Date(todayDate);
  fourDayAfDate.setDate(fourDayAfDate.getDate() + 4);

  const fiveDayAfDate = new Date(todayDate);
  fiveDayAfDate.setDate(fiveDayAfDate.getDate() + 5);

  const today = `${days[todayDate.getDay()]}, ${todayDate.getDate()} ${months[todayDate.getMonth()]}`;
  const tommorow = 'Tommorow';
  const twoDayAf = `${days[twoDayAfDate.getDay()]}, ${twoDayAfDate.getDate()} ${months[twoDayAfDate.getMonth()]}`;
  const threeDayAf = `${days[threeDayAfDate.getDay()]}, ${threeDayAfDate.getDate()} ${months[threeDayAfDate.getMonth()]}`;
  const fourDayAf = `${days[fourDayAfDate.getDay()]}, ${fourDayAfDate.getDate()} ${months[fourDayAfDate.getMonth()]}`;
  const fiveDayAf = `${days[fiveDayAfDate.getDay()]}, ${fiveDayAfDate.getDate()} ${months[fiveDayAfDate.getMonth()]}`;

  return [today, tommorow, twoDayAf, threeDayAf, fourDayAf, fiveDayAf];
}

function degToCompass(num) {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return arr[(val % 16)];
}

export { weatherType, formatDates, degToCompass };
