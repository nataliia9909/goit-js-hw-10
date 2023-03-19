import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';



const DEBOUNCE_DELAY = 300;


const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearchBox, DEBOUNCE_DELAY))

function onSearchBox(evt) {
    evt.preventDefault();

    const searchBoxValue =  searchBox.value.trim();
    if (searchBoxValue === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    }
    fetchCountries(searchBoxValue)
    .then(createCountryCard)
    .catch((error) => {
        Notify.failure('Oops, there is no country with that name')
    });
}

function createCountryCard(countries) {
    if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length > 1) {
    const markup = countries.map(country =>  createCountryListMarkup(country));
        countryInfo.innerHTML = markup.join('');
        countryList.innerHTML = ''; 
    } else {
            const markup = countries.map(country =>  createCountryСardMarup(country));
        countryInfo.innerHTML = markup.join('');
        countryList.innerHTML = '';
    }

}

  function createCountryListMarkup({ flags, name }) {
    return `
    <li class="country-list__item">
      <img class="country-list__flags" src="${flags.svg}" alt="${name.official}" width="25" />
      <h2 class="country-list__name">${name.official}</h2>
    </li>
    `;
  }



function createCountryСardMarup({
    name,
    capital,
    population,
    flags,
    languages
  }) {
    return `
      <div class="country-info__container">
        <div class="country-info__wrapper">
          <img class="country-info__flags" src="${flags.svg}" alt="${
      name.official
    }" width="50" />
          <h2 class="country-info__name">${name.official}</h2>
        </div>
        <p class="country-info__capital"><span class="country-info__weight">Capital:</span> ${capital}</p>
        <p class="country-info__population"><span class="country-info__weight">Population:</span> ${population}</p>
        <p class="country-info__languages"><span class="country-info__weight">Languages:</span> ${Object.values(
          languages
        )}</p>
      </div>
    `;
  }


