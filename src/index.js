import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const countryInfo = document.querySelector('.country-info');
const searchInput = document.querySelector('#search-box');

searchInput.addEventListener('input', debounce(onIput, DEBOUNCE_DELAY));

function onIput(event) {
  let countryName = event.target.value.trim();
  console.log(countryName);
  if (searchInput.value.length === 0) {
    countryInfo.innerHTML = '';
    return Notify.info('Type the name of country');
  }
  if (!countryName) {
    return;
  }
  return fetchCountries(countryName);
}
