/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved, no-unused-vars
import html from '@/index.html';
import '@styles/style.scss';
import { getCityData, getLocation } from './modules/api';
import { toggleMenu, selectCity, currentLocation } from './modules/dom';

const c = document.querySelector('.metric');
const f = document.querySelector('.imperial');

c.addEventListener('change', () => {
  if (c.checked) localStorage.setItem('units', 'metric');
  getCityData(localStorage.getItem('city'));
});

f.addEventListener('change', () => {
  if (f.checked) localStorage.setItem('units', 'imperial');
  getCityData(localStorage.getItem('city'));
});

toggleMenu();
selectCity();
currentLocation();

// eslint-disable-next-line no-unused-expressions
localStorage.getItem('city') ? getCityData(localStorage.getItem('city')) : getLocation();

if (localStorage.getItem('units') === 'metric') {
  c.checked = true;
} else if (localStorage.getItem('units') === 'imperial') {
  f.checked = true;
} else {
  localStorage.setItem('units', 'metric');
}
