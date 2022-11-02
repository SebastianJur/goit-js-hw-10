import { Notify } from 'notiflix/build/notiflix-notify-aio';
const URL = 'https://restcountries.com/v3.1/name/';
const countryInfo = document.querySelector('.country-info');

export function fetchCountries(countryName) {
  console.log(countryName);
  console.log(typeof countryName);
  return fetch(
    `${URL}${countryName}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        return Notify.failure('There is no country with that name');
      }
      return response.json().then(countries => {
        if (countries.length > 10) {
          console.log(countries.length);
          console.log(countries);
          countryInfo.innerHTML = '';
          return Notify.info(
            'Too many matches found. Please enter more specific name.'
          );
        }
        if (countries.length === 1) {
          console.log(countries);
          let markup = '';
          countryInfo.innerHTML = '';
          countries.forEach(property => {
            markup += `<div class="country-container">
            <img class="flag" src="${property.flags.svg}" alt= "flag of ${
              property.name.official
            }"/>
            <h1 class="country">${property.name.official}</h1></div>
            <h2>Capital: <span class= subtitle>${property.capital}</span><h2>
            <h2>Population: <span class= subtitle>${property.population.toLocaleString()} people</span></h2>
            <h2>Languages:  <span class= subtitle>${Object.values(
              property.languages
            )}</span></h2>`;
          });

          return (countryInfo.innerHTML = markup);
        }

        if ((countries.length >= 2) & (countries.length <= 10)) {
          let markup = '';
          countries.forEach(country => {
            markup += `<div class="country-container">
            <img class="flag" src="${country.flags.svg}" alt= "flag of ${country.name.official}"/>
            <h2 class="country">${country.name.official}</h2>
            </div>`;
          });
          return (countryInfo.innerHTML = markup);
        }
      });
    })
    .catch(error => console.log(error));
}
