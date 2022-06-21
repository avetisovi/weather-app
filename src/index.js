/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved, no-unused-vars
import html from '@/index.html';
import '@styles/style.scss';
import { getCityData, getLocation } from './modules/api';

const c = document.querySelector('.metric');
const f = document.querySelector('.imperial');

// set weather unit to metric
c.addEventListener('change', () => {
  if (c.checked) localStorage.setItem('units', 'metric');
  getCityData(localStorage.getItem('city'));
});

// set weather unit to imperial
f.addEventListener('change', () => {
  if (f.checked) localStorage.setItem('units', 'imperial');
  getCityData(localStorage.getItem('city'));
});

// get saved city or load user's
// eslint-disable-next-line no-unused-expressions
localStorage.getItem('city') ? getCityData(localStorage.getItem('city')) : getLocation();

// get saved unit or load metric
if (localStorage.getItem('units') === 'metric') {
  c.checked = true;
} else if (localStorage.getItem('units') === 'imperial') {
  f.checked = true;
} else {
  localStorage.setItem('units', 'metric');
}
